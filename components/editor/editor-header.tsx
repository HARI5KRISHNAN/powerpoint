"use client"

import Link from "next/link"
import { ChevronLeft, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EditorHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">My Presentation</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  )
}
