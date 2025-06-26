import express from "express";
import {
  getComplaints,
  addComplaints,
  getComplaintByrollNumber,
  deleteComplaint
} from "../controllers/complaintController.js";
const router=express.Router()
router.post("/add",addComplaints)
router.get("/get",getComplaints)
router.get("/get/:rollNumber",getComplaintByrollNumber)
router.delete('/delete/:rollNumber',deleteComplaint)
export default router;