const Patient=require("../model/patient");
const Therapist=require("../model/therapist");
const bcrypt = require('bcrypt');
module.exports={
    async signUpPatientWithEmail(req,res,next){
        
        try{
            const {
                email,
                password
            } = req.body;
    
            var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
            if (!regexEmail.test(email)) {
                throw new Error("Invalid Email,Try again!!");
            }
            const patient = await Patient.findOne({email:email}).exec();
            
            if(patient)
            {
                return res.send({
                    status:500,
                    success:false,
                    error:"User already exists,Login Instead",
                    response:patient
                })
            }
            const hashedPassword=await bcrypt.hash(password,10);
            const newPatient = await new Patient({
                email:email,
                password:hashedPassword,
                isSignedUp:true
            });
    
            await newPatient.save();
    
            return res.send({
                status:200,
                success:true,
                error:null,
                response:newPatient
            })
        }
        catch(err){
            return res.send({
                status:500,
                success:false,
                error:err.message,
                response:null
            })
        }
       
    },
    async authPatientWithGoogle(req,res,next){
        
        try{
            const {
                email,
                password
            } = req.body;
    
            var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
            if (!regexEmail.test(email)) {
                throw new Error("Invalid Email,Try again!!");
            }
            const patient = await Patient.findOne({email:email}).exec();
            if(patient) {
                await patient.updateOne({
                isGoogleSignIn:true,
                isLoggedIn:true
                })
                const newPatient1 = await Patient.findOne({email:email}).exec();
                return res.send({
                    status:200,
                    success:true,
                    message:"Successfully Authenticated",
                    response:newPatient1
                })
            }
            const hashedPassword=await bcrypt.hash(password,10);
            const newPatient = await new Patient({
                email:email,
                password:hashedPassword,
                isSignedUp:true,
                isLoggedIn:true,
                isGoogleSignIn:true
            });
    
            await newPatient.save();
    
            return res.send({
                status:200,
                success:true,
                error:null,
                response:newPatient
            })
        }
        catch(err){
            return res.send({
                status:500,
                success:false,
                error:err,
                response:null
            })
        }
       
    },
    async registerPatient(req,res,next){
        try{
            const {
                name,
                email,
                phoneno,
                age,
                dob,
                city,
                pincode,
            } = req.body;

            const patient = await Patient.findOne({email:email}).exec();

            // if(patient.isRegistered)
            // {
            //     return res.send({
            //         status:500,
            //         success:false,
            //         error:"The user is already registered"
            //     })
            // }
            await patient.updateOne({ 
                name:name,
                phoneno:phoneno,
                dob:dob,
                age:age,
                city:city,
                pincode:pincode,
                registerTime:Date.now(),
                isRegistered:true
            });
            const newPatient = await Patient.findOne({email:email}).exec();

            return res.send({
                status:200,
                success:true,
                error:null,
                response:newPatient
            })

        }
        catch(err) {
            return res.send({
                status:500,
                success:false,
                error:err.message,
                response:null
            })
        }
    },
    async loginPatientWithEmail(req,res,next) {
        try{
            const {
                email,password
            } = req.body;
 
            const patient = await Patient.findOne({email:email}).exec();
            if(!patient)
            throw new Error("No such User Exists!!");
            if(patient.isGoogleSignIn)
            return res.send({
                success:false,
                status:500,
                error:"You have signed up using Google,login in through Google,or else signup manually and then try",
                response:null
            })
            await bcrypt.compare(password,patient.password,async function(err,result){
                if(err)
                return res.send({
                    status:500,
                    success:false,
                    error:err.message,
                    response:null
                })
                if(result)
                {
                    await patient.updateOne({
                        isLoggedIn:true,
                        lastLoginTime:toString(Date.now()),
                        isGoogleSignIn:false,
                    })
                    const newPatient = await Patient.findOne({email:email}).exec();

                    return res.send({
                        status:200,
                        success:true,
                        error:null,
                        response:newPatient
                    });
                }
                else
                {
                    return res.send({
                        status:500,
                        success:false,
                        error:"Password Doesn't Match",
                        response:null
                    })
                }
            })
        }
        catch(error){
      
            return res.send({
                status:500,
                success:false,
                error:error.message,
                response:null
            })
        }
    },
    async logoutPatient(req,res) {
        try {
            const  email = decodeURI(req.query.email);
            const patient = await Patient.findOne({email:email}).exec();
            await patient.updateOne({
                isLoggedIn:false
            })
            return res.send({
                success:true,
                status:200,
                error:null,
                response:"Logout Successfully"
            })
        }
        catch(error){
            return res.send({
                success:false,
                status:500,
                error:error.message,
                response:null
            })
        }
    },
    async signUpTherapistWithEmail(req,res,next){
        
        try{
            const {
                email,
                password
            } = req.body;
    
            var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
            if (!regexEmail.test(email)) {
                throw new Error("Invalid Email,Try again!!");
            }
            const therapist = await Therapist.findOne({email:email}).exec();
            
            if(therapist)
            {
                return res.send({
                    status:500,
                    success:false,
                    error:"User already exists,Login Instead",
                    response:therapist
                })
            }

            const hashedPassword=await bcrypt.hash(password,10);
    
            const newTherapist = await new Therapist({
                email:email,
                password:hashedPassword,
                isSignedUp:true
            });
    
            await newTherapist.save();
    
            return res.send({
                status:200,
                success:true,
                error:null,
                response:newTherapist
            })
        }
        catch(err){
            return res.send({
                status:500,
                success:false,
                error:err.message,
                response:null
            })
        }
       
    },
    async authTherapistWithGoogle(req,res,next){
        
        try{
            const {
                email,
                password
            } = req.body;
    
            var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
            if (!regexEmail.test(email)) {
                throw new Error("Invalid Email,Try again!!");
            }
            const therapist = await Therapist.findOne({email:email}).exec();
            
            if(therapist)
            {
                return res.send({
                    status:200,
                    success:true,
                    error:"Successfully Authenticated",
                    response:therapist
                })
            }

            const hashedPassword=await bcrypt.hash(password,10);
    
            const newTherapist = await new Therapist({
                email:email,
                password:hashedPassword,
                isSignedUp:true,
                isLoggedIn:true,
                isGoogleSignIn:true
            });
    
            await newTherapist.save();
    
            return res.send({
                status:200,
                success:true,
                error:null,
                response:newTherapist
            })
        }
        catch(err){
            return res.send({
                status:500,
                success:false,
                error:err.message,
                response:null
            })
        }
       
    },
    async registerTherapist(req,res,next){
        try{
            const {
                name,
                email,
                phoneno,
                hospitalname,
                dob,
                city,
                pincode,
            } = req.body;

            const therapist = await Therapist.findOne({email:email}).exec();

            if(therapist.isRegistered)
            {
                return res.send({
                    status:500,
                    success:false,
                    error:"The user is already registered"
                })
            }
            const newTherapist = await Therapist.updateOne({ 
                name:name,
                phoneno:phoneno,
                dob:dob,
                city:city,
                hospitalname:hospitalname,
                pincode:pincode,
                registerTime:Date.now(),
                isRegistered:true
            });

            return res.send({
                status:200,
                success:true,
                error:null,
                response:newTherapist
            })

        }
        catch(err) {
            return res.send({
                status:500,
                success:false,
                error:err.message,
                response:null
            })
        }
    },
    async loginTherapistWithEmail(req,res,next) {
        try{
            const {
                email,password
            } = req.body;

            const therapist = await Therapist.findOne({email:email}).exec();
            if(!therapist)
            throw new Error("No such User Exists!!");

            await bcrypt.compare(password,therapist.password,async function(err,result){
                if(err)
                throw new Error(err);
                if(result)
                {
                    const newTherapist = await Therapist.updateOne({
                        isLoggedIn:true,
                        lastLoginTime:Date.now()
                    })

                    return res.send({
                        status:200,
                        success:true,
                        error:null,
                        response:newTherapist
                    });
                }
                else
                {
                    return res.send({
                        status:500,
                        success:false,
                        error:"Password doesn't match",
                        response:null
                    })
                }
            })
        }
        catch(error){
            return res.send({
                status:500,
                success:false,
                error:error.message,
                response:null
            })
        }
    }


}