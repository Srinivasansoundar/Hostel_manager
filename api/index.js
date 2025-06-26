const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const studentRoutes=require("./routes/student")
const authroutes=require("./routes/authroutes")
const bookRoutes=require("./routes/bookRoutes")
const adminRoutes=require("./routes/adminRoutes")
const waitingRoutes=require("./routes/waitingRoutes")
const getComplaint=require("./routes/complaintRoutes")
const path=require('path')
dotenv.config();
//  console.log(process.env.MONGO)
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'/ease_manager/dist')));
app.use(express.json())
// app.use(express.urlencoded)
app.use("/student",studentRoutes)
app.use('/api/student', bookRoutes);
app.use("/api/student",authroutes)
app.use("/api/admin",adminRoutes)
app.use("/api/waiting",waitingRoutes)
app.use("/api/complaint",getComplaint)
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
      success:false,
      statusCode,
      message
    })
  })
app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin page")
})
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'ease_manager','dist','index.html'))
})
app.listen(3000,(req,res)=>{
    console.log("LISTENING TO PORT 3000")
})