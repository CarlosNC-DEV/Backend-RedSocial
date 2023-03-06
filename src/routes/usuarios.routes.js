import { Router } from "express";
import { verifyToken } from '../middleware/jsonwebtoken.js';
import { crearUsuarios, validarUsuario, validarSesion } from '../controllers/usuarios.controllers.js';

const router = Router();

router.post("/register", crearUsuarios);
router.post("/login", validarUsuario);
router.get("/profile", verifyToken, validarSesion);

export default router;
