-- Supabase Database Schema for PowerPoint Application
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Presentations Table
CREATE TABLE IF NOT EXISTS presentations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Presentation',
  slides JSONB NOT NULL DEFAULT '[]'::jsonb,
  thumbnail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  shared_with UUID[] DEFAULT ARRAY[]::UUID[]
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS presentations_user_id_idx ON presentations(user_id);
CREATE INDEX IF NOT EXISTS presentations_created_at_idx ON presentations(created_at DESC);
CREATE INDEX IF NOT EXISTS presentations_updated_at_idx ON presentations(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for presentations
-- Users can view their own presentations
CREATE POLICY "Users can view own presentations"
  ON presentations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can view presentations shared with them
CREATE POLICY "Users can view shared presentations"
  ON presentations FOR SELECT
  USING (auth.uid() = ANY(shared_with) OR is_public = true);

-- Users can insert their own presentations
CREATE POLICY "Users can insert own presentations"
  ON presentations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own presentations
CREATE POLICY "Users can update own presentations"
  ON presentations FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own presentations
CREATE POLICY "Users can delete own presentations"
  ON presentations FOR DELETE
  USING (auth.uid() = user_id);

-- Collaboration Sessions Table (for real-time presence)
CREATE TABLE IF NOT EXISTS collaboration_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  presentation_id UUID REFERENCES presentations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT,
  user_name TEXT,
  cursor_position JSONB DEFAULT '{}'::jsonb,
  current_slide_index INTEGER DEFAULT 0,
  color TEXT NOT NULL,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(presentation_id, user_id)
);

-- Create index for collaboration sessions
CREATE INDEX IF NOT EXISTS collaboration_sessions_presentation_id_idx ON collaboration_sessions(presentation_id);
CREATE INDEX IF NOT EXISTS collaboration_sessions_last_active_idx ON collaboration_sessions(last_active DESC);

-- Enable Row Level Security
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for collaboration_sessions
-- Users can view collaboration sessions for presentations they have access to
CREATE POLICY "Users can view collaboration sessions"
  ON collaboration_sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM presentations p
      WHERE p.id = collaboration_sessions.presentation_id
      AND (p.user_id = auth.uid() OR auth.uid() = ANY(p.shared_with) OR p.is_public = true)
    )
  );

-- Users can insert their own collaboration session
CREATE POLICY "Users can insert own collaboration session"
  ON collaboration_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own collaboration session
CREATE POLICY "Users can update own collaboration session"
  ON collaboration_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own collaboration session
CREATE POLICY "Users can delete own collaboration session"
  ON collaboration_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on presentations
CREATE TRIGGER update_presentations_updated_at
  BEFORE UPDATE ON presentations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to cleanup old collaboration sessions (inactive for more than 5 minutes)
CREATE OR REPLACE FUNCTION cleanup_old_collaboration_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM collaboration_sessions
  WHERE last_active < timezone('utc'::text, now()) - interval '5 minutes';
END;
$$ language 'plpgsql';

-- Optional: Create a pg_cron job to run cleanup every minute
-- SELECT cron.schedule('cleanup-collaboration-sessions', '* * * * *', 'SELECT cleanup_old_collaboration_sessions()');

-- Enable Realtime for collaboration
ALTER PUBLICATION supabase_realtime ADD TABLE collaboration_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE presentations;
