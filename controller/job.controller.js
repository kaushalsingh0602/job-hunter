const Job=require("../models/jobs");
const Company=require("../models/companys");
const User=require("../models/user")
const companys = require("../models/companys");


exports.jobs=async (req,res)=>{
    const createJobs={
        title:req.body.title,
        description:req.body.description,
        jobStatus:req.body.jobStatus,
        companyId: req.body.companyId,
        students:[]
    }

    const jobsCreated= await Job.create(createJobs)
    const company=await Company.findOne({
       _id: jobsCreated.companyId
    })
    if(company==null){
       res.status(500).send({
        message:"no company avelabale"
       })
    }
    
    const jobToBeCreated={
        title:jobsCreated.title,
        description:jobsCreated.description,
        jobStatus:jobsCreated.jobStatus,
        createdAt:jobsCreated.createdAt,
        updatedAt:jobsCreated.updatedAt,
        Id:jobsCreated._id
    }
    return res.status(201).send({jobToBeCreated})
   // var jobsCreated= await Job.create(createJobs)
   
}
exports.updateJob = async (req, res) => {

    const job = await Job.findOne({
        _id: req.params.id
    });

    if (job == null) {
        return res.status(200).send({
            message: "Job doesn't exist"
        })
    }

    const user =  await User.findOne({userId : req.userId});
    console.log(user, req.userId);

    if(req.query.applyJob){
        return applyJob(req, res, job, user);
    }

    // Update the attributes of the saved company

    job.name = req.body.title != undefined ? req.body.title : job.title;
    job.description = req.body.description != undefined ? req.body.description : job.description;
    job.status = req.body.status != undefined ? req.body.status : job.status;
    job.students = req.body.students != undefined ? req.body.students : job.students;

    var updatedJob = await job.save();

    // Return the updated job

    return res.status(200).send(updatedJob);
}

let applyJob = async (req, res, job, user)=>{
    try {
        job.students.push(user._id);
        const updatedJob = await job.save();

        user.jobs.push(job._id);
        const updatedUser = await user.save();

        return res.status(200).send(updatedUser);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }
    
}


