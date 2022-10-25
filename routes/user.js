import express from "express";
const router = express.Router();

import {signup, login} from "../controller/user.js";

// router.post("/signup", userCtrl.signup);
router.post("/signup", signup);
// router.post("/login", userCtrl.login);
router.post("/login", login );

export default router;
