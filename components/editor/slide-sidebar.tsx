"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SlideProps {
  id: number
  title: string
}

interface SlideSidebarProps {
  slides: SlideProps[]
  activeSlideId: number
  onSelectSlide: (id: number) => void
  onAddSlide: () => void
  onDeleteSlide: (id: number) => void
}

export default function SlideSidebar({
  slides,
  activeSlideId,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
}: SlideSidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-card/30 flex flex-col">
      <div className="p-4 border-b border-border">
        <Button onClick={onAddSlide} className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Plus className="h-4 w-4" />
          New Slide
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`group relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                activeSlideId === slide.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card/50"
              }`}
              onClick={() => onSelectSlide(slide.id)}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded mb-2 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{slide.id}</span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">{slide.title}</p>

              {slides.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteSlide(slide.id)
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
