const mongoose=require("mongoose");
const constant=require("../utils/constent")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true 
    },
    userId:{
        type:String,
        require:true ,
        unique:true
    },
    email:{
        type:String,
        require:true  
    },
    userType:{
        type:String,
        default:constant.userType.student
    },
    password:{
        type:String, 
        require:true 
    },
    jobs:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref : "jobs"
    }
})
module.exports = mongoose.model("User", userSchema);