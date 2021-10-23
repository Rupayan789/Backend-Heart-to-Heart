// const Patient=require("../model/patient");
// const Therapist=require("../model/therapist");


module.exports={
    async uploadReport(req,res,next) {
        
        return res.send({
            success:true,
            status:200,
            error:null,
            response:"Successfully uploaded"
        })
    }
}