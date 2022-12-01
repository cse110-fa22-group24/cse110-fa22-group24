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
  addJobsToDocument(jobs)
  // Add the event listeners to the form elements
  initFormHandler()
  // Have the new app button show the form when clicked
  document.querySelector('#new-app-button').addEventListener('click', showForm)
  // Add <sort-bar> elements for each sortable field
  addSortBars(['Company', 'Position', 'Location', 'Status', 'Deadline'])
  // Have the form be hidden to start
  hideForm()

  console.log('company true', await sortTwo('Company', true))
  console.log('company false', await sortTwo('Company', false))
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
  
  // Add an eventListener for search bar keyup event
  const searchBar = document.getElementById('search')
  
  searchBar.addEventListener('keyup', async (e)=>{
    //catch the input in search box
    const keyword = searchBar.value.toLocaleLowerCase().replaceAll(' ', '');
    const jobElements = document.querySelectorAll('job-details');
   
   //loop over all job applications on the page
    for (const jobEl of jobElements) {
      const shadowRoot = jobEl.shadowRoot

      // Get all fields that can be searched and also preprocess them
      const company = shadowRoot.querySelector('#company').textContent.toLocaleLowerCase().replaceAll(' ', '')
      const position = shadowRoot.querySelector('#title').textContent.toLocaleLowerCase().replaceAll(' ', '')
      const status = shadowRoot.querySelector('#status').textContent.toLocaleLowerCase().replaceAll(' ', '').slice(7)
      const location = shadowRoot.querySelector('#location').textContent.toLocaleLowerCase().replaceAll(' ', '')

      //if any one of the four fields contains the input, show the item
      if(company.includes(keyword) || position.includes(keyword)
         || status.includes(keyword) || location.includes(keyword)){
        jobEl.style.display = 'flex';
      }
      else{//else hide the item
        jobEl.style.display = 'none';
      }

    }
  })

  /** 
  searchBar.addEventListener('keypress', async (e) => {
    // if user press enter to search
    if (e.key === 'Enter') {
      // Catch and preprocess user input
      const keyword = searchBar.value.toLocaleLowerCase().replaceAll(' ', '')
      const jobElements = document.querySelectorAll('job-details')

      // For each job application
      for (const jobEl of jobElements) {
        const shadowRoot = jobEl.shadowRoot

        // Get all fields that can be searched and also preprocess them
        const company = shadowRoot.querySelector('#company').textContent.toLocaleLowerCase().replaceAll(' ', '')
        const position = shadowRoot.querySelector('#title').textContent.toLocaleLowerCase().replaceAll(' ', '')
        const status = shadowRoot.querySelector('#status').textContent.toLocaleLowerCase().replaceAll(' ', '').slice(7)
        const location = shadowRoot.querySelector('#location').textContent.toLocaleLowerCase().replaceAll(' ', '')

        // if there's nothing in the search box, display all job apps by default
        if (keyword === '') {
          jobEl.style.display = 'flex'
        } else {
          // if none of the fields matches user input, hide the item
          if (keyword !== company && keyword !== position && keyword !== status && keyword !== location) {
            jobEl.style.display = 'none'
          }

          // if one of the fields matches user input, show the item
          if (keyword === company || keyword === position || keyword === status || keyword === location) {
            jobEl.style.display = 'flex'
          }
        }
      }
    }
  })
  */
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
  jobDetails.onClickDelete = async () => {
    // Get confirmation from user
    if (window.confirm('Are you sure you want to delete this?')) {
      // Remove the job-details element from job-details-list
      list.removeChild(jobDetails)
      // Remove the job from the database
      await database.deleteJob(job.id)
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
 * Takes in an array of field names and for each name creates a
 * new `sort-bar` element, adds the name to that element
 * using `element.data = {...}`, and then appends that new element
 * to `sort-bar-list`.
 * @param {Array<Object>} fieldNames An array of field names
 */
function addSortBars (fieldNames) {
  const sortBarList = document.querySelector('#sort-bar-list')
  for (const fieldName of fieldNames) {
    const sortBar = document.createElement('sort-bar')
    sortBar.fieldName = fieldName
    sortBar.onClick = () => {
      if (sortBar.fieldEnabled) {
        setSortRule(fieldName, sortBar.orderReversed)
      } else {
        removeSortRule(fieldName)
      }
    }
    sortBarList.appendChild(sortBar)
  }
}

async function sortTwo (tag, reverse) {
  // console.log("sort");
  const jobs = await database.getAllJobs()
  if (tag === 'Company') {
    return jobs.sort((a, b) => {
      const result = !reverse ? a.company > b.company : a.company < b.company
      return result === true ? 1 : -1
    })
  } else if (tag === 'Job Title') {
    return jobs.sort((a, b) => {
      const result = !reverse ? a.position > b.position : a.position < b.position
      return result === true ? 1 : -1
    })
  } else if (tag === 'Deadline') {
    return jobs.sort((a, b) => {
      const result = !reverse ? a.deadline > b.deadline : a.deadline < b.deadline
      return result === true ? 1 : -1
    })
  } else if (tag === 'Status') {
    return jobs.sort((a, b) => {
      const result = !reverse ? a.status > b.status : a.status < b.status
      return result === true ? 1 : -1
    })
  }
}

/**
 * for each job
 *  get tags for job
 */

/**
 * search + create
 */

/**
 * An object containing the names of fields to sort by,
 * and whether to sort each in ascending or descending order
 *
 * @global
 * @type {Object}
 */
const sortRules = {}

/**
 * Set a sorting rule in `sortRules`.
 *
 * @param {String} fieldName The name of a field to sort by
 * @param {Boolean} ascOrDesc Whether to sort in ascending or descending order
 */
function setSortRule (fieldName, ascOrDesc) {
  sortRules[fieldName] = ascOrDesc
  onSortRulesChanged()
}

/**
 * Remove a sorting rule from `sortRules`.
 *
 * @param {String} fieldName The name of a field to no longer sort by
 */
function removeSortRule (fieldName) {
  delete sortRules[fieldName]
  onSortRulesChanged()
}

/**
 * Called when `sortRules` is changed.
 */
function onSortRulesChanged () {
  console.log(sortRules)
}
