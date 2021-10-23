const profileController = require('../controller/profileController');

const router = require('express').Router({mergeParams:true});

router.get('/patient',profileController.getPatientDetails);

module.exports =router;