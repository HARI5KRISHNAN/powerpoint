"use client"

import { type Template, TEMPLATES } from "@/lib/templates"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  onSelect: (template: Template) => void
  selectedId?: string
}

export default function TemplateSelector({ onSelect, selectedId }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Design Templates</h3>
      <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`group relative rounded-lg overflow-hidden transition-all text-left ${
              selectedId === template.id ? "ring-2 ring-primary" : "ring-1 ring-border hover:ring-primary/50"
            }`}
          >
            <div className="h-24 flex items-center justify-center" style={{ background: template.thumbnail }}>
              <div className="text-center">
                <div className="text-xs font-semibold" style={{ color: template.styles.accentColor }}>
                  {template.name}
                </div>
              </div>
            </div>
            <div className="p-2 bg-card">
              <div className="text-xs text-muted-foreground line-clamp-1">{template.description}</div>
            </div>
            {selectedId === template.id && (
              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
