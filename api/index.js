const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const studentRoutes=require("./routes/student")
dotenv.config();
// console.log(process.env.MONGO)
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/student",studentRoutes)




app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin page")
})
app.listen(3000,(req,res)=>{
    console.log("LISTENING TO PORT 3000")
})