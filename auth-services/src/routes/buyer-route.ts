import express from "express";
import { signin, signout, signup } from "../controller/customer";

const router = express.Router();

router.get("/signin", (req, res) => {
  res.send("Sign in");
});

router.get("/signout", async (req, res) => {
  res.send("Sign out");
});

router.post("/signup", signup);

router.get("/signup", (req, res) => {
  res.send("Sign up");
});

export default router;
