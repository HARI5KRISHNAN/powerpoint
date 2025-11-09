"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, GitBranch } from "lucide-react"

interface BranchEditorProps {
  slide: any
  allSlides: any[]
  onUpdate: (updates: any) => void
}

export default function BranchEditor({ slide, allSlides, onUpdate }: BranchEditorProps) {
  const [showBranchUI, setShowBranchUI] = useState(slide.isBranching || false)

  const toggleBranching = () => {
    setShowBranchUI(!showBranchUI)
    onUpdate({
      isBranching: !showBranchUI,
      choices: !showBranchUI ? [{ id: "1", text: "Option 1", nextSlideId: "" }] : undefined,
      layout: !showBranchUI ? "choice" : "content",
    })
  }

  const updateChoice = (choiceId: string, field: string, value: string) => {
    const updatedChoices = (slide.choices || []).map((choice: any) =>
      choice.id === choiceId ? { ...choice, [field]: value } : choice,
    )
    onUpdate({ choices: updatedChoices })
  }

  const addChoice = () => {
    const newChoice = {
      id: String((slide.choices?.length || 0) + 1),
      text: `Option ${(slide.choices?.length || 0) + 1}`,
      nextSlideId: "",
    }
    onUpdate({ choices: [...(slide.choices || []), newChoice] })
  }

  const deleteChoice = (choiceId: string) => {
    const updatedChoices = (slide.choices || []).filter((c: any) => c.id !== choiceId)
    onUpdate({ choices: updatedChoices })
  }

  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="h-5 w-5 text-primary" />
        <Button variant={showBranchUI ? "default" : "outline"} size="sm" onClick={toggleBranching} className="w-full">
          {showBranchUI ? "Interactive (Branching)" : "Add Branching"}
        </Button>
      </div>

      {showBranchUI && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Create choices that lead to different slides</p>

          {(slide.choices || []).map((choice: any, idx: number) => (
            <div key={choice.id} className="space-y-2 p-3 bg-muted/30 rounded-lg border border-border/50">
              <label className="text-xs font-medium text-foreground">Choice {idx + 1}</label>
              <input
                type="text"
                placeholder="Option text..."
                value={choice.text}
                onChange={(e) => updateChoice(choice.id, "text", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <select
                value={choice.nextSlideId}
                onChange={(e) => updateChoice(choice.id, "nextSlideId", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select slide to jump to...</option>
                {allSlides.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    Slide {s.id}: {s.title}
                  </option>
                ))}
              </select>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteChoice(choice.id)}
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          ))}

          <Button onClick={addChoice} variant="outline" size="sm" className="w-full gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Choice
          </Button>
        </div>
      )}
    </div>
  )
}
