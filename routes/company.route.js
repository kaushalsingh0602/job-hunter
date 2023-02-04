const companyRouts=require("../controller/company.controller");
const auth = require("../middlewere/authjwt");



module.exports=(app)=>{


    app.post("/jobhunter/api/v1/companys",[auth.verifyToken,auth.isAdmin],companyRouts.company)
}