import express from "express"
import {chat} from "../Controller/chatController.js"

const router = express.Router();

router.post("/",chat);

export default router;