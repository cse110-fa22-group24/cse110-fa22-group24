// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the jobs from localStorage
  const jobs = getJobsFromStorage();
  const names = ["Company","Job Title","Deadline","Status"];
  create_sortBars(names);
  
  // Add each job to the job-details-list element
  addJobsToDocument(jobs);
  // Add the event listeners to the form elements
  initFormHandler();

  document.querySelector('#new-app-button').addEventListener('click', () => {
    showForm();
  });
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
    // Get the jobs array from localStorage
    const jobs = getJobsFromStorage();
    // Add this new job to it
    jobs.push(jobObject);
    // Save the jobs array back to localStorage
    saveJobsToStorage(jobs);
    hideForm();
  });
  // Add an event listener for when the cancel button is clicked
  const cancelButton = form.querySelector(`#cancel`);
  cancelButton.addEventListener('click', () => {
    // Reset the <job-details> element to edit
    jobDetailsToEdit = null;
    hideForm();
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
  // Add the job data to <job-details>
  jobDetails.data = job;
  // Add the onClickDelete function to <job-details>
  jobDetails.onClickDelete = () => {
    // Remove the <job-details> element from job-details-list
    list.removeChild(jobDetails);
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



function hideForm(){
  document.querySelector('#job-details-form').setAttribute('style', 'display: none');
}

function showForm(){
  document.querySelector('#job-details-form').removeAttribute('style');
}

function create_sortBars(name){
  for(const item of name){
    const curbar = document.createElement('sort-bar');
    curbar.setAttribute("id", item);
    curbar.name = item;
    curbar.onClickSort = [sort(), sortReverse()];
    document.querySelector("#sort-bar-list").appendChild(curbar);
  }

}

function sort(){
  console.log("sort");
}

function sortReverse(){
  console.log('sortReverse');
}