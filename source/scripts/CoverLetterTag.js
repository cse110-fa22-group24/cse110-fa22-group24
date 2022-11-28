/**
 * Class representing a cover letter tag.
 * @property {string} coverLetterId - Unique identifier of the cover letter object
 */

 import Tag from '../scripts/Tag';

 export default class CoverLetterTag extends Tag {

    coverLetterId = '';
  
    /**
     * Create a cover letter tag.
     * @param {string} id - The unique identifier value.
     * @param {string} title - The title of the tag.
     * @param {string} coverLetterId - The unique identifier value of the cover letter object.
     */
    constructor(id, title, coverLetterId) {
      super(id, title);
      this.coverLetterId = coverLetterId;
    }
  
  }
  