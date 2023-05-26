import express from "express";
import merchantRouter from "./merchant-router";
import customerRouter from "./customer-router";
import updateRoleController from "../controller/update-role";
import registerController from "../controller/register";
import auth from "../middleware/auth";

const router = express.Router();

router.use("/merchant", merchantRouter);
router.use("/customer", customerRouter);
router.put("/update-role", updateRoleController);
router.post("/register", registerController);

export default router;
