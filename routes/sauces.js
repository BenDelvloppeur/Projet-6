import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import multer from "../middleware/multer-config.js";

import {
  getAllSauce,
  getOneSauce,
  createSauce,
  deleteSauce,
  modifySauce,
  likedSauce,
} from "../controller/sauces.js";

// router.get("/", auth, getAllSauce);
router.get("/", auth, getAllSauce);
// router.get("/:id", auth, getOneSauce);
router.get("/:id", auth, getOneSauce);
// router.post("/", auth, multer, createSauce);
router.post("/", auth, multer, createSauce);
// router.put("/:id", auth, multer, modifySauce);
router.put("/:id", auth, multer, modifySauce);
// router.delete("/:id", auth, deleteSauce);
router.delete("/:id", auth, deleteSauce);
// router.post("/:id/like", auth, likedSauce);
router.post("/:id/like", auth, likedSauce);

export default router;
