"use client"

import { useState } from "react"

interface SlideCanvasProps {
  slide: {
    id: number
    title: string
    content: string
    background: string
    image?: {
      url: string
      position?: "left" | "right" | "full" | "background"
    }
  }
  onUpdate: (updates: any) => void
}

export default function SlideCanvas({ slide, onUpdate }: SlideCanvasProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingContent, setIsEditingContent] = useState(false)

  const isImageFull = slide.image?.position === "full"
  const isImageBg = slide.image?.position === "background"
  const isImageSide = slide.image?.position === "left" || slide.image?.position === "right"

  return (
    <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-muted/30">
      <div
        className={`${slide.background} w-full max-w-4xl aspect-video rounded-xl shadow-2xl p-12 border border-border/50 flex flex-col justify-center relative overflow-hidden`}
        style={{
          backgroundImage: isImageBg ? `url(${slide.image?.url})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isImageBg && <div className="absolute inset-0 bg-black/40" />}

        {/* Full width image */}
        {isImageFull && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={slide.image.url || "/placeholder.svg"}
              alt="Slide"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* Side-by-side layout */}
        {isImageSide ? (
          <div className="relative z-10 flex gap-8 items-center h-full">
            {slide.image?.position === "left" && (
              <div className="w-1/2 h-full flex items-center">
                <img
                  src={slide.image.url || "/placeholder.svg"}
                  alt="Slide"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
            <div className={slide.image?.position === "right" ? "w-1/2" : "flex-1"}>
              <div className="mb-8 cursor-text" onClick={() => setIsEditingTitle(true)}>
                {isEditingTitle ? (
                  <input
                    autoFocus
                    type="text"
                    value={slide.title}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    onBlur={() => setIsEditingTitle(false)}
                    className="text-4xl font-bold text-foreground bg-transparent border-b-2 border-primary outline-none w-full"
                  />
                ) : (
                  <h2 className="text-4xl font-bold text-foreground hover:text-primary transition-colors">
                    {slide.title}
                  </h2>
                )}
              </div>
              <div className="cursor-text flex-1" onClick={() => setIsEditingContent(true)}>
                {isEditingContent ? (
                  <textarea
                    autoFocus
                    value={slide.content}
                    onChange={(e) => onUpdate({ content: e.target.value })}
                    onBlur={() => setIsEditingContent(false)}
                    className="text-lg text-foreground/80 bg-transparent border border-primary rounded p-4 outline-none w-full h-24 resize-none"
                  />
                ) : (
                  <p className="text-lg text-foreground/80 leading-relaxed hover:text-foreground transition-colors">
                    {slide.content}
                  </p>
                )}
              </div>
            </div>
            {slide.image?.position === "right" && (
              <div className="w-1/2 h-full flex items-center">
                <img
                  src={slide.image.url || "/placeholder.svg"}
                  alt="Slide"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ) : !isImageFull ? (
          // Standard layout for text-only or background image
          <div className="relative z-10">
            <div className="mb-8 cursor-text" onClick={() => setIsEditingTitle(true)}>
              {isEditingTitle ? (
                <input
                  autoFocus
                  type="text"
                  value={slide.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  onBlur={() => setIsEditingTitle(false)}
                  className="text-4xl font-bold text-foreground bg-transparent border-b-2 border-primary outline-none w-full"
                />
              ) : (
                <h2 className="text-4xl font-bold text-foreground hover:text-primary transition-colors">
                  {slide.title}
                </h2>
              )}
            </div>

            <div className="cursor-text flex-1" onClick={() => setIsEditingContent(true)}>
              {isEditingContent ? (
                <textarea
                  autoFocus
                  value={slide.content}
                  onChange={(e) => onUpdate({ content: e.target.value })}
                  onBlur={() => setIsEditingContent(false)}
                  className="text-lg text-foreground/80 bg-transparent border border-primary rounded p-4 outline-none w-full h-full resize-none"
                />
              ) : (
                <p className="text-lg text-foreground/80 leading-relaxed hover:text-foreground transition-colors">
                  {slide.content}
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
