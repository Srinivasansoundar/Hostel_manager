import express from "express";
import { signin, signout } from "../controllers/authcontrollers.js";

const router = express.Router();
router.post("/signin",signin)
router.post("/signout",signout)
module.exports=router