const express = require('express');
const {waiting,waitingStduent}=require("../controllers/waitingController")
// const {waitingStudents}=require("../controllers/waitingController")
const router=express.Router()
router.post("/add",waiting)
router.get("/get/:blockName",waitingStduent)
module.exports=router