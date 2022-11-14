
const JobApplication=require("../scripts/JobApplication");
const app=new JobApplication("1","SDE","web dev","xyz.com", "Seatle", "interviewed", 
"nothing", "123", "12/08/2022", "1", "Amazon", "Alex", "xyz");


//test getter
test("get location returns seatle",()=>{
    expect(app.location).toBe("Seatle");
})

//test setter
test("change location to Boston",()=>{
    app.location="Boston";
    expect(app.location).toBe("Boston");
})