// nous créons un schéma de données qui contient les champs souhaités pour chaque sauces,
// indique leur type ainsi que leur caractère (obligatoire ou non).
// Pour cela, on utilise la méthode Schema mise à disposition par Mongoose.
// Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose ;

import mongoose, { model } from "mongoose";
import mongooseError from "mongoose-errors";

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

sauceSchema.plugin(mongooseError);

export default mongoose.model("Sauce", sauceSchema);
