/**
 * Parent class representing a generic tag.
 */
export default class Tag {
  id = ''
  title = ''

  /**
   * Create a tag.
   * @param {string} id - The unique identifier value.
   * @param {string} title - The title of the tag.
   */
  constructor (id, title) {
    this.id = id
    this.title = title
  }
}
