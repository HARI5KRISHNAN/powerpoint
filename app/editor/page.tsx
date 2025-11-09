"use client"

import { useState } from "react"
import Link from "next/link"
import SlideCanvas from "@/components/slide-canvas"
import SlidesPanel from "@/components/slides-panel"
import PropertiesPanel from "@/components/properties-panel"
import type { Template } from "@/lib/templates"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function EditorPage() {
  const [slides, setSlides] = useState([
    {
      id: "1",
      title: "Title Slide",
      subtitle: "Your Presentation Starts Here",
      layout: "title",
      backgroundColor: "#08080d",
      textColor: "#faf8f5",
      isBranching: false,
      choices: [],
    },
    {
      id: "2",
      title: "Content Slide",
      content: "Add your content here",
      layout: "content",
      backgroundColor: "#08080d",
      textColor: "#faf8f5",
      isBranching: false,
      choices: [],
    },
  ])

  const [selectedSlideId, setSelectedSlideId] = useState("1")

  const selectedSlide = slides.find((s) => s.id === selectedSlideId)

  const updateSlide = (id: string, updates: any) => {
    setSlides(slides.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const addSlide = () => {
    const newId = String(slides.length + 1)
    setSlides([
      ...slides,
      {
        id: newId,
        title: "New Slide",
        content: "",
        layout: "content",
        backgroundColor: "#08080d",
        textColor: "#faf8f5",
        isBranching: false,
        choices: [],
      },
    ])
    setSelectedSlideId(newId)
  }

  const deleteSlide = (id: string) => {
    if (slides.length > 1) {
      const filtered = slides.filter((s) => s.id !== id)
      setSlides(filtered)
      setSelectedSlideId(filtered[0].id)
    }
  }

  const handleGeneratePresentation = (aiSlides: any[]) => {
    setSlides(
      aiSlides.map((slide, index) => ({
        ...slide,
        id: String(index + 1),
        backgroundColor: "#08080d",
        textColor: "#faf8f5",
      })),
    )
    setSelectedSlideId("1")
  }

  const handleApplyTemplate = (template: Template, allSlides: boolean) => {
    if (allSlides) {
      setSlides(
        slides.map((slide) => ({
          ...slide,
          backgroundColor: template.styles.backgroundColor,
          textColor: template.styles.textColor,
        })),
      )
    } else if (selectedSlideId) {
      updateSlide(selectedSlideId, {
        backgroundColor: template.styles.backgroundColor,
        textColor: template.styles.textColor,
      })
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                ← Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Untitled Presentation</h1>
              <p className="text-xs text-muted-foreground">Last edited 2 mins ago</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleGeneratePresentation} variant="outline" size="sm" className="gap-2 bg-transparent">
              ✨ AI Presentation
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              💾 Save
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              ⬇️ Download
            </Button>
            <Link href="/viewer">
              <Button size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                View
              </Button>
            </Link>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              📤 Share
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        <div className="w-64 bg-card rounded-lg border border-border overflow-auto">
          <SlidesPanel
            slides={slides}
            selectedId={selectedSlideId}
            onSelect={setSelectedSlideId}
            onAdd={addSlide}
            onDelete={deleteSlide}
          />
        </div>

        <div className="flex-1 bg-card rounded-lg border border-border p-8 overflow-auto">
          {selectedSlide && (
            <SlideCanvas slide={selectedSlide} onUpdate={(updates) => updateSlide(selectedSlideId, updates)} />
          )}
        </div>

        <div className="w-80 bg-card rounded-lg border border-border overflow-auto">
          {selectedSlide && (
            <PropertiesPanel
              slide={selectedSlide}
              allSlides={slides}
              onUpdate={(updates) => updateSlide(selectedSlideId, updates)}
              onApplyTemplate={handleApplyTemplate}
            />
          )}
        </div>
      </div>
    </div>
  )
}
