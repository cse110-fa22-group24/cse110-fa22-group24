/**
 * Class representing an experience tag.
 * @property {string} experienceId - Unique identifier of the experience
 */

import Tag from '../scripts/Tag'

export default class ExperienceTag extends Tag {
  experienceId = ''

  /**
   * Create an experience tag.
   * @param {string} id - The unique identifier value.
   * @param {string} title - The title of the tag.
   * @param {string} experienceId - The unique identifier value of the experience object.
   */
  constructor (id, title, experienceId) {
    super(id, title)
    this.experienceId = experienceId
  }
}
