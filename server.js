const express = require("express");
const serverConfig = require("./config/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const bodyParser = require("body-parser");
const User = require("./models/user");
const bcrypt= require("bcryptjs");
const constant=require("./utils/constent")


const app =  express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect(dbConfig.DB_URL,async () => {
    console.log("MongoDB connected");

    let user= await User.find({
        userId:"admin1"
    });
    //await User.collection.drop();
    if(user==null){
        user= await User.create({
            name:"kaushal singh",
            userId:"admin1",
            password:bcrypt.hashSync("welcome1",8),
            email:"kaushalsingh8178@gamil.com",
            userType:constant.userType.admin
        })
        console.log(user)
    }

    


   
})









require("./routes/auth.route")(app);
require("./routes/company.route")(app);
require("./routes/job.route")(app);





module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})