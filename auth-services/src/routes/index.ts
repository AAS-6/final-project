import express from "express";
import {
  signin,
  updateCredentials,
  updateRole,
  validate,
  signup,
} from "../controller/customer";

const router = express.Router();

router.get("/signin", (req, res) => {
  res.send("Sign in");
});

router.get("/signout", async (req, res) => {
  res.send("Sign out");
});

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/signup", (req, res) => {
  res.send("Sign up");
});

router.get("/validate", validate);
router.put("/update-credentials", updateCredentials);
router.put("/update-role", updateRole);

export default router;
