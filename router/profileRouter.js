const profileController = require('../controller/profileController');

const router = require('express').Router({mergeParams:true});

router.get('/patient',profileController.getPatientDetails);

router.get('/challenge',profileController.getChallenge);

router.post('/challenge',profileController.postCompleted)
module.exports =router;