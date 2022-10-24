import express from "express";
const router = express.Router();

import userCtrl from "../controller/user.js";

// router.post("/signup", userCtrl.signup);
router.post("/signup", function (req, res) {
  userCtrl.signup;
});
// router.post("/login", userCtrl.login);
router.post("/login", function (req, res) {
  userCtrl.login;
});

export default router;
