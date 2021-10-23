const reportController = require('../controller/reportController');
const upload = require('../middleware/multer');

const router = require('express').Router({mergeParams:true});


router.post('/upload',upload.single('files'),reportController.uploadReport)





module.exports=router;