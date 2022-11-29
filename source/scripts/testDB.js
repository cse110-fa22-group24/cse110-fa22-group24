/* Used for testing dbUtil class*/

import dbUtil from "./JobAppDB.js";

const database=new dbUtil();

const mockData={
  id:1,
  company: "Amazon",
  title: "SDE II",
  description: '',
  portalURL: '',
  location: '',
  status: '',
  notes: '',
  contact: '',
  deadline: '',
  portalUser: '',
  portalPass: '',
}

try {
  await database.setupDB();
} catch {
  console.log('error setting up db');
}

try {
  await database.addJob(mockData);
  console.log("added:", mockData)
} catch {
  console.log('error adding job');
}


const mockData2={
  id:2,
  company: "Microsoft",
  title: "SDE II",
  description: '',
  portalURL: '',
  location: '',
  status: '',
  notes: '',
  contact: '',
  deadline: '',
  portalUser: '',
  portalPass: '',
}

try {
  await database.addJob(mockData2);
  console.log("added:", mockData2)
} catch {
  console.log('error adding job');
}

try {
  console.log('result of get', await database.getJob(2));
} catch {
  console.log('error getting job');
}

const mockData3={
  id:2,
  company: "Facebook",
  title: "SDE II",
  description: '',
  portalURL: '',
  location: '',
  status: '',
  notes: '',
  contact: '',
  deadline: '',
  portalUser: '',
  portalPass: '',
}

try {
  await database.updateJob(mockData3);
  console.log("updating job 2 to:", mockData3)
} catch {
  console.log('error updating job');
}

try {
  console.log('result of get after update', await database.getJob(2));
} catch {
  console.log('error getting job');
}

try {
  console.log('result of getAll', await database.getAllJobs());
} catch {
  console.log('error getting all');
}

try {
  console.log('result of get after update', await database.deleteJob(2));
} catch {
  console.log('error getting job');
}

try {
  console.log('result of getAll', await database.getAllJobs());
} catch {
  console.log('error getting all after delete');
}
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

