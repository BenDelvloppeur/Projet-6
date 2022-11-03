// Création d'un model user avec mongoose, on importe donc mongoose
import mongoose from "mongoose";

// On rajoute un package qui valide l'unicité de l'email
import uniqueValidator from "mongoose-unique-validator";

// On crée notre schéma de données dédié à l'utilisateur
const userShema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userShema.plugin(uniqueValidator);

export default mongoose.model("User", userShema);
