/**
 * Class representing an experience.
 * @property {string} id - Unique identifier.
 * @property {string} title
 * @property {Date} start
 * @property {Date} end
 * @property {Date} description
 */
 export default class Experience {
  
  id = '';
  title = '';
  start = new Date();
  end = new Date();
  description = '';
  
  /**
   * Create an experience.
   * @param {string} id - The unique identifier value.
   */
  constructor(id) {
    this.id = id;
  }

}
