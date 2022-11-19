// JobDetails.js

class JobDetails extends HTMLElement {
  // Called once when document.createElement('job-details') is called, or
  // the element is written into the DOM directly as <job-details>
  constructor() {
    super(); // Inherit everything from HTMLElement

    // Attach the shadow DOM to this Web Component (leave the mode open)
    this.attachShadow({ mode: 'open' });

    // Create an <details> element - This will hold our markup once our data is set
    const details = document.createElement('details');

    // Create a style element - This will hold all of the styles for the Web Component
    const style = document.createElement('style');
    // Insert all of the styles from job-details.html into the <style> element
    style.textContent = `
      /* font */
      * {
        font-family: "Nunito", sans-serif;
        font-size: 14pt;
        color: #2d2d34;
      }
    
      /* outer border */
      details {
        border: 1px solid;
        border-radius: 8px;
      }
    
      /* hide details arrow */
      details summary::-webkit-details-marker {
        display: none;
      }
    
      /** summary **/
    
      details > summary {
        list-style: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        gap: 10px;
      }
    
      /* dropdown arrow */
    
      #arrow {
        height: 24px;
        width: 24px;
      }
    
      details[open] #arrow {
        transform: rotate(90deg);
      }
    
      /* company tag */
    
      #company {
        padding: 0px 12px;
        border-radius: 5px;
        background-color: #69ddff;
        font-size: 1.5rem;
      }
    
      /* position title */
    
      #title {
        font-size: 1.5rem;
      }
    
      /* location */
    
      #location-tag {
        margin-left: auto;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: #dbf8ff;
        padding: 5px 8px;
        gap: 5px;
      }
    
      #location {
        font-style: italic;
      }
    
      /* status */
    
      #status {
        padding: 3px 6px;
        border: 2px #eca400 solid;
        border-radius: 5px;
        color: #eca400;
      }
    
      /* notification symbol */
    
      #notification-symbol {
        font-size: 1.5rem;
      }
    
      /* deadline date and time */
    
      #deadline {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    
      #deadline * {
        color: #bf4e30;
      }
    
      /* horizontal rule */
    
      #horizontal-rule {
        margin: 0;
      }
    
      /** dropdown **/
    
      .dropdown {
        display: flex;
        flex-direction: column;
        padding: 0px 15px 10px;
        gap: 10px;
      }
    
      .heading {
        font-size: 1.3rem;
        font-style: italic;
      }
    
      #notes {
        margin: 0;
        padding-left: 30px;
      }
    
      a {
        color: #106efb;
        font-style: italic;
      }
    
      .vertical-bar {
        font-size: 1.3rem;
      }
    
      /* buttons */
    
      #buttons {
        display: flex;
        justify-content: flex-end;
        height: 50px;
      }
    
      .button {
        border: none;
        background: none;
        padding: 0;
        font-size: 30px;
        width: 50px;
      }
    
      .button:hover {
        font-size: 35px;
      }
    
      .button:active {
        font-size: 30px;
      }
    `;

    // Append the <details> and <style> elements to the Shadow DOM
    this.shadowRoot.append(details, style);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let jobDetails = document.createElement('job-details'); // Calls constructor()
   * jobDetails.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <job-details>, must be of the
   *                        following format:
   *                        {
   *                          'company': 'string',
   *                          'title': 'string',
   *                          'location': 'string',
   *                          'status': 'string',
   *                          'deadlineDate': 'string',
   *                          'deadlineTime': 'string',
   *                          'description': 'string',
   *                          'notes': [...'string'],
   *                          'contact': 'string',
   *                          'portal': 'string',
   *                          'tags': [...tag]
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // Select the <details> added to the Shadow DOM in the constructor
    const details = this.shadowRoot.querySelector('details');
    // Set the contents of the <details> with the <details> template
    // given in job-details.html and the data passed in
    details.innerHTML = `
      <summary class="summary">
        <div id="company">${data.company}</div>
        <div id="position-title">${data.title}</div>
        <div id="location">${data.location}</div>
        <div id="status">${data.status}</div>
        <div id="deadline-date">${data.deadlineDate}</div>
        <div id="deadline-time">${data.deadlineTime}</div>
      </summary>
      <div>
        <h1>Description</h1>
        <p>${data.description}</p>
      </div>
      <div>
        <h1>Notes</h1>
        <ul id="notes">
        </ul>
      </div>
      <h1>Contact</h1>
      <a href="${data.contact}">${data.contact}</a>
      <h1>Portal</h1>
      <a href="${data.portal}">${data.portal}</a>
      <h1>Tags</h1>
      <div id="tags">
      </div>
    `;
    
    // Add list item elements to notes unordered list element from data notes array
    const notesUnorderedListElement = details.querySelector('#notes');
    data.notes.forEach((itemString) => {
      const listItemElement = document.createElement('li');
      listItemElement.innerText = itemString;
      notesUnorderedListElement.appendChild(listItemElement);
    });

    // Add tag custom elements to tags div element from data tags array
    const tagsDivElement = details.querySelector('#tags');
    data.tags.forEach((tagObject) => {
      const tagElement = document.createElement('tag');
      tagElement.title = tagObject.title;
      tagsDivElement.appendChild(tagElement);
    });
  }
}

// Define the Class as a customElement so we can create 'job-details' elements
customElements.define('job-details', JobDetails);
