const express=require("express")
const router=express.Router()
const {signin,allotedStudent, viewBlock, editBlock}=require("../controllers/adminController")
router.post("/signin",signin)
router.get('/allotedStudent/:blockName',allotedStudent)
router.get('/viewblock/:blockName',viewBlock)
router.put('/editBlock/:blockName',editBlock)
module.exports=router