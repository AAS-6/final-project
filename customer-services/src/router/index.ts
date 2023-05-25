import express from "express";
import merchantRouter from "./merchant-router";
import customerRouter from "./customer-router";

const router = express.Router();

router.use("/merchant", merchantRouter);
router.use("/customer", customerRouter);

export default router;
