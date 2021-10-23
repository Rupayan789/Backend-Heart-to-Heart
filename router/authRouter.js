
const router = require('express').Router({mergeParams:true});

const authController = require('../controller/authController');



router.post('/patient/signup',authController.signUpPatientWithEmail);

router.post('/patient/auth/google',authController.authPatientWithGoogle);

router.post('/patient/register',authController.registerPatient);

router.post('/patient/login',authController.loginPatientWithEmail);

router.post('/therapist/signup',authController.signUpTherapistWithEmail);

router.post('/therapist/auth/google',authController.authTherapistWithGoogle);

router.post('/therapist/register',authController.registerTherapist);

router.post('/therapist/login',authController.loginTherapistWithEmail);

router.get('/patient/logout',authController.logoutPatient);


module.exports=router;