// Create a class of job application items


class JobApplication{
    //instance fields
    #jobAppId;
    #title;
    #description;
    #portalURL;
    #location;
    #status;
    #notes;
    #contact;
    #deadline;
    #userId;
    #company;
    #portalUser;
    #portalPass;


    //constructor
    constructor(jobAppId, title, description, portalURL, 
                location, status, notes, contact, deadline, 
                userId, company, portalUser, portalPass){
        this.#jobAppId=jobAppId;
        this.#title=title;
        this.#description=description;
        this.#portalURL=portalURL;
        this.#location=location;
        this.#status=status;
        this.#notes=notes;
        this.#contact=contact;
        this.#deadline=deadline;
        this.#userId=userId;
        this.#company=company;
        this.#portalUser=portalUser;
        this.#portalPass=portalPass;

    }

    //getters and setters
    get jobAppId(){
        return this.#jobAppId;
    }
    set jobAppId(value){
        this.#jobAppId=value;
    }

    get title(){
        return this.#title;
    }
    set title(value){
        this.#title=value;
    }

    get description(){
        return this.#description;
    }
    set description(value){
        this.#description=value;
    }

    get portalURL(){
        return this.#portalURL;
    }
    set portalURL(value){
        this.#portalURL=value;
    }

    get location(){
        return this.#location;
    }
    set location(value){
        this.#location=value;
    }

    get status(){
        return this.#status;
    }
    set status(value){
        this.#status=value;
    }

    get notes(){
        return this.#notes;
    }
    set notes(value){
        this.#notes=value;
    }

    get contact(){
        return this.#contact;
    }
    set contact(value){
        this.#contact=value;
    }

    get deadline(){
        return this.#deadline;
    }
    set deadline(value){
        this.#deadline=value;
    }

    get userId(){
        return this.#userId;
    }
    set userId(value){
        this.#userId=value;
    }

    get company(){
        return this.#company;
    }
    set company(value){
        this.#company=value;
    }

    get portalUser(){
        return this.#portalUser;
    }
    set portalUser(value){
        this.#portalUser=value;
    }

    get portalPass(){
        return this.#portalPass;
    }
    set portalPass(value){
        this.#portalPass=value;
    }


}
module.exports=JobApplication;