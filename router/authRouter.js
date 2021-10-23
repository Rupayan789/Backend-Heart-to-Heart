const passport = require('passport');
const router = require('express').Router({mergeParams:true});
const AuthController = require('../controller/authController');
const isLoggedIn = require('../middleware/authMiddleware');


router.post('/patient/signup',AuthController.signUpPatientWithEmail);

router.post('/patient/auth/google',AuthController.authPatientWithGoogle);

router.post('/patient/register',AuthController.registerPatient);

router.post('/patient/login',AuthController.loginPatientWithEmail);

router.post('/therapist/signup',AuthController.signUpTherapistWithEmail);

router.post('/therapist/auth/google',AuthController.authTherapistWithGoogle);

router.post('/therapist/register',AuthController.registerTherapist);

router.post('/therapist/login',AuthController.loginTherapistWithEmail);

router.get('/patient/logout',AuthController.logoutPatient);


module.exports=router;