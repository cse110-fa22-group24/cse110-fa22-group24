const Experience=require("../scripts/Experience");
const exp=new Experience("1", "SDE", "06/2022", "09/2022", "web dev", "1");

//test getter
test("get title returns SDE", ()=>{
    expect(exp.title).toBe("SDE");
})

//test setter
test("title changes to MLE",()=>{
    exp.title="MLE";
    expect(exp.title).toBe("MLE");
})