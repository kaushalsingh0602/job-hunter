const mongoose = require("mongoose");
const constant=require("../utils/constent")

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    companyId:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        street:String,
        city:String,
        state : String,
        country: String,
        pinCode: Number
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
    jobPosted:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"job"
    }

 })
 module.exports= mongoose.model(company,companySchema)