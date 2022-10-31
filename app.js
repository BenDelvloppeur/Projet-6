// Importation d'express => Framework basé sur node.js
import express from "express";
// On importe mongoose pour pouvoir utiliser la base de données
import mongoose from "mongoose";
// utilisation de 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
import * as dotenv from "dotenv";
// On donne accès au chemin de notre système de fichier (dans ce cas "images")
import path from "path";

// Création d'une application express
const app = express();

// On importe la route concernant les users
import userRoutes from "./routes/user.js";
// On importe la route concernant les sauces
import saucesRoutes from "./routes/sauces.js";

import { fileURLToPath } from "url";

dotenv.config();

// Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
app.use(express.json());

// les Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS,
// afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

// Chemin d'accés aux images
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// permet de charger les fichiers qui sont dans le repertoire images
app.use("/images", express.static(path.join(__dirname, "images")));

// Export de l'application express pour déclarer dans server.js
export default app;
