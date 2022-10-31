// Ajout de plugin externe nécessaire pour utiliser le router d'Express
import express from "express";

// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();

// On importe le middleware auth pour sécuriser les routes (cela signifie qu'il y a une vérification de connexion avant de pouvoir intéragir sur une sauce)
import auth from "../middleware/auth.js";

//On importe le middleware multer pour la gestion des images
import multer from "../middleware/multer-config.js";

// On associe les fonctions aux différentes routes, on importe les fonctions du controller
import {
  getAllSauce,
  getOneSauce,
  createSauce,
  deleteSauce,
  modifySauce,
  likedSauce,
} from "../controller/sauces.js";

// Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers

// Route qui permet de récupérer toutes les sauces, Renvoie le tableau de toutes les sauces dans la base de données
router.get("/", auth, getAllSauce);

// Route qui permet de cliquer sur une des sauces précise
router.get("/:id", auth, getOneSauce);

// Route qui permet de créer "une sauce"
router.post("/", auth, multer, createSauce);

// Route qui permet de modifier "une sauce"
router.put("/:id", auth, multer, modifySauce);

// Route qui permet de supprimer "une sauce"
router.delete("/:id", auth, deleteSauce);

// Route qui permet de gérer les likes des sauces
router.post("/:id/like", auth, likedSauce);

export default router;
