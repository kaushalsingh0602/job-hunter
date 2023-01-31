const mongoose=require("mongoose");

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
        require:true  
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