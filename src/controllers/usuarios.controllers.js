import Usuarios from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { JWT_SECRET } from '../config.js';

export const crearUsuarios = async(req, res)=>{
    try {
        const { usuario, correo, password } = req.body;

        if (!usuario || !correo || !password) {
            return res.status(400).json("Todos los campos son requeridos");
        }

        const usuariosExistente = await Usuarios.findOne({ usuario })

        if(usuariosExistente){
           return res.status(400).json("Usuarios ya existente");
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const usuarioModel = new Usuarios({ usuario: usuario, correo: correo, password: hashedPassword});

        await usuarioModel.save();
        res.status(200).json("Usuario creado exitosamente")

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const validarUsuario = async(req, res)=>{
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json("Todos los campos son requeridos");
        }

        const usuario = await Usuarios.findOne({ correo });

        if(!usuario){
            return res.status(400).json("Correo Incorrecto");
        }

        const validarPassword = await bcryptjs.compare(password, usuario.password);

        if(!validarPassword){
            return res.status(400).json("Contraseña Incorrecta");
        }

        const token = jwt.sign({ userId: usuario._id }, JWT_SECRET, { expiresIn: '24h'});

        res.status(200).json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const validarSesion = async(req, res)=>{
    try {
        const usuario = await Usuarios.findById(req.userId).lean();
        if(!usuario){
            return res.status(401).json("No autorizado");
        }


        res.json({ _id: usuario._id, usuario: usuario.usuario, correo: usuario.correo });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

