// main.js

import DBUtil from './JobAppDB.js'

const database = new DBUtil()

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

// Starts the program, all function calls trace back here
async function init () {
  // Get the jobs from database
  await database.setupDB()
  const jobs = await database.getAllJobs()
  // Add each job to the job-details-list element
  await addJobsToDocument(jobs)
  // Add the event listeners to the form elements
  initFormHandler()
  // Have the new app button show the form when clicked
  document.querySelector('#new-app-button').addEventListener('click', showForm)
  // Add <sort-bar> elements for each sortable field
  addSortBars(['Company', 'Position', 'Location', 'Status', 'Deadline'])
  // Have the delete-cancel button hide the delete-popup when clicked
  document.querySelector('#delete-cancel').addEventListener('click', hideDeletePopup)
  // Have the profile button show confetti when clicked
  const jsConfetti = new JSConfetti() /* eslint-disable-line */
  document.querySelector('#profile-button').addEventListener('click', () => {
    jsConfetti.addConfetti()
  })
}

/**
 * Takes in an array of jobs and for each job creates a
 * new `job-details` element, adds the job data to that element
 * using `element.data = {...}`, and then appends that new job
 * to `job-details-list`.
 * @param {Array<Object>} jobs An array of jobs
 */
async function addJobsToDocument (jobs) {
  // Loop through each of the jobs in the passed in array,
  // and create a <job-details> element for each one
  for (const job of jobs) {
    await addJobToDocument(job)
  }
}

/**
 * Adds the necesarry event handlers to `form`.
 */
function initFormHandler () {
  // Get a reference to the <form> element
  const form = document.querySelector('form')
  // Add an event listener for the 'submit' event,
  // which fires when the submit button is clicked
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    // Create a new FormData object from the <form> element reference above
    const formData = new FormData(form)
    // Create an empty object
    const jobObject = {}
    // Extract the keys and corresponding values from the
    // FormData object and insert them into jobObject
    for (const [key, value] of formData) {
      jobObject[key] = value
    }
    // Create or edit a <job-details> element with the data in jobObject
    await addJobToDocument(jobObject)
    // Reset the <job-details> element to edit
    jobDetailsToEdit = null
    // Clear the <form> fields
    clearForm()
    // Sort jobs
    await sort()
    // Hide the form
    hideForm()
  })
  // Add an event listener for when the cancel button is clicked
  const cancelButton = form.querySelector('#cancel')
  cancelButton.addEventListener('click', () => {
    // Hide the form
    hideForm()
    // Reset the <job-details> element to edit
    jobDetailsToEdit = null
    // Clear the <form> fields
    clearForm()
  })
  // Add an eventListener for when a key is released in the search bar
  const searchBar = document.getElementById('search')
  filterSearch = () => {
    // Get the current search query
    const query = searchBar.value.toLocaleLowerCase().replaceAll(' ', '')
    // For every job-details element on the page
    for (const jobDetails of document.querySelectorAll('job-details')) {
      const shadowRoot = jobDetails.shadowRoot
      // Get all fields that can be searched and preprocess them
      const company = shadowRoot.querySelector('#company').textContent.toLocaleLowerCase().replaceAll(' ', '')
      const position = shadowRoot.querySelector('#title').textContent.toLocaleLowerCase().replaceAll(' ', '')
      const status = shadowRoot.querySelector('#status').textContent.toLocaleLowerCase().replaceAll(' ', '').slice(7)
      const location = shadowRoot.querySelector('#location').textContent.toLocaleLowerCase().replaceAll(' ', '')
      // If any of the fields match the query
      if (company.includes(query) || position.includes(query) ||
           status.includes(query) || location.includes(query)) {
        // Show the job-details element
        jobDetails.removeAttribute('style')
      } else {
        // Hide the job-details element
        jobDetails.setAttribute('style', 'display: none')
      }
    }
  }
  searchBar.addEventListener('keyup', filterSearch)
}

/**
 * Clear the `form` fields
 */
function clearForm () {
  // Get a reference to the <form> element
  const form = document.querySelector('form')
  // Create a new FormData object from the <form> element reference above
  const formData = new FormData(form)
  // For each key in the FormData object
  for (const key of formData.keys()) {
    // Clear the corresponding field in the form
    form.querySelector(`#${key}`).value = null
  }
}

/**
 * Create or edit a `job-details` element.
 *
 * @param {Object} job The job data to pass to the `job-details` element
 */
