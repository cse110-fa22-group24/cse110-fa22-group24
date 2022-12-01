/**
 * Class representing a user profile.
 */
export default class User {
  id = ''
  name = ''
  email = ''
  linkedIn = ''
  website = ''
  skills = new Set()

  /**
   * Create a user profile.
   * @param {string} id - The unique identifier value.
   */
  constructor (id) {
    this.id = id
  }

  /**
   * Add a skill.
   * @param {string} skill - The skill to add.
   */
  addSkill (skill) {
    this.skills.add(skill)
  }

  /**
   * Remove a skill.
   * @param {string} skill - The skill to remove.
   */
  deleteSkill (skill) {
    this.skills.delete(skill)
  }
}
