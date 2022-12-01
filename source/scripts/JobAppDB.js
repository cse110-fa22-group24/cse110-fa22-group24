/**
 * A class representing database for a job application
 */
export default class DBUtil {
  db = null

  setupDB () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('jobAppDB', 1)

      request.onerror = function (event) {
        console.error('An error occurs when initiating the database!')
        console.error(event)
        reject()
      }

      request.onupgradeneeded = function () {
        this.db = request.result

        const store = this.db.createObjectStore('JobApplication', { keyPath: 'id' })
        store.createIndex('company', ['company'], { unique: false })
        store.createIndex('title', ['title'], { unique: false })
        store.createIndex('description', ['description'], { unique: false })
        store.createIndex('portalURL', ['portalURL'], { unique: false })
        store.createIndex('location', ['location'], { unique: false })
        store.createIndex('status', ['status'], { unique: false })
        store.createIndex('notes', ['notes'], { unique: false })
        store.createIndex('contact', ['contact'], { unique: false })
        store.createIndex('deadline', ['deadline'], { unique: false })
        store.createIndex('portalUser', ['portalUser'], { unique: false })
        store.createIndex('portalPass', ['portalPass'], { unique: false })

        // TODO: Generalize to all entities
      }

      request.onsuccess = (event) => {
        this.db = event.target.result
        console.log('database finished setup!')
        resolve()
      }
    })
  }

  /**
   * Add a job application to the database
   * @param {object} job - a job application object to be added
   */
  addJob (job) {
    return new Promise((resolve, reject) => {
      let transaction
      transaction = this.db.transaction('JobApplication', 'readwrite')
      const store = transaction.objectStore('JobApplication')
      const request = store.put(job)
      request.onsuccess = () => {
        resolve('Job Application Added!')
      }
      request.onerror = () => {
        console.log(store.result)
        reject('Something went wrong!')
      }
    })
  }

  /**
   * Read a job application by id
   * @param {number} id - id of the job application we want
   */
  getJob (id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('JobApplication', 'readonly')
      const store = transaction.objectStore('JobApplication')
      const query = store.get(id)
      query.onsuccess = function () {
        resolve(query.result)
      }
      query.onerror = function () {
        reject(query.result)
      }
    })
  }

  /**
   * Get all jobs in DB
   */
  getAllJobs () {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('JobApplication', 'readonly')
      const store = transaction.objectStore('JobApplication')
      const query = store.getAll()
      query.onsuccess = function () {
        console.log('Jobs Found: ' + query.result)
        resolve(query.result)
      }
      query.onerror = function () {
        console.log('Error occurred: ' + query.result)
        reject()
      }
    })
  }

  /**
   * Update a job application with new content
   * @param {object} job
   */
  updateJob (job) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('JobApplication', 'readwrite')
      const store = transaction.objectStore('JobApplication')
      const result = store.put(job)
      result.onsuccess = () => {
        resolve('Job application deleted!')
      }
      result.onerror = () => {
        reject('Something went wrong!')
      }
    })
  }

  /**
   * Delete a job application by id
   * @param {number} id - id of the job application we want to delete
   */
  deleteJob (id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('JobApplication', 'readwrite')
      const store = transaction.objectStore('JobApplication')
      const result = store.delete(id)
      result.onsuccess = () => {
        resolve('Job Application Deleted!')
      }
      result.onerror = () => {
        reject('Something went wrong!')
      }
    })
  }
}
