import { Schema, model} from 'mongoose';
const ObjectId = Schema.ObjectId;

const publicacionSchema = new Schema(
    {
        idUsuario: {
            type: ObjectId
        },
        nombreusuario: {
            type: String
        },
        idImgPublicacion: {
            type: String
        },
        urlImgPubllicacion: {
            type: String
        },
        descripcion: {
            type: String
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {
        versionKey: false
    }
)

export default model("Publicaciones", publicacionSchema);