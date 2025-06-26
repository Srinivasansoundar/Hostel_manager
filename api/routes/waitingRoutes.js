import express from 'express';
import { waiting, waitingStduent } from '../controllers/waitingController.js';

// const {waitingStudents}=require("../controllers/waitingController")
const router=express.Router()
router.post("/add",waiting)
router.get("/get/:blockName",waitingStduent)
module.exports=router