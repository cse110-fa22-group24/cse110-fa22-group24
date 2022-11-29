// main.js
import dbUtil from "./JobAppDB.js";
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

const database=new dbUtil();

// Starts the program, all function calls trace back here
async function init() {
  await database.setupDB();
  // Get the jobs from localStorage
  const jobs = await getJobsFromStorage();
  const names = ["Company","Job Title","Deadline","Status"];
  create_sortBars(names);
  
  // Add each job to the <main> element
  addJobsToDocument(jobs);
  // Add the event listeners to the form elements
  initFormHandler();

  document.getElementById("New_Application").addEventListener('click', ()=>{
    show_form();
  })

  console.log("company true", await sortTwo("Company", true))
  console.log("company false", await sortTwo("Company", false))
}

/**
 * Reads `jobs` from localStorage and returns an array of
 * all of the jobs found (parsed, not in string form). If
 * nothing is found in localStorage for `jobs`, an empty array
 * is returned.
 * @returns {Promise} An promise of that will either contain all jobs or error
 */
function getJobsFromStorage() {
  return database.getAllJobs();
}

/**
 * Takes in an array of jobs and for each job creates a
 * new `<job-details>` element, adds the job data to that card
 * using `element.data = {...}`, and then appends that new job
 * to `<main>`.
 * @param {Array<Object>} jobs An array of jobs
 */
function addJobsToDocument(jobs) {
  // Get a reference to the <main> element
  const main = document.querySelector('main');
  // Loop through each of the jobs in the passed in array,
  // create a <job-details> element for each one, and populate
  // each <job-details> with that job data using element.data = ...
  // Append each element to <main>
  for (const job of jobs) {
    addJobToDocument(job);
  }
}

/**
 * Takes in an array of jobs, converts it to a string, and then
 * saves that string to `jobs` in localStorage
 * @param {Array<Object>} jobs An array of jobs
 */
async function saveJobsToStorage(jobs) {
  for (let job of jobs) {
    await database.addJob(job)
  }
}

/**
 * Adds the necesarry event handlers to `<form>`.
 */
function initFormHandler() {
  // Get a reference to the <form> element
  const form = document.querySelector('form');
  // Add an event listener for the 'submit' event,
  // which fires when the submit button is clicked
  form.addEventListener('submit', async (event) => {
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

    if (!jobObject["id"] || jobObject["id"] === '') {
      jobObject['id'] = Math.floor(Date.now() / 10000000)
    } else {
      jobObject['id'] = Number(jobObject['id'])
    }

    console.log(jobObject)
    // Create or edit a <job-details> element with the data in jobObject
    addJobToDocument(jobObject);
    // Reset the <job-details> element to edit
    jobDetailsToEdit = null;
    // Clear the <form> fields
    clearForm();
    // Get the jobs array from localStorage
    const jobs = await getJobsFromStorage();
    // Add this new job to it
    jobs.push(jobObject);
    // Save the jobs array back to localStorage
    await saveJobsToStorage(jobs);
    hide_form();
  });
  // Add an event listener for when the cancel button is clicked
  const cancelButton = form.querySelector(`#cancel`);
  cancelButton.addEventListener('click', () => {
    // Reset the <job-details> element to edit
    jobDetailsToEdit = null;
    hide_form();
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
 * @return {Promise}
 */
function addJobToDocument(job) {
  // Get a reference to the <main> element
  const main = document.querySelector('main');
  // Get the <job-details> element to edit, otherwise create a new <job-details> element
  const jobDetails = jobDetailsToEdit || document.createElement('job-details');
  // Add the job data to <job-details>
  jobDetails.data = job;
  // Add the onClickDelete function to <job-details>
  jobDetails.onClickDelete = async (event) => {
    // Remove the <job-details> element from <main>
    main.removeChild(jobDetails);
    await database.deleteJob(job['id'])
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
    show_form();
  }
  // If there is no <job-details> element to edit
  if (!jobDetailsToEdit) {
    // Append this new <job-details> to <main>
    main.appendChild(jobDetails);
  }
}

/**
 * The `<job-details>` element to edit on form submission
 * 
 * @global
 * @type {JobDetails}
 */
let jobDetailsToEdit = null;



function hide_form(){
  const hidden = document.getElementById("hidden");
  hidden.style.display = "none";
  hidden.style.zIndex = "-1";
}

function show_form(){
  const hidden = document.getElementById("hidden");
  hidden.style.display = "";
  hidden.style.zIndex = "";
}

function create_sortBars(name){
  for(const item of name){
    const curbar = document.createElement('sort-bar');
    curbar.setAttribute("id", item);
    curbar.name = item;
    curbar.onClickSort = [sort(), sortReverse()];
    document.getElementById("bar_list").appendChild(curbar);
  }

}

function sort(){
  // console.log("sort");
}

function sortReverse(){
  // console.log('sortReverse');
}

async function sortTwo(tag, reverse){
  // console.log("sort");
  const jobs = await getJobsFromStorage();
  if (tag === "Company") {
    return jobs.sort((a, b) => {
      let result = !reverse ? a.company > b.company : a.company < b.company
      return result === true ? 1 : -1
    })
  } else if (tag === "Job Title") {
    return jobs.sort((a, b) => {
      let result = !reverse ? a.position > b.position : a.position < b.position
      return result === true ? 1 : -1
    })
  } else if (tag === "Deadline") {
    return jobs.sort((a, b) => {
      let result = !reverse ? a.deadline > b.deadline : a.deadline < b.deadline
      return result === true ? 1 : -1
    })
  } else if (tag === "Status") {
    return jobs.sort((a, b) => {
      let result = !reverse ? a.status > b.status : a.status < b.status
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