const jobController=require("../controller/job.controller");
const auth = require("../middlewere/authjwt");


module.exports=(app)=>{
    //to create jobs
    app.post("/jobhunter/api/v1/jobs/",jobController.jobs)
    //for apply jobs
    app.put("/jobhunters/app/v1/jobs/:id", [auth.verifyToken, auth.isStudent], jobController.updateJob);
}