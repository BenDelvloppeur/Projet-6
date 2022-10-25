import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

const app = express();
import userRoutes from "./routes/user.js";
import saucesRoutes from "./routes/sauces.js";
import { fileURLToPath } from "url";

dotenv.config();


mongoose
  .connect(
    process.env.DB_URL ,
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
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/images", express.static(path.join(__dirname, "images")));

export default app;