async function addJobToDocument (job) {
  // Get a reference to the job-details-list element
  const list = document.querySelector('#job-details-list')
  // Get the <job-details> element to edit, otherwise create a new <job-details> element
  const jobDetails = jobDetailsToEdit || document.createElement('job-details')
  // If there is no <job-details> element to edit
  if (!jobDetailsToEdit) {
    // Generate a new id if the job is new
    if (!job.id) job.id = Date.now()
  } else {
    // Get the existing id
    job.id = Number(jobDetails.id)
    // Delete the existing job from the database
    database.deleteJob(job.id)
  }
  // Add the job data to <job-details>
  jobDetails.data = job
  // Add the onClickDelete function to <job-details>
  jobDetails.onClickDelete = () => {
    // Get confirmation from user
    showDeletePopup()
    document.querySelector('#delete-submit').onclick = async () => {
      // Remove the job-details element from job-details-list
      list.removeChild(jobDetails)
      // Remove the job from the database
      await database.deleteJob(job.id)
      hideDeletePopup()
    }
  }
  // Get a reference to the <form> element
  const form = document.querySelector('form')
  // Add the onClickEdit function to <job-details>
  jobDetails.onClickEdit = () => {
    // Populate the fields in the <form> with the job data
    for (const property in job) {
      const field = form.querySelector(`#${property}`)
      if (field) field.value = job[property]
    }
    // Set the <job-details> element to edit
    jobDetailsToEdit = jobDetails
    // Show the form
    showForm()
  }
  // If there is no <job-details> element to edit
  if (!jobDetailsToEdit) {
    // Append this new <job-details> to job-details-list
    list.appendChild(jobDetails)
  }
  // Save this job to the database
  await database.addJob(job)
}

/**
 * The `job-details` element to edit on form submission
 *
 * @global
 * @type {JobDetails}
 */
let jobDetailsToEdit = null

/**
 * Hide the `form` element
 */
function hideForm () {
  document.querySelector('#job-details-form').setAttribute('style', 'display: none')
}

/**
 * Show the `form` element
 */
function showForm () {
  document.querySelector('#job-details-form').removeAttribute('style')
}

/**
 * Hide the `delete-popup` element
 */
function hideDeletePopup () {
  document.querySelector('#delete-popup-container').setAttribute('style', 'display: none')
}

/**
 * Show the `delete-popup` element
 */
function showDeletePopup () {
  document.querySelector('#delete-popup-container').removeAttribute('style')
}

/**
 * Takes in an array of field names and for each name creates a
 * new `sort-bar` element, adds the name to that element
 * using `element.data = {...}`, and then appends that new element
 * to `sort-bar-list`.
 * @param {Array<Object>} fieldNames An array of field names
 */
function addSortBars (fieldNames) {
  const sortBarList = document.querySelector('#sort-bar-list')
  // For each field name
  for (const fieldName of fieldNames) {
    // Create a new sort bar
    const sortBar = document.createElement('sort-bar')
    // Set text of sort bar
    sortBar.fieldName = fieldName
    // Set behavior on click
    sortBar.onClick = async () => {
      // Disable other sort bars
      for (const otherSortBar of sortBarList.children) {
        if (otherSortBar !== sortBar) otherSortBar.disable()
      }
      // Sort jobs
      [sortField, sortOrder] = [fieldName.toLowerCase(), sortBar.orderReversed]
      await sort()
    }
    // Add new sort-bar element to sort-bar-list
    sortBarList.appendChild(sortBar)
    // Sort by deadline by default
    if (fieldName === 'Deadline') sortBar.click()
  }
}

/**
 * The field name to be sorting by
 *
 * @global
 * @type {String}
 */
let sortField = ''

/**
 * The order to be sorting by
 *
 * @global
 * @type {String}
 */
let sortOrder = false

/**
 * Sort the job-details elements by the current sortField and sortOrder
 */
async function sort () {
  const jobs = (await database.getAllJobs()).sort((a, b) => {
    [a, b] = [a[sortField], b[sortField]]
    return (sortOrder ? a < b : a > b) ? 1 : -1
  })
  // Remove all jobs from document
  document.querySelector('#job-details-list').innerHTML = '<!-- Add job-details elements here -->'
  // Add jobs back to document in sorted order
  await addJobsToDocument(jobs)
  // Filter by search query
  filterSearch()
}

/**
 * The function which filters the jobs by search query
 *
 * @global
 * @type {Function}
 */
let filterSearch = () => {}
