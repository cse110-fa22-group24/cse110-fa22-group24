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
      <summary>
        <div id="arrow"><img src="./assets/next.png"></div>
        <div id="company">${data.company}</div> 
        <div id="title">${data.position}</div>
        <div id="location-tag">
          <span id="pin-symbol">📍</span>
          <span id="location">${data.location}</span>
        </div>
        <div id="status">Status: ${data.status}</div>
        <div id="notification-symbol">🔔</div>
        <div id="deadline">
          <span id="deadline-date">MM/DD/YY</span>
          <span id="deadline-time">HH:MM XM</span>
        </div>
      </summary>
      <div class="dropdown">
        <hr id="horizontal-rule">
        <div class="heading">Description</div>
        <div id="description">${data.description}</div>
        <div>
          <div class="heading">Notes</div> 
          <ul id="notes">
            <li>Teams of interest</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
        <div>
          <span class="heading">Contact:</span>
          <a>${data.contactName}</a>
          <span class="vertical-bar">|</span>
          <span class="heading">Email:</span>
          <a href="mailto:${data.contactEmail}">${data.contactEmail}</a>
        </div>
        <div>
          <span class="heading">Portal:</span>
          <a href="${data.portalUrl}">${data.portalUrl}</a>
          <span class="vertical-bar">|</span>
          <span class="heading">Username:</span>
          <a>${data.portalUser}</a>
          <span class="vertical-bar">|</span>
          <span class="heading">Password:</span>
          <a>${data.portalPass}</a>
        </div>
        <div class="heading">Tags</div>
        <div id="buttons">
          <button class="button" type="button" id="delete">🗑️</button>
          <button class="button" type="button" id="edit">✏️</button>
        </div>
      </div>
    `;

    // Convert deadline to Date object.
    const date = new Date(data.deadline);
    // Add formatted date
    const deadlineDateSpanElement = details.querySelector('#deadline-date');
    deadlineDateSpanElement.innerText = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()-2000}`;
    // Add formatted time
    const deadlineTimeSpanElement = details.querySelector('#deadline-time');
    deadlineTimeSpanElement.innerText = date.toLocaleTimeString('en-US', {timeStyle: "short"});

    // Add list item elements to notes unordered list element from data notes array
    const notesUnorderedListElement = details.querySelector('#notes');
    /* TODO: Notes as bullet points?
    data.notes.forEach((itemString) => {
      const listItemElement = document.createElement('li');
      listItemElement.innerText = itemString;
      notesUnorderedListElement.appendChild(listItemElement);
    });*/

    // Add tag custom elements to tags div element from data tags array
    const tagsDivElement = details.querySelector('#tags');
    /* TODO: Add tag functionality
    data.tags.forEach((tagObject) => {
      const tagElement = document.createElement('tag');
      tagElement.title = tagObject.title;
      tagsDivElement.appendChild(tagElement);
    });*/
  }

  /**
   * Called when the .onClickDelete property is set on this element
   * 
   * @param {function} onClickDelete - The function to be called
   *                                   when the delete button is pressed
   */
  set onClickDelete(onClickDelete) {
    // Select the <details> added to the Shadow DOM in the constructor
    const details = this.shadowRoot.querySelector('details');
    const deleteButton = details.querySelector('#delete');
    deleteButton.addEventListener('click', onClickDelete);
  }

  /**
   * Called when the .onClickEdit property is set on this element
   * 
   * @param {function} onClickEdit - The function to be called
   *                                 when the edit button is pressed
   */
  set onClickEdit(onClickEdit) {
    // Select the <details> added to the Shadow DOM in the constructor
    const details = this.shadowRoot.querySelector('details');
    const editButton = details.querySelector('#edit');
    editButton.addEventListener('click', onClickEdit);
  }
}

// Define the Class as a customElement so we can create 'job-details' elements
customElements.define('job-details', JobDetails);
