"use server"

import { generateText, generateObject } from "ai"
import { z } from "zod"

const slideContentSchema = z.object({
  title: z.string().describe("Slide title"),
  content: z.string().describe("Main content or bullet points"),
  suggestions: z.array(z.string()).describe("3-5 suggestions for visual elements"),
})

export async function generateSlideContent(topic: string, context = "") {
  try {
    const prompt = `Create compelling presentation slide content for the following topic: "${topic}"
${context ? `Additional context: ${context}` : ""}

Generate a title and detailed content that is engaging and informative. Format the content with key points.`

    const result = await generateObject({
      model: "openai/gpt-4-turbo",
      schema: slideContentSchema,
      prompt,
    })

    return {
      success: true,
      data: result.object,
    }
  } catch (error) {
    console.error("Error generating slide content:", error)
    return {
      success: false,
      error: "Failed to generate content",
    }
  }
}

export async function generatePresentation(topic: string, slideCount = 5) {
  try {
    const slides = []

    // Generate title slide
    const titlePrompt = `Create a compelling presentation title and subtitle for a presentation about: "${topic}"`
    const { text: titleContent } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: titlePrompt,
      temperature: 0.8,
    })

    slides.push({
      id: "1",
      title: "Presentation Title",
      subtitle: titleContent,
      layout: "title",
      type: "AI Generated",
    })

    // Generate content slides
    for (let i = 2; i <= slideCount; i++) {
      const contentPrompt = `Create slide ${i} of ${slideCount} for a presentation about "${topic}". 
Make it a key point or section that builds on the overall narrative.
Format: Return a concise title and 2-3 bullet points.`

      const { object } = await generateObject({
        model: "openai/gpt-4-turbo",
        schema: slideContentSchema,
        prompt: contentPrompt,
      })

      slides.push({
        id: String(i),
        title: object.title,
        content: object.content,
        layout: "content",
        type: "AI Generated",
      })
    }

    return {
      success: true,
      slides,
    }
  } catch (error) {
    console.error("Error generating presentation:", error)
    return {
      success: false,
      error: "Failed to generate presentation",
    }
  }
}

export async function generateTitleIdeas(topic: string) {
  try {
    const { text } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: `Generate 5 creative and compelling presentation titles for the topic: "${topic}". 
Return them as a JSON array of strings. Only return the JSON array, nothing else.`,
      temperature: 0.9,
    })

    const ideas = JSON.parse(text)
    return {
      success: true,
      ideas,
    }
  } catch (error) {
    console.error("Error generating title ideas:", error)
    return {
      success: false,
      error: "Failed to generate title ideas",
    }
  }
}
