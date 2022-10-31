// Import du package http 
import http from "http";
// Import de app pour utilisation de l'application sur le serveur
import app from "./app.js";
// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Si aucun port n'est fourni alors port 3000

const port = normalizePort(process.env.PORT || "3000");

// la fonction errorHandler  recherche les différentes erreurs et les gères de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// Créer un serveur avec express qui utilise app
const server = http.createServer(app);

// Lance le serveur et affiche sur quel port se connecter ou gère les erreurs s'il y en a
server.on("error", errorHandler);

server.listen(port, () => console.log(`Serveur connecté au port ${port}`));
