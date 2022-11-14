
const { hasUncaughtExceptionCaptureCallback } = require("process");
const User=require("../scripts/User");
const user=new User("1", "Alex", "zhmeng@ucsd.edu", "linkedIn.com", "AlexM.com", ["Java","Python"]);

//test getter
test("get website returns AlexM.com",()=>{
    expect(user.website).toBe("AlexM.com");
})

//test setter
test("website sucessfully reset", ()=>{
    user.website="AlexMeng.com";
    expect(user.website).toBe("AlexMeng.com");
})

//test addToSkills
test("add C++ to skills",()=>{
    user.addToSkills("C++");
    expect(user.skills).toStrictEqual(["Java","Python","C++"]);
})

//test deleteSkills
test("delete Java from skills",()=>{
    user.deleteSkills("Java");
    expect(user.skills).toStrictEqual(["Python","C++"]);
})

