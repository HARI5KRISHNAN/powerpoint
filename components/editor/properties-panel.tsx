import BranchEditor from "./branch-editor"

interface PropertiesPanelProps {
  slide: any
  allSlides?: any[]
  onUpdate: (updates: any) => void
  onApplyTemplate?: (template: any, allSlides: boolean) => void
}

export default function PropertiesPanel({ slide, allSlides = [], onUpdate, onApplyTemplate }: PropertiesPanelProps) {
  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      <BranchEditor slide={slide} allSlides={allSlides} onUpdate={onUpdate} />
    </div>
  )
}
