"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AIGeneratorPanelProps {
  onGenerateSlides: (slides: any[]) => void
  isLoading?: boolean
}

export default function AIGeneratorPanel({ onGenerateSlides, isLoading = false }: AIGeneratorPanelProps) {
  const [prompt, setPrompt] = useState("")
  const [slideCount, setSlideCount] = useState(3)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic or description")
      return
    }

    setError("")

    try {
      const response = await fetch("/api/generate-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, slideCount }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate slides")
      }

      const data = await response.json()
      onGenerateSlides(data.slides)
      setPrompt("")
    } catch (err) {
      setError("Failed to generate slides. Please try again.")
      console.error(err)
    }
  }

  return (
    <div className="w-80 border-l border-border bg-card p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-accent" />
        <h3 className="font-semibold">AI Generator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground font-medium">Topic or Description</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'The future of AI in healthcare' or 'How to build a startup'"
            className="w-full px-3 py-2 mt-2 bg-input border border-border rounded-md text-foreground text-sm resize-none focus:border-primary outline-none"
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground font-medium">Number of Slides</label>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setSlideCount(Math.max(1, slideCount - 1))}
              disabled={slideCount <= 1}
              className="px-3 py-1 bg-input border border-border rounded text-foreground hover:bg-primary/10 disabled:opacity-50"
            >
              −
            </button>
            <span className="flex-1 text-center text-foreground font-medium">{slideCount}</span>
            <button
              onClick={() => setSlideCount(Math.min(10, slideCount + 1))}
              disabled={slideCount >= 10}
              className="px-3 py-1 bg-input border border-border rounded text-foreground hover:bg-primary/10 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Slides
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
