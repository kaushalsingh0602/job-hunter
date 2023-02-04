const Company=require("../models/companys");


exports.company= async (req,res)=>{
    const companyRgester={
        name: req.body.name,
        address:req.body.address,
        status:req.body.status
    }
    console.log(companyRgester);
    

    const companyCreated=await Company.create(companyRgester);



    const companyCreatedResponse={
        name:companyCreated.name,
        address:companyCreated.address,
        status:companyCreated.status,
        createdAt:companyCreated.createdAt,
        usdatedAt:companyCreated.updatedAt,
        Id:companyCreated._id
    }

    return res.status(201).send({companyCreatedResponse})
}


