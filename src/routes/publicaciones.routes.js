import { Router } from 'express';
import { verPublicaciones, verPublicacionesDeUsuario, crearPublicaciones, actualizarPublicacion, eliminarPublicacion } from '../controllers/publicaciones.controllers.js';
import multer from 'multer';
import { storage } from '../libs/cloudinary.js';
const upload = multer({
    storage: storage
});

const router = Router();

router.get("/perfil/publicaciones", verPublicaciones);

router.get("/perfil/user/:id", verPublicacionesDeUsuario);

const input = upload.fields([{name: 'imgPublicacion'}]);
router.post("/perfil/:id/publicaciones", input, crearPublicaciones);

router.put("/perfil/user/:id", actualizarPublicacion);

router.delete("/perfil/user/:id", eliminarPublicacion);

export default router;