import express from "express";
import registerController from "../controller/customer/register";

const router = express.Router();

router.post("/register", registerController);

export default router;
