"use client"

import { Type, AlignLeft, AlignCenter, AlignRight, Palette, Settings, Sparkles, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorToolbarProps {
  onShowFormatting: () => void
  onShowAIGenerator?: () => void
  onShowMediaUpload?: () => void
}

export default function EditorToolbar({ onShowFormatting, onShowAIGenerator, onShowMediaUpload }: EditorToolbarProps) {
  return (
    <div className="border-b border-border bg-card/30 px-6 py-3 flex items-center gap-2">
      <Button variant="ghost" size="sm" className="gap-2">
        <Type className="h-4 w-4" />
        Text
      </Button>

      <div className="flex items-center gap-1 ml-4">
        <Button variant="ghost" size="sm">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <Button variant="ghost" size="sm" className="gap-2 ml-4">
        <Palette className="h-4 w-4" />
        Colors
      </Button>

      {onShowMediaUpload && (
        <Button variant="ghost" size="sm" className="gap-2 text-accent hover:text-accent" onClick={onShowMediaUpload}>
          <ImageIcon className="h-4 w-4" />
          Media
        </Button>
      )}

      <div className="flex-1" />

      {onShowAIGenerator && (
        <Button variant="ghost" size="sm" className="gap-2 text-accent hover:text-accent" onClick={onShowAIGenerator}>
          <Sparkles className="h-4 w-4" />
          AI
        </Button>
      )}

      <Button variant="ghost" size="sm" className="gap-2" onClick={onShowFormatting}>
        <Settings className="h-4 w-4" />
        Format
      </Button>
    </div>
  )
}
