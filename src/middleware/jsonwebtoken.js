import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json("No autorizado");
    }
  
    try {
      const { userId } = jwt.verify(token, JWT_SECRET);
      req.userId = userId;
      next();
    } catch (error) {
      res.status(401).json("No autorizado");
    }
};
  