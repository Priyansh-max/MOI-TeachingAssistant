/**
 * Action Card Response Format
 * 
 * Represents the structured response returned from the backend
 * containing teaching action recommendations.
 * 
 * Caching: Action card responses are cached locally on the client
 * using IndexedDB for offline fallback when the network is unavailable.
 */

/** Card timing type indicating when the action should be taken */
export type CardType = 'NOW' | 'NEXT' | 'LATER'

/** Individual action card with timing and instruction */
export interface ActionCard {
  /** When to perform this action */
  type: CardType

  /** The action or instruction text */
  text: string
}

/** Complete response containing all action cards for a session */
export interface ActionCardResponse {
  /** Session this response belongs to */
  sessionId: string

  /** When the response was generated */
  timestamp: Date

  /** Array of action cards sorted by timing priority */
  cards: ActionCard[]
}
