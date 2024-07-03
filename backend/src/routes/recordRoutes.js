import express from "express";
import { authenticateJWT } from "../middleware/auth.js";
import { addRecord } from "../controllers/recordController.js";

const router=express.Router()


router.post('/record',authenticateJWT,addRecord)

export default router