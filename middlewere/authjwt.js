const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
var User = require("../models/user");
const constant = require("../utils/constent");


/**
 * Authentication
 * 
 *     - If the token passed is valid or no
 * 
 * 
 * 1. If no token is passed in the request header - Not Allowed
 * 2. If token is passed : AUthenticated
 *       if correct allow, else reject 
 */

verifyToken = (req,res, next) =>{
    /**
     * Read the token from the header
     */
    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message : "No token provided"
        })
    }

    //If the token was provided, we need to verify it
    jwt.verify(token,config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        //I will try to read the userId from the decoded token and store it in req object
        req.userId = decoded.Id;
        next();
    } )
};

/**
 * If the passed access token is of ADMIN or not
 */

isAdmin = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId:req.userId})
    console.log(user)

    /**
     * Check what is the user type
     */
    if(user && (user.userType ==constant.userType.admin)){
        next();
    }else{
        res.status(403).send({
            message: "Requires ADMIN role"
        })
    }
}
isStudent = async (req,res, next) =>{

    /**
     * Fetcht user from the DB using the userId
     */
    const user = await User.findOne({userId:req.userId})
    console.log(user)

    /**
     * Check what is the user type
     */
    if(user && (user.userType ==constant.userType.student)){
        next();
    }else{
        res.status(403).send({
            message: "Requires ADMIN role"
        })
    }
}




const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isStudent:isStudent
};
module.exports= authJwt;