import express from "express";
import {
  deleteProfile,
  createProfile,
  getProfile,
  updateProfile,
} from "../controller/merchant";
import auth from "../middleware/auth";

const router = express.Router();

router
  .get("/profile", getProfile)
  .post("/profile", auth, createProfile)
  .patch("/profile", auth, updateProfile)
  .delete("/profile", auth, deleteProfile);

export default router;
