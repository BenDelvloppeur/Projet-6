import express from "express";
import mongoose from "mongoose";
import path from "path";

const app = express();

import userRoutes from "./routes/user.js";
import saucesRoutes from "./routes/sauces.js";

mongoose
  .connect(
    "mongodb+srv://Wolat3:6Wo4Uue9XATR18Ph@projet-6.3djit5o.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

// Cors
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
app.use("/images", express.static(path.join(__dirname, "images")));

export default "app.js";
