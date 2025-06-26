import express from "express";
import { signin, allotedStudent, viewBlock, editBlock } from "../controllers/adminController.js";

const router = express.Router();
router.post("/signin",signin)
router.get('/allotedStudent/:blockName',allotedStudent)
router.get('/viewblock/:blockName',viewBlock)
router.put('/editBlock/:blockName',editBlock)
export default router;