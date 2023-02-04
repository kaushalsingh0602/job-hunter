const mongoose=require("mongoose");
const constant=require("../utils/constent")

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    jobStatus:{
       type:String,
       default:constant.jobStatus.avelable   
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    companyId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"jobs"
    },
    students:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"user"
    }
})
module.exports = mongoose.model("jobs", jobSchema);