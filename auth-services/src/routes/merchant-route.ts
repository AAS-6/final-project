import express from "express";

const router = express.Router();

router.get("/signin", (req, res) => {
  res.send("Sign in");
});

router.get("/signout", (req, res) => {
  res.send("Sign out");
});

router.get("/signup", (req, res) => {
  res.send("Sign up");
});

export default router;
