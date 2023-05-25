import express from "express";
import merchantRouter from "./merchant-router";
import customerRouter from "./customer-router";

const router = express.Router();

router.get("/merchant", merchantRouter);
router.get("/customer", customerRouter);

export default router;
