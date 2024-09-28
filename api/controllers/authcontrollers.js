const bcryptjs=require("bcryptjs")
const Student=require("../modals/student")
const {errorHandler}=require("../utils/errorhandler")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
module.exports.signin=async(req,res,next)=>{
    const {rollnum,password}=req.body;
    // console.log(rollnum)
    if(!rollnum || !password || rollnum==='' ||password===''){
       next(errorHandler(400,"All fields are required"));
    }
    try{
       const validStudent=await Student.findOne({rollNumber:rollnum})
       if(!validStudent){
         return  next(errorHandler(404,"User not found"));
       }
       const validPassword=bcryptjs.compareSync(password,validStudent.password);
       if(!validPassword){
         return  next(errorHandler(400,"Invalid password"))
       }
       const token=jwt.sign({id:validStudent._id},process.env.JWT_SECRET)
       const {password:pass,...rest}=validStudent._doc;
       res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
    }
    catch(err){
          next(err)
    }
 }