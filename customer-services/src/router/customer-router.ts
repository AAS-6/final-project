import express from "express";
import {
  createAddress,
  deleteAddress,
  updateAddress,
  getAddress,
} from "../controller/customer";

const router = express.Router();

router
  .post("/address", createAddress)
  .patch("/address", updateAddress)
  .delete("/address", deleteAddress)
  .get("/address", getAddress);
// .post("/whishlist", whishlistController)
// .delete("/whishlist", whishlistController)
// .put("/whishlist", whishlistController);

export default router;
