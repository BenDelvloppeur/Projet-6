import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}

export default auth;
