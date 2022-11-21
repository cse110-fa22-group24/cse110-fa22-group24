/* Used for testing dbUtil class*/

import dbUtil from "./JobAppDB.js";

const database=new dbUtil();


/**
const request = indexedDB.open('test-db', 2,);

let db;

request.onerror=function(event){
  console.error("An error!");
  console.error(event);
}

request.onupgradeneeded=function (){
  const db=request.result;
  const store=db.createObjectStore("JobApplication",{keyPath:"id"});
  store.createIndex("company",["company"],{unique: false});
  console.log("hello");
}

request.onsuccess=function(){
  const db=request.result;
  console.log(db);
  const transaction=db.transaction("JobApplication","readwrite");
  const store=transaction.objectStore("JobApplication");
  const companyIndex=store.index('company');
  const item={
    id:1,
    company: "Amazon",
    title: "SDE II"
  }
  store.put(item);

  const query=store.get(1);
  query.onsuccess=function(){
    console.log("query",query.result);
  }
  transaction.oncomplete=function (){
    db.close();
  }
}

*/

