"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Clock } from "lucide-react"

export default function DashboardPage() {
  const recentPresentations = [
    {
      id: 1,
      title: "Q1 Marketing Strategy",
      lastEdited: "2 days ago",
      slides: 12,
    },
    {
      id: 2,
      title: "Product Launch Pitch",
      lastEdited: "1 week ago",
      slides: 8,
    },
    {
      id: 3,
      title: "Company Quarterly Review",
      lastEdited: "2 weeks ago",
      slides: 15,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back! Manage your presentations.</p>
            </div>
            <Link href="/editor">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="h-5 w-5" />
                New Presentation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recent Presentations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPresentations.map((presentation) => (
            <Link key={presentation.id} href="/editor">
              <div className="group h-full bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all p-6 cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-medium text-primary">{presentation.slides} slides</div>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {presentation.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Last edited {presentation.lastEdited}</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Create new card */}
          <Link href="/editor">
            <div className="group h-full bg-card rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer flex flex-col items-center justify-center min-h-64">
              <Plus className="h-12 w-12 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
              <h3 className="font-semibold text-foreground">Create New</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Start a new presentation from scratch</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
