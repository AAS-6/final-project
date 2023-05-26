import express from "express";
import {
  createAddress,
  deleteAddress,
  updateAddress,
  getAddress,
  createRating,
  getRating,
  deleteRating,
  updateRating,
} from "../controller/customer";
import auth from "../middleware/auth";

const router = express.Router();

router
  .post("/address", auth, createAddress)
  .patch("/address", auth, updateAddress)
  .delete("/address", auth, deleteAddress)
  .get("/address", getAddress)
  .post("/rating", auth, createRating)
  .get("/rating", getRating)
  .delete("/rating", auth, deleteRating)
  .put("/rating", auth, updateRating);
// .post("/whishlist", whishlistController)
// .delete("/whishlist", whishlistController)
// .put("/whishlist", whishlistController);

export default router;
