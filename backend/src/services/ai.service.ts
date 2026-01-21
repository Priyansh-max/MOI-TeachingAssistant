/**
 * AI Service
 * 
 * Handles communication with the LLM API and response parsing.
 * Transforms raw AI responses into structured Action Card format.
 */

import OpenAI from 'openai'
import { TeachingSession, ActionCard, ActionCardResponse, CardType } from '../types'
import { TEACHING_SYSTEM_PROMPT, buildTeachingPrompt } from '../prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Request payload for generating action cards
 */
export interface GenerateCardsRequest {
  session: TeachingSession
  problem: string
}

/**
 * Generates action cards for a teaching session.
 * Calls the LLM with pedagogy-constrained prompts.
 */
export async function generateActionCards(
  request: GenerateCardsRequest
): Promise<ActionCardResponse> {
  const { session, problem } = request

  const userPrompt = `${buildTeachingPrompt(session)}

Teacher's problem: ${problem}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    messages: [
      { role: 'system', content: TEACHING_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  })

  const rawResponse = completion.choices[0]?.message?.content || ''
  const cards = parseActionCards(rawResponse)

  return {
    sessionId: session.sessionId,
    timestamp: new Date(),
    cards,
  }
}

/**
 * Parses raw LLM text response into structured Action Cards.
 * Expects format: NOW (30 seconds): / NEXT (2-3 minutes): / LATER (end of class):
 */
function parseActionCards(response: string): ActionCard[] {
  const cards: ActionCard[] = []

  const patterns: { type: CardType; regex: RegExp }[] = [
    { type: 'NOW', regex: /NOW\s*\([^)]*\):\s*(.+?)(?=NEXT|LATER|$)/is },
    { type: 'NEXT', regex: /NEXT\s*\([^)]*\):\s*(.+?)(?=LATER|$)/is },
    { type: 'LATER', regex: /LATER\s*\([^)]*\):\s*(.+?)$/is },
  ]

  for (const { type, regex } of patterns) {
    const match = response.match(regex)
    if (match && match[1]) {
      cards.push({
        type,
        text: match[1].trim(),
      })
    }
  }

  return cards
}
