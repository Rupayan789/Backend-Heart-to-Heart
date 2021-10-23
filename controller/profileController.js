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
        
    },
    async postCompleted(req,res,next){
        try {
            const { email } = req.body;
            const patient = await Patient.findOne({email:email}).exec();
            if(!patient)
            return res.send({
                success:false,
                status:500,
                error:"No user Found",
                response:null
            })
            if (patient.daysCompleted===0)
            {
                var todayDate = new Date().toISOString().slice(0, 10);
                await patient.updateOne({
                    startDate:todayDate,
                    daysCompleted:patient.daysCompleted+1
                })
            }
            else
            {
                if(patient.daysCompleted===21)
                {
                    return res.send({
                        success:false,
                        status:500,
                        error:"Already Completed the challenge",
                        response:patient
                    })
                }
                await patient.updateOne({
                    daysCompleted:patient.daysCompleted+1
                })
            }
            const updatedPatient = await Patient.findOne({email:email}).exec();
            return res.send({
                success:true,
                status:200,
                error:null,
                response:updatedPatient
            })
        }
        catch(err){
            return res.send({
                success:false,
                status:500,
                error:err.message,
                response:null
            })
        }
    },
    async getChallenge(req,res,next) {
        try{
            const  email = decodeURI(req.query.email);
            const patient = await Patient.findOne({email:email}).exec();
            if(!patient)
            return res.send({
                success:false,
                status:500,
                error:"No user Found",
                response:null
            })

            return res.send({
                success:true,
                status:200,
                error:null,
                response:patient
            })
        }
        catch(err){
            return res.send({
                success:false,
                status:500,
                response:null,
                error:err.message
            })
        }
    }
}