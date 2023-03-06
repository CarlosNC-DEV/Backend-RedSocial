import { Router } from 'express';
import { verPublicaciones, crearPublicaciones } from '../controllers/publicaciones.controllers.js';
import multer from 'multer';
import { storage } from '../libs/cloudinary.js';
const upload = multer({
    storage: storage
});

const router = Router();

router.get("/perfil/publicaciones", verPublicaciones);

const input = upload.fields([{name: 'imgPublicacion'}]);
router.post("/perfil/:id/publicaciones", input, crearPublicaciones);

export default router;