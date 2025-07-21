/**
 * Represents a contact marked as a favourite with additional metadata.
 */
export interface Favourite {
  /**
   * Unique identifier of the contact (typically same as contact.recordID).
   */
  id: string;

  /**
   * Full name of the contact.
   */
  name: string;

  /**
   * Custom message associated with the favourite contact.
   */
  message: string;

  /**
   * Predicted gender of the contact (e.g., 'male', 'female', or 'unknown').
   */
  gender: string;
}
