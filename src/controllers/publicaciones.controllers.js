import cloudinary from 'cloudinary'; 
import Publicaciones from '../models/Publicaciones.js';
import Usuarios from '../models/Usuarios.js';

export const verPublicaciones = async(req, res)=>{
    try {
        const publicaciones = await Publicaciones.find().lean();
        res.status(200).json(publicaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const verPublicacionesDeUsuario = async (req, res)=>{
    try {
        const { id } = req.params;
        const publicacionUsuario = await Publicaciones.find({ idUsuario: id });
        if (publicacionUsuario.length === 0) {
            return res.status(400).json("No tienes ninguna Publicacion");
        }          
        res.status(200).json(publicacionUsuario);
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

        const publicacionSave = await nuevaPublicacion.save()

        res.status(200).json(publicacionSave);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const actualizarPublicacion = async(req, res)=>{
    try {
        const { id } = req.params
        const publicacionActualiza = await Publicaciones.findByIdAndUpdate(id, req.body);
        if(!publicacionActualiza){
            return res.status(400).json("No se puedo actualizar la publicacion");
        }

        res.status(200).json("Publicacion Actualizada")
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const eliminarPublicacion = async(req, res)=>{
    try {
        const { id } = req.params;
        const publicacion = await Publicaciones.findByIdAndDelete(id);
        if(!publicacion){
            return res.status(400).json("No se pudo eliminar la publicación")
        }

        res.status(200).json("Publicación Eliminada");

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}