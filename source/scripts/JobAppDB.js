/**
 * A class representing database for a job application
 */
export default class dbUtil{
    db=null;
    
    /**
     * Constructor that get a reference to a database
     */
    constructor(){
        const request = indexedDB.open('test-db', 2,);

        request.onerror=function(event){
            console.error("An error occurs when initiating the database!");
            console.error(event);
        }
        
        request.onupgradeneeded=function (){
            this.db=request.result;
            const store=db.createObjectStore("JobApplication",{keyPath:"id"});
            store.createIndex("company",["company"],{unique: false});
        }

        request.onsuccess=function(){
            this.db=request.result;
        }
    }
    
    /**
     * Add a job application to the database
     * @param {object} item - a job application object to be added
     */
    addItem(item){
        const transaction=this.db.transaction("JobApplication","readwrite");
        const store=transaction.objectStore("JobApplication");
        store.put(item);
    }
    
    /**
     * Read a job application by id
     * @param {number} id - id of the job application we want
     */
    readItem(id){
        const transaction=this.db.transaction("JobApplication","readwrite");
        const store=transaction.objectStore("JobApplication");
        const query=store.get(id);
        query.onsuccess=function(){
            console.log("Item Found: " + query.result);
            return query.result;
        }
        query.onerror=function(){
            console.log("Item Not Found: " + query.result);
            return;
        }
    }

    /**
     * Delete a job application by id
     * @param {number} id - id of the job application we want to delete
     */
    deleteItem(id){
        const transaction=this.db.transaction("JobApplication","readwrite");
        const store=transaction.objectStore("JobApplication");
        store.delete(id);
    }
}

