const mongoose = require("mongoose");
const constant=require("../utils/constent")
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
       require:true
    },
    userType:{
        type:String,
        require:true
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
    status:{
        type: String,
        default:constant.status.unverified
    },
    jobId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"job"
    }

 })
 module.exports= mongoose.model("company",companySchema)