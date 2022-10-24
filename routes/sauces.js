import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import multer from "../middleware/multer-config.js";

import sauceCtrl from "../controller/sauces.js";

// router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/", function (req, res) {
  auth, sauceCtrl.getAllSauce;
});
// router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/id", function (req, res) {
  auth, sauceCtrl.getOneSauce;
});
// router.post("/", auth, multer, sauceCtrl.createSauce);
router.post("/", function (req, res) {
  auth, multer, sauceCtrl.createSauce;
});
// router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.put("/:id", function (req, res) {
  auth, multer, sauceCtrl.modifySauce;
});
// router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.delete("/:id", function (req, res) {
  auth, sauceCtrl.deleteSauce;
});
// router.post("/:id/like", auth, sauceCtrl.likedSauce);
router.post("/:id/like", function (req, res) {
  auth, sauceCtrl.likedSauce;
});

export default router;
