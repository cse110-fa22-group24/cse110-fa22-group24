/**
 * A class representing database for a job application
 */
export default class dbUtil{
    db=null;
    
    /**
     * Constructor that get a reference to a database
     */
    constructor(){
        const request = indexedDB.open('jobAppDB', 1);

        request.onerror=function(event){
            console.error("An error occurs when initiating the database!");
            console.error(event);
        }
        
        request.onupgradeneeded=function (){
            this.db=request.result;
            const store=db.createObjectStore("JobApplication",{keyPath:"id"});
            store.createIndex("company",["company"],{unique: false});
            store.createIndex("title",["title"],{unique: false});
            store.createIndex("description",["description"],{unique: false});
            store.createIndex("portalURL",["portalURL"],{unique: false});
            store.createIndex("location",["location"],{unique: false});
            store.createIndex("status",["status"],{unique: false});
            store.createIndex("notes",["notes"],{unique: false});
            store.createIndex("contact",["contact"],{unique: false});
            store.createIndex("deadline",["deadline"],{unique: false});
            store.createIndex("portalUser",["portalUser"],{unique: false});
            store.createIndex("portalPass",["portalPass"],{unique: false});
        }

        request.onsuccess=function(){
            this.db=request.result;
        }
    }
    
    /**
     * Add a job application to the database
     * @param {object} job - a job application object to be added
     */
    addJob(job){
        const transaction=this.db.transaction("JobApplication","readwrite");
        const store=transaction.objectStore("JobApplication");
        store.put(job.toJSON());
    }
    
    /**
     * Read a job application by id
     * @param {number} id - id of the job application we want
     */
    getJob(id){
        const transaction=this.db.transaction("JobApplication","readonly");
        const store=transaction.objectStore("JobApplication");
        const query=store.get(id);
        query.onsuccess=function(){
            console.log("Job Found: " + query.result);
            return query.result;
        }
        query.onerror=function(){
            console.log("Job Not Found: " + query.result);
            return undefined;
        }
    }

    /**
     * Get all jobs in DB
     */
     getAllJobs(){
        const transaction=this.db.transaction("JobApplication","readonly");
        const store=transaction.objectStore("JobApplication");
        const query=store.getAll();
        query.onsuccess=function(){
            console.log("Jobs Found: " + query.result);
            return query.result;
        }
        query.onerror=function(){
            console.log("Error occurred: " + query.result);
            return undefined;
        }
    }

    /**
     * Update a job application with new content
     * @param {object} job
     */
    updateJob(job) {
        const transaction=this.db.transaction("JobApplication","writeonly");
        const store=transaction.objectStore("JobApplication");
        store.put(job.toJSON());
    }

    /**
     * Delete a job application by id
     * @param {number} id - id of the job application we want to delete
     */
    deleteJob(id){
        const transaction=this.db.transaction("JobApplication","readwrite");
        const store=transaction.objectStore("JobApplication");
        store.delete(id);
    }
}

