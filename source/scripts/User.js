//Create a class of user profile
class User{
    //instance fields
    #userId;
    #name;
    #email;
    #linkedIn;
    #website;
    #skills;

    //constructor
    constructor(userId, name, email, linkedIn, website, skills){
        this.#userId=userId;
        this.#name=name;
        this.#email=email;
        this.#linkedIn=linkedIn;
        this.#website=website;
        this.#skills=skills;
    }

    //getters and setters
    get userId(){
        return this.#userId;
    }
    set userId(value){
        this.#userId=value;
    }

    get name(){
        return this.#name;
    }
    set name(value){
        this.#name=value;
    }

    get email(){
        return this.#email;
    }
    set email(value){
        this.email=value;
    }

    get linkedIn(){
        return this.#linkedIn
    }
    set linkedIn(value){
        this.#linkedIn=value;
    }

    get website(){
        return this.#website;
    }
    set website(value){
        this.#website=value;
    }

    get skills(){
        return this.#skills;
    }
    set skills(arr){
        this.#skills=arr;
    }
    
    //others
    addToSkills(value){
        this.#skills.push(value);
    }

    deleteSkills(value){
        for(let i=0; i<this.#skills.length;i++){
            if(this.#skills[i]==value){
                const removed=this.#skills.splice(i,1);
                return removed;
            }
        }
    }


}

module.exports=User;