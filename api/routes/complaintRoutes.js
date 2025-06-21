const express=require("express")
const {getComplaints,addComplaints,getComplaintByrollNumber,deleteComplaint}=require("../controllers/complaintController")

const router=express.Router()
router.post("/add",addComplaints)
router.get("/get",getComplaints)
router.get("/get/:rollNumber",getComplaintByrollNumber)
router.delete('/delete/:rollNumber',deleteComplaint)
module.exports=router