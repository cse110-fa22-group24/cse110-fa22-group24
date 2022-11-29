// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  /* TODO: get all jobs from database
   * const jobs = database.getAllJobs();
   */
  // Get the jobs from localStorage
  const jobs = getJobsFromStorage();
  // Add each job to the job-details-list element
  addJobsToDocument(jobs);
  // Add the event listeners to the form elements
  initFormHandler();
  // Have the new app button show the form when clicked
  document.querySelector('#new-app-button').addEventListener('click', showForm);
  // Add <sort-bar> elements for each sortable field
  addSortBars(['Company', 'Position', 'Location', 'Status', 'Deadline']);
  // Have the form be hidden to start
  hideForm();
}

/**
 * Reads `jobs` from localStorage and returns an array of
 * all of the jobs found (parsed, not in string form). If
 * nothing is found in localStorage for `jobs`, an empty array
 * is returned.
 * @returns {Array<Object>} An array of jobs found in localStorage
 */
function getJobsFromStorage() {
  return JSON.parse(localStorage.getItem('jobs')) || [];
}

/**
 * Takes in an array of jobs and for each job creates a
 * new `<job-details>` element, adds the job data to that card
 * using `element.data = {...}`, and then appends that new job
 * to `job-details-list`.
 * @param {Array<Object>} jobs An array of jobs
 */
function addJobsToDocument(jobs) {
  // Loop through each of the jobs in the passed in array,
  // and create a <job-details> element for each one
  for (const job of jobs) {
    addJobToDocument(job);
  }
}

/**
 * Takes in an array of jobs, converts it to a string, and then
 * saves that string to `jobs` in localStorage
 * @param {Array<Object>} jobs An array of jobs
 */
function saveJobsToStorage(jobs) {
  localStorage.setItem('jobs', JSON.stringify(jobs));
}

/**
 * Adds the necesarry event handlers to `<form>`.
 */
function initFormHandler() {
  // Get a reference to the <form> element
  const form = document.querySelector('form');
  // Add an event listener for the 'submit' event,
  // which fires when the submit button is clicked
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Create a new FormData object from the <form> element reference above
    const formData = new FormData(form);
    // Create an empty object
    const jobObject = {};
    // Extract the keys and corresponding values from the
    // FormData object and insert them into jobObject
    for (const [key, value] of formData) {
      jobObject[key] = value;
    }
    // Create or edit a <job-details> element with the data in jobObject
    addJobToDocument(jobObject);
    // Reset the <job-details> element to edit
    jobDetailsToEdit = null;
    // Clear the <form> fields
    clearForm();

    // TODO: code below can be shifted to addJobsToDocuments

    // Get the jobs array from localStorage
    const jobs = getJobsFromStorage();
    // Add this new job to it
    jobs.push(jobObject);
    // Save the jobs array back to localStorage
    saveJobsToStorage(jobs);
    // Hide the form
    hideForm();
  });
  // Add an event listener for when the cancel button is clicked
  const cancelButton = form.querySelector(`#cancel`);
  cancelButton.addEventListener('click', () => {
    // Hide the form
    hideForm();
    // Reset the <job-details> element to edit
    jobDetailsToEdit = null;
    // Clear the <form> fields
    clearForm();
  });
}

/**
 * Clear the `<form>` fields
 */
function clearForm() {
  // Get a reference to the <form> element
  const form = document.querySelector('form');
  // Create a new FormData object from the <form> element reference above
  const formData = new FormData(form);
  // For each key in the FormData object
  for (const key of formData.keys()) {
    // Clear the corresponding field in the form
    form.querySelector(`#${key}`).value = null;
  }
}

/**
 * Create or edit a `<job-details>` element.
 * 
 * @param {Object} job The job data to pass to the `<job-details>` element
 */
function addJobToDocument(job) {
  // Get a reference to the job-details-list element
  const list = document.querySelector('#job-details-list');
  // Get the <job-details> element to edit, otherwise create a new <job-details> element
  const jobDetails = jobDetailsToEdit || document.createElement('job-details');
  /** TODO:
   * // generate new id
   * const new_id = new id();
   *
   * // if in Edit mode, delete the old data in database
   * if(jobDetailsToEdit != null){
   *   database.delete(jobDetails.id);
   * }
   *
   * // set the id to newly generated id
   * jobDetails.id = new_id;
   * job[id] = new_id;
   *
   * // update database with data
   * database.update(job);
   */
  // Add the job data to <job-details>
  jobDetails.data = job;
  // Add the onClickDelete function to <job-details>
  jobDetails.onClickDelete = () => {
    // Get confirmation from user
    if (window.confirm('Are you sure you want to delete this?')) {
      // Remove the <job-details> element from job-details-list
      list.removeChild(jobDetails);
    }
  }
  // Get a reference to the <form> element
  const form = document.querySelector('form');
  // Add the onClickEdit function to <job-details>
  jobDetails.onClickEdit = () => {
    // Populate the fields in the <form> with the job data
    for (const property in job) {
      form.querySelector(`#${property}`).value = job[property];
    }
    // Set the <job-details> element to edit
    jobDetailsToEdit = jobDetails;
    // Show the form
    showForm();
  }
  // If there is no <job-details> element to edit
  if (!jobDetailsToEdit) {
    // Append this new <job-details> to job-details-list
    list.appendChild(jobDetails);
  }
}

/**
 * The `<job-details>` element to edit on form submission
 * 
 * @global
 * @type {JobDetails}
 */
let jobDetailsToEdit = null;


/**
 * Hide the `<form>` element
 */
function hideForm(){
  document.querySelector('#job-details-form').setAttribute('style', 'display: none');
}

/**
 * Show the `<form>` element
 */
function showForm(){
  document.querySelector('#job-details-form').removeAttribute('style');
}

/**
 * Takes in an array of field names and for each name creates a
 * new `<sort-bar>` element, adds the name to that element
 * using `element.data = {...}`, and then appends that new element
 * to `sort-bar-list`.
 * @param {Array<Object>} fieldNames An array of field names
 */
function addSortBars(fieldNames) {
  const sortBarList = document.querySelector("#sort-bar-list");
  for (const fieldName of fieldNames) {
    const sortBar = document.createElement('sort-bar');
    sortBar.fieldName = fieldName;
    sortBar.onClick = () => {
      if (sortBar.fieldEnabled) {
        setSortRule(fieldName, sortBar.orderAscending);
      } else {
        removeSortRule(fieldName);
      }
    };
    sortBarList.appendChild(sortBar);
  }
}

/**
 * An object containing the names of fields to sort by,
 * and whether to sort each in ascending or descending order
 * 
 * @global
 * @type {Object}
 */
let sortRules = {};

/**
 * Set a sorting rule in `sortRules`.
 * 
 * @param {String} fieldName The name of a field to sort by
 * @param {Boolean} ascOrDesc Whether to sort in ascending or descending order
 */
function setSortRule(fieldName, ascOrDesc) {
  sortRules[fieldName] = ascOrDesc;
  onSortRulesChanged();
}

/**
 * Remove a sorting rule from `sortRules`.
 * 
 * @param {String} fieldName The name of a field to no longer sort by
 */
 function removeSortRule(fieldName) {
  delete sortRules[fieldName];
  onSortRulesChanged();
}

/**
 * Called when `sortRules` is changed.
 */
function onSortRulesChanged() {
  console.log(sortRules);
}
