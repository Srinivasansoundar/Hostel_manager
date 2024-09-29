const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const studentRoutes=require("./routes/student")
const authroutes=require("./routes/authroutes")
const bookRoutes=require("./routes/bookRoutes")
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
app.use(express.json())
// app.use(express.urlencoded)
app.use("/student",studentRoutes)
app.use('/api/student', bookRoutes);
app.use("/api",authroutes)


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
app.listen(3000,(req,res)=>{
    console.log("LISTENING TO PORT 3000")
})