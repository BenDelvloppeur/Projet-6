// nous créons un schéma de données qui contient les champs souhaités pour chaque sauces,
// indique leur type ainsi que leur caractère (obligatoire ou non).
// Pour cela, on utilise la méthode Schema mise à disposition par Mongoose.
// Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose ;

import mongoose from "mongoose";

// const sauceValidation = require("../middleware/sauceValidation");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
});

export default mongoose.model("Sauce", sauceSchema);
