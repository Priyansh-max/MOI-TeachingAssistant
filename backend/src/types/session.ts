/**
 * Teaching Session Interface
 * 
 * A lightweight context container representing an active teaching session.
 * Sessions capture the teaching context without storing lesson content.
 * 
 * Storage: Sessions are persisted on the client using IndexedDB.
 * The backend receives session data per-request but does not store it.
 */

export interface TeachingSession {
  /** Unique identifier for the session (UUID) */
  sessionId: string

  /** Grade level (e.g., "5", "9", "12") */
  grade: string

  /** Subject area (e.g., "Math", "Science", "English") */
  subject: string

  /** Specific topic within the subject */
  topic: string

  /** Type of classroom environment (e.g., "in-person", "online", "hybrid") */
  classroomType: string

  /** Timestamp when the session was created */
  createdAt: Date
}
