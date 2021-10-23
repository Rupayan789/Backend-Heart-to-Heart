const reportController = require('../controller/reportController');
const upload = require('../middleware/multer');

const router = require('express').Router({mergeParams:true});


router.post('/upload',upload.single('file'),reportController.uploadReport)





module.exports=router;