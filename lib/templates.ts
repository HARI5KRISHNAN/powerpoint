export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  styles: {
    backgroundColor: string
    textColor: string
    accentColor: string
    font: string
  }
  layouts: {
    title: {
      titleSize: string
      subtitleSize: string
      alignment: string
    }
    content: {
      headingSize: string
      bodySize: string
      alignment: string
    }
  }
}

export const TEMPLATES: Template[] = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Sleek dark theme with vibrant accents",
    thumbnail: "linear-gradient(135deg, #08080d 0%, #1a1a2e 100%)",
    styles: {
      backgroundColor: "#08080d",
      textColor: "#faf8f5",
      accentColor: "#a76bcf",
      font: "sans",
    },
    layouts: {
      title: {
        titleSize: "text-7xl",
        subtitleSize: "text-2xl",
        alignment: "center",
      },
      content: {
        headingSize: "text-5xl",
        bodySize: "text-lg",
        alignment: "left",
      },
    },
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean minimal design with plenty of space",
    thumbnail: "linear-gradient(135deg, #faf8f5 0%, #f5f3f0 100%)",
    styles: {
      backgroundColor: "#faf8f5",
      textColor: "#1a1a1a",
      accentColor: "#00d9ff",
      font: "sans",
    },
    layouts: {
      title: {
        titleSize: "text-6xl",
        subtitleSize: "text-xl",
        alignment: "left",
      },
      content: {
        headingSize: "text-4xl",
        bodySize: "text-base",
        alignment: "left",
      },
    },
  },
  {
    id: "vibrant-gradient",
    name: "Vibrant Gradient",
    description: "Bold gradient backgrounds with high contrast",
    thumbnail: "linear-gradient(135deg, #a76bcf 0%, #00d9ff 100%)",
    styles: {
      backgroundColor: "#a76bcf",
      textColor: "#ffffff",
      accentColor: "#00d9ff",
      font: "sans",
    },
    layouts: {
      title: {
        titleSize: "text-7xl",
        subtitleSize: "text-2xl",
        alignment: "center",
      },
      content: {
        headingSize: "text-5xl",
        bodySize: "text-lg",
        alignment: "center",
      },
    },
  },
  {
    id: "professional-blue",
    name: "Professional Blue",
    description: "Corporate blue theme for business presentations",
    thumbnail: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
    styles: {
      backgroundColor: "#1e3a8a",
      textColor: "#f8fafc",
      accentColor: "#60a5fa",
      font: "sans",
    },
    layouts: {
      title: {
        titleSize: "text-6xl",
        subtitleSize: "text-xl",
        alignment: "left",
      },
      content: {
        headingSize: "text-4xl",
        bodySize: "text-base",
        alignment: "left",
      },
    },
  },
  {
    id: "sunset-warm",
    name: "Sunset Warm",
    description: "Warm orange and red tones for creative presentations",
    thumbnail: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
    styles: {
      backgroundColor: "#78350f",
      textColor: "#fef3c7",
      accentColor: "#fbbf24",
      font: "sans",
    },
    layouts: {
      title: {
        titleSize: "text-7xl",
        subtitleSize: "text-2xl",
        alignment: "center",
      },
      content: {
        headingSize: "text-5xl",
        bodySize: "text-lg",
        alignment: "left",
      },
    },
  },
  {
    id: "forest-green",
    name: "Forest Green",
    description: "Nature-inspired green for environmental topics",
    thumbnail: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
    styles: {
      backgroundColor: "#0f472b",
      textColor: "#e5f9f0",
      accentColor: "#4ade80",
      font: "sans",
    },
    layouts: {
      title: {
        titleSize: "text-6xl",
        subtitleSize: "text-xl",
        alignment: "center",
      },
      content: {
        headingSize: "text-4xl",
        bodySize: "text-base",
        alignment: "left",
      },
    },
  },
  {
    id: "tech-noir",
    name: "Tech Noir",
    description: "Dark tech aesthetic with cyan highlights",
    thumbnail: "linear-gradient(135deg, #0f172a 0%, #1a1f35 100%)",
    styles: {
      backgroundColor: "#0f172a",
      textColor: "#e0e7ff",
      accentColor: "#06b6d4",
      font: "mono",
    },
    layouts: {
      title: {
        titleSize: "text-7xl",
        subtitleSize: "text-2xl",
        alignment: "left",
      },
      content: {
        headingSize: "text-5xl",
        bodySize: "text-base",
        alignment: "left",
      },
    },
  },
  {
    id: "pastel-dream",
    name: "Pastel Dream",
    description: "Soft pastel colors for creative and design presentations",
    thumbnail: "linear-gradient(135deg, #fce7f3 0%, #e9d5ff 100%)",
    styles: {
      backgroundColor: "#fce7f3",
      textColor: "#831843",
      accentColor: "#c084fc",
      font: "sans",
    },
    layouts: {
      title: {
        titleSize: "text-6xl",
        subtitleSize: "text-xl",
        alignment: "center",
      },
      content: {
        headingSize: "text-4xl",
        bodySize: "text-base",
        alignment: "left",
      },
    },
  },
]
