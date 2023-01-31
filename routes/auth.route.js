const authcontroller=require("../controller/auth.controller");

module.exports=(app)=>{
    app.post("/jobhunter/api/v1/auth/signup",authcontroller.signup)
    app.post("/jobhunter/api/v1/auth/signin",authcontroller.signin)
}