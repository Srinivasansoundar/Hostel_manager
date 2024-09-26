const express=require("express")
const app=express()
const studentRoutes=require("./routes/student")
app.use("/student",studentRoutes)




app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin page")
})
app.listen(3000,(req,res)=>{
    console.log("LISTENING TO PORT 3000")
})