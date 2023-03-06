import cloudinary from 'cloudinary'; 
import Publicaciones from '../models/Publicaciones.js';
import Usuarios from '../models/Usuarios.js';

export const verPublicaciones = async(req, res)=>{
    try {
        const publicaciones = await Publicaciones.find();
        res.status(200).json(publicaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const crearPublicaciones = async(req, res)=>{
    try {

        let idImg;
        let urlImg;

        if(req.files.imgPublicacion){
            const result = await cloudinary.uploader.upload(req.files.imgPublicacion[0].path);
            idImg = result.public_id;
            urlImg = result.secure_url;
        }

        const usuario = await Usuarios.findById(req.params.id)

        const nuevaPublicacion = new Publicaciones(req.body);
        nuevaPublicacion.idUsuario = usuario._id;
        nuevaPublicacion.nombreusuario = usuario.usuario;
        nuevaPublicacion.idImgPublicacion = idImg;
        nuevaPublicacion.urlImgPubllicacion = urlImg;

        const publicacionSvae = await nuevaPublicacion.save()

        res.status(200).json(publicacionSvae);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}