/**
 * Class representing a job application.
 */
export default class JobApplication {
  id = ''
  company = ''
  title = ''
  location = ''
  status = ''
  description = ''
  deadline = new Date()
  notes = ''
  contact = ''
  portalURL = ''
  portalUser = ''
  portalPass = ''

  /**
   * Create a job application.
   * @param {string} id - The unique identifier value.
   */
  constructor (id) {
    this.id = id
  }
}
