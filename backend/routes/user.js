// On crée un router avec la méthode mise à disposition par Express
import express from "express";
const router = express.Router();
// import des functions
import {signup, login} from "../controller/user.js";

// route qui permet de s'enregistrer
router.post("/signup", signup);
// route qui permet de se connecter 
router.post("/login", login );

export default router;
