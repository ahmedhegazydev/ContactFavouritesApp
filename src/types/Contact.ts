/**
 * Represents a single contact's basic information.
 */
export interface Contact {
  /**
   * Unique identifier for the contact, usually provided by the device's contact system.
   */
  recordID: string;

  /**
   * The given (first) name of the contact.
   */
  givenName: string;

  /**
   * The family (last) name of the contact.
   */
  familyName: string;
}
