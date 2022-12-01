/**
 * Class representing a cover letter.
 * @property {string} id - Unique identifier.
 * @property {string} title - Title of the cover letter
 * @property {string} content - Content of the cover letter
 * @property {string} userId - Unique identifier of the user
 */
export default class CoverLetter {
  id = ''
  title = ''
  content = ''
  userId = ''

  /**
   * Create a cover letter.
   * @param {string} id - The unique identifier value.
   * @param {string} title - The title of the cover letter.
   * @param {string} content - The content of the cover letter.
   * @param {string} userId - The unique identifier of the user.
   */
  constructor (id, title, content, userId) {
    this.id = id
    this.title = title
    this.content = content
    this.userId = userId
  }
}
