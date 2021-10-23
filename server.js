const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan=require("morgan");
const cors=require('cors');

const baseRouter = require("./router/baseRouter")
const app=express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log("MongoDB Connected");
}).catch(error=>{
    console.log(error);
});
app.use("/",baseRouter);

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("Server running on Port",PORT)
})

