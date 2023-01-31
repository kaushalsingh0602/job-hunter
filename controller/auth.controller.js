const  User=require("../models/user")
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig=require("../config/auth.config")

exports.signup = async (req,res)=>{
    const userObjToBeStoredInDB={
    
            name : req.body.name,
            userId : req.body.userId,
            email : req.body.email,
            userType : req.body.userType,
            password : bcrypt.hashSync(req.body.password,8),
            
    }
    try {
        const userCreated = await User.create(userObjToBeStoredInDB);
    
        console.log("user created ", userCreated);
    
        /**
         * Return the response
         */
        const userCreationResponse  = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
    
        res.status(201).send(userCreationResponse);
    } catch(err){
        console.error("Error while creating new user", err.message);
        res.status(500).send({
            message : "some internal error while inserting new user"
        })
    }
}

exports.signin= async(req,res)=>{
    var user=await User.findOne({userId:req.body.userId})
    if(user==null){
        return res.status(400).send({
            message:"userid doesnet exits"
        })
    }
    var isPasswordValid= bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordValid){
        return res.status(401).send({
            message : "Invalid Password"
        })
    }
    const Token = jwt.sign({Id:user.userId}, authConfig.secret,{
        expiresIn:600
    });
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken : Token
    })

}

