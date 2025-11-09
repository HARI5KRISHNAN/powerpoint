"use client"

import { Button } from "@/components/ui/button"
import { Play, Save, Share2 } from "lucide-react"
import Link from "next/link"

interface EditorTopbarProps {
  presentationTitle: string
  onTitleChange: (title: string) => void
}

export default function EditorTopbar({ presentationTitle, onTitleChange }: EditorTopbarProps) {
  return (
    <div className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-6">
      <div>
        <input
          type="text"
          value={presentationTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-lg font-bold bg-transparent border-b border-transparent hover:border-primary/50 focus:border-primary outline-none transition-colors"
          placeholder="Presentation name"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Save className="w-4 h-4" />
          Save
        </Button>

        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Share2 className="w-4 h-4" />
          Share
        </Button>

        <Link href="/present">
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white gap-2"
          >
            <Play className="w-4 h-4" />
            Present
          </Button>
        </Link>
      </div>
    </div>
  )
}
