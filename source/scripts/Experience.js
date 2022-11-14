// Create a class of work experience items
class Experience{
    
    //instance fields
    #expId;
    #title;
    #start;
    #end;
    #description;
    #userId;
    
    //constructor
    constructor (expId, title, start, end, description, userId){
        this.#expId=expId;
        this.#title=title;
        this.#start=start;
        this.#end=end;
        this.#description=description;
        this.#userId=userId;
    }

    //getters and setters
    get expId(){
        return this.#expId;
    }
    set expId(value){
        this.#expId=value;
    }

    get title(){
        return this.#title;
    }
    set title(value){
        this.#title=value;
    }

    get start(){
        return this.#start;
    }
    set start(value){
        this.#start=value;
    }

    get end(){
        return this.#end;
    }
    set end(value){
        this.#end=value;
    }

    get description(){
        return this.#description;
    }
    set description(value){
        this.#description=value;
    }

    get userId(){
        return this.#userId;
    }
    set userId(value){
        this.#userId=value;
    }

}

module.exports=Experience;