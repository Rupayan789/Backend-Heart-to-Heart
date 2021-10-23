const Patient=require("../model/patient");
// const Therapist=require("../model/therapist");

module.exports = {
    async getPatientDetails(req,res,next){
        try {
            const  email = decodeURI(req.query.email);
            console.log(email)
            const patient = await Patient.findOne({email:email}).exec();
            if(!patient)
            return res.send({
                success:false,
                status:500,
                error:"No user found",
                response:null
            })
            return res.send({
                success:true,
                status:200,
                error:null,
                response:patient
            })

        } catch (error) {
            return res.send({
                success:false,
                status:500,
                error:error.message,
                response:null
            })
        }
        
    }
}