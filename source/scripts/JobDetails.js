/* eslint-disable accessor-pairs */
// JobDetails.js

class JobDetails extends HTMLElement {
  // Called once when document.createElement('job-details') is called, or
  // the element is written into the DOM directly as <job-details>
  constructor () {
    super() // Inherit everything from HTMLElement

    // Attach the shadow DOM to this Web Component (leave the mode open)
    this.attachShadow({ mode: 'open' })

    // Create an <details> element - This will hold our markup once our data is set
    const details = document.createElement('details')

    // Create a link element - This will hold a reference to the stylesheet for the Web Component
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', './styles/job-details.css')

    // Append the <details> and <link> elements to the Shadow DOM
    this.shadowRoot.append(details, link)
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
  set data (data) {
    // If nothing was passed in, return
    if (!data) return
    this.id = data.id
    // Select the <details> added to the Shadow DOM in the constructor
    const details = this.shadowRoot.querySelector('details')
    // Set the contents of the <details> with the <details> template
    // given in job-details.html and the data passed in
    details.innerHTML = `
      <summary>
        <div id="arrow"><img src="./assets/next.png" alt=">"></div>
        <div id="company">${data.company}</div> 
        <div id="title">${data.position}</div>
        <div id="location-tag">
          <span id="pin-symbol">????</span>
          <span id="location">${data.location}</span>
        </div>
        <div id="status">Status: ${data.status}</div>
        <div id="notification-symbol">????</div>
        <div id="deadline">
          <span id="deadline-date">MM/DD/YY</span>
          <span id="deadline-time">HH:MM XM</span>
        </div>
      </summary>
      <div class="dropdown">
        <hr id="horizontal-rule">
        ${data.description
         ? `<div class="heading">Description</div>
          <div id="description">${data.description}</div>`
        : ''}
        ${data.notes
         ? `<div class="heading">Notes</div>
          <div id="notes">${data.notes}</div>`
        : ''}
        ${(data.contactName || data.contactEmail)
         ? `<div>
            ${data.contactName
             ? `<span class="heading">Contact:</span>
              <a>${data.contactName}</a>`
            : ''}
            ${(data.contactName && data.contactEmail)
              ? '<span class="vertical-bar">|</span>'
            : ''}
            ${data.contactEmail
             ? `<span class="heading">Email:</span>
              <a href="mailto:${data.contactEmail}">${data.contactEmail}</a>`
            : ''}
          </div>`
        : ''}
        ${(data.portalUrl || data.portalUser || data.portalPass)
         ? `<div>
            ${data.portalUrl
             ? `<span class="heading">Portal:</span>
              <a href="${data.portalUrl}">${data.portalUrl}</a>`
            : ''}
            ${(data.portalUrl && data.portalUser)
              ? '<span class="vertical-bar">|</span>'
            : ''}
            ${data.portalUser
             ? `<span class="heading">Username:</span>
              <a>${data.portalUser}</a>`
            : ''}
            ${(data.portalUser && data.portalPass)
              ? '<span class="vertical-bar">|</span>'
            : ''}
            ${data.portalPass
             ? `<span class="heading">Password:</span>
              <a>${data.portalPass}</a>`
            : ''}
          </div>`
        : ''}
        <div id="buttons">
          <button class="button" type="button" id="delete">???????</button>
          <button class="button" type="button" id="edit">??????</button>
        </div>
      </div>
    `

    // Convert deadline to Date object.
    const date = new Date(data.deadline)
    // Add formatted date
    const deadlineDateSpanElement = details.querySelector('#deadline-date')
    deadlineDateSpanElement.innerText = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() - 2000}`
    // Add formatted time
    const deadlineTimeSpanElement = details.querySelector('#deadline-time')
    deadlineTimeSpanElement.innerText = date.toLocaleTimeString('en-US', { timeStyle: 'short' })
  }

  /**
   * Called when the .onClickDelete property is set on this element
   *
   * @param {function} onClickDelete - The function to be called
   *                                   when the delete button is pressed
   */
  set onClickDelete (onClickDelete) {
    this.shadowRoot.querySelector('#delete').addEventListener('click', onClickDelete)
  }

  /**
   * Called when the .onClickEdit property is set on this element
   *
   * @param {function} onClickEdit - The function to be called
   *                                 when the edit button is pressed
   */
  set onClickEdit (onClickEdit) {
    this.shadowRoot.querySelector('#edit').addEventListener('click', onClickEdit)
  }
}

// Define the Class as a customElement so we can create 'job-details' elements
customElements.define('job-details', JobDetails)
