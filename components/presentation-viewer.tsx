"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, X, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  id: string
  title: string
  subtitle?: string
  content?: string
  layout: string
  backgroundColor: string
  textColor: string
  notes?: string
}

interface PresentationViewerProps {
  slides: Slide[]
  presentationTitle: string
}

export default function PresentationViewer({ slides, presentationTitle }: PresentationViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPresenting, setIsPresenting] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(5) // seconds

  const currentSlide = slides[currentIndex]

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isPresenting) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, autoPlaySpeed * 1000)

    return () => clearInterval(interval)
  }, [isPlaying, autoPlaySpeed, slides.length, isPresenting])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleGoToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPresenting) return
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === " ") {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
      if (e.key === "Escape") setShowNotes(!showNotes)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPlaying, isPresenting, showNotes])

  if (isPresenting) {
    return (
      <PresentationMode
        slide={currentSlide}
        onExit={() => setIsPresenting(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{presentationTitle}</h1>
          <div className="text-sm text-muted-foreground">
            Slide {currentIndex + 1} of {slides.length}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Main viewer */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden mb-4 flex items-center justify-center p-8">
            <div
              className="w-full h-full max-w-4xl aspect-video rounded-lg shadow-2xl flex flex-col justify-center"
              style={{
                backgroundColor: currentSlide.backgroundColor,
                color: currentSlide.textColor,
              }}
            >
              {currentSlide.layout === "title" ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 px-12 text-center">
                  <h1 className="text-6xl font-bold leading-tight">{currentSlide.title}</h1>
                  <p className="text-2xl opacity-75">{currentSlide.subtitle}</p>
                </div>
              ) : (
                <div className="flex flex-col h-full p-12 gap-6">
                  <h2 className="text-5xl font-bold">{currentSlide.title}</h2>
                  <div className="flex-1 text-lg leading-relaxed whitespace-pre-wrap overflow-y-auto">
                    {currentSlide.content}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button onClick={handlePrev} variant="outline" size="sm" className="gap-2 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext} variant="outline" size="sm" className="gap-2 bg-transparent">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button onClick={() => setCurrentIndex(0)} variant="outline" size="sm" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant={isPlaying ? "default" : "outline"}
                size="sm"
                className="gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Play
                  </>
                )}
              </Button>

              {isPlaying && (
                <select
                  value={autoPlaySpeed}
                  onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                  className="h-8 text-xs px-2 rounded border border-border bg-background text-foreground"
                >
                  <option value="2">2s</option>
                  <option value="3">3s</option>
                  <option value="5">5s</option>
                  <option value="10">10s</option>
                </select>
              )}

              <Button
                onClick={() => setShowNotes(!showNotes)}
                variant={showNotes ? "default" : "outline"}
                size="sm"
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Notes
              </Button>

              <Button
                onClick={() => setIsPresenting(true)}
                size="sm"
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Play className="h-4 w-4" />
                Present
              </Button>
            </div>
          </div>
        </div>

        {/* Thumbnails sidebar */}
        <div className="w-40 bg-card rounded-lg border border-border overflow-y-auto p-3 space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Slides</h3>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleGoToSlide(index)}
              className={`w-full rounded-lg overflow-hidden transition-all ${
                currentIndex === index ? "ring-2 ring-primary" : "ring-1 ring-border hover:ring-primary/50"
              }`}
            >
              <div
                className="aspect-video flex items-center justify-center text-center"
                style={{
                  backgroundColor: slide.backgroundColor,
                  color: slide.textColor,
                }}
              >
                <div className="text-xs font-semibold truncate px-1">{slide.title}</div>
              </div>
              <div className="text-xs text-muted-foreground p-1 text-center bg-background">{index + 1}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Notes panel */}
      {showNotes && (
        <div className="border-t border-border/40 bg-card/50 backdrop-blur-sm p-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-semibold text-foreground mb-2">Speaker Notes</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {currentSlide.notes || "No notes for this slide"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface PresentationModeProps {
  slide: Slide
  onExit: () => void
  onNext: () => void
  onPrev: () => void
}

function PresentationMode({ slide, onExit, onNext, onPrev }: PresentationModeProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        onNext()
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        onPrev()
      }
      if (e.key === "Escape") {
        onExit()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onNext, onPrev, onExit])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center cursor-none"
      style={{
        backgroundColor: slide.backgroundColor,
        color: slide.textColor,
      }}
      onClick={onNext}
    >
      {slide.layout === "title" ? (
        <div className="flex flex-col items-center justify-center gap-8 text-center px-12">
          <h1 className="text-7xl font-bold leading-tight">{slide.title}</h1>
          <p className="text-3xl opacity-75">{slide.subtitle}</p>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full p-16 gap-8 justify-center">
          <h2 className="text-6xl font-bold">{slide.title}</h2>
          <div className="text-2xl leading-relaxed flex-1 whitespace-pre-wrap">{slide.content}</div>
        </div>
      )}

      {/* Exit button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onExit()
        }}
        className="fixed top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
      >
        <X className="h-8 w-8" />
      </button>

      {/* Navigation hints */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm opacity-50">
        Arrow keys to navigate • ESC to exit
      </div>
    </div>
  )
}
