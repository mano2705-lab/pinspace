import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createPin,
  getAllPins,
  getUserPins,
  searchPins,
  deletePin,
} from "../controllers/pinController.js";

const router = express.Router();
router.get("/", getAllPins);
router.get("/user/:id", getUserPins);
router.get("/search", searchPins);
router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  createPin
);
router.delete(
  "/:id",
  authMiddleware,
  deletePin
);

export default router;