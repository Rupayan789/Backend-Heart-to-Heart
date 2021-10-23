const router = require('express').Router({mergeParams:true});
const authRouter = require('./authRouter');

const profileRouter = require('./profileRouter')
const reportRouter = require('./reportRouter')

router.get('/',(req,res)=>{
    res.send("Heart-to-Heart server running")
})

router.use('/auth',authRouter);

router.use('/profile',profileRouter)

router.use('/report',reportRouter)

module.exports=router;