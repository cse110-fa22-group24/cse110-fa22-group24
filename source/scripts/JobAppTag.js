/**
 * Class representing a job app tag.
 * @property {string} jobAppId - Unique identifier of the job application
 */

 import Tag from '../scripts/Tag';

 export default class JobAppTag extends Tag {

    jobAppId = '';
  
    /**
     * Create a job application tag.
     * @param {string} id - The unique identifier value.
     * @param {string} title - The title of the tag.
     * @param {string} jobAppId - The unique identifier value of the job app.
     */
    constructor(id, title, jobAppId) {
      super(id, title);
      this.jobAppId = jobAppId;
    }
  
  }
  