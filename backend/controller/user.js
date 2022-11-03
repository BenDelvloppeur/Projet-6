// On utilise l'algorithme bcrypt pour hasher le mot de passe des utilisateurs
import bcrypt from "bcrypt";
// On utilise le package jsonwebtoken pour attribuer un token à un utilisateur au moment ou il se connecte
import jwt from "jsonwebtoken";
// On utilise dotenv pour sécurisé le token.
import * as dotenv from "dotenv";

// On récupère notre model User ,créer avec le schéma mongoose
import User from "../models/user.js";

dotenv.config();

// On sauvegarde un nouvel utilisateur et crypte son mot de passe avec un hash généré par bcrypt
export const signup = (req, res, next) => {
  // On appelle la méthode hash de bcrypt et on lui passe le mdp de l'utilisateur, le salte (10) ce sera le nombre de tours qu'on fait faire à l'algorithme
  bcrypt
    .hash(req.body.password, 10)
    // On récupère le hash de mdp qu'on va enregister en tant que nouvel utilisateur dans la BBD mongoDB
    .then((hash) => {
      // Création du nouvel utilisateur avec le model mongoose
      const user = new User({
        // On récupère l'email qui se trouve dans le corps de la requête.
        email: req.body.email,
        // On récupère le mdp hashé de bcrypt
        password: hash,
      });
      // On sauvegarde l'utilisateur dans la BDD
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        // Si déjà crée avec la même adresse e-mail alors erreur
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// On vérifie si l'utilisateur existe dans la BDD MongoDB lors du login.
// Si valide, on vérifie sont mot de passe, s'il est bon alors un token contenant l'id de l'utilisateur sera envoyé. sinon érreur.
export const login = (req, res, next) => {
  console.log("Login req", req);
  // On recherche l'utilisateur dans la BDD (adresse email.)
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        // Si pas trouvé alors erreur 401.
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // bcrypt est utilisé pour comparer les hashs du mot de passe pour permètre de savoir si ils ont la même string que celle d'origine.
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // Si valide on renvoie statut 200 et un objet au format json avec un userid + le token.
          res.status(200).json({
            userId: user._id,
            // Obtention d'un token pour l'authentification grâce à JWT, on va crée les tokens et les vérifier
            token: jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, {
              // Configuration de l'expiration du token au bout de 24h
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
