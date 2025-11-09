import { generateObject } from "ai"
import { z } from "zod"

const slideContentSchema = z.object({
  title: z.string(),
  content: z.string(),
  suggestions: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { topic, context } = await req.json()

    if (!topic) {
      return Response.json({ error: "Topic is required" }, { status: 400 })
    }

    const result = await generateObject({
      model: "openai/gpt-4-turbo",
      schema: slideContentSchema,
      prompt: `Create a presentation slide about: "${topic}"
${context ? `Context: ${context}` : ""}

Generate a clear title and informative content.`,
    })

    return Response.json({
      success: true,
      data: result.object,
    })
  } catch (error) {
    console.error("Error in generate-slide:", error)
    return Response.json({ error: "Failed to generate slide content" }, { status: 500 })
  }
}
