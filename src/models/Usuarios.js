import { Schema, model } from "mongoose";

const usuariosSchema = new Schema(
  {
    usuario: {
      type: String,
    },
    correo: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Usuarios", usuariosSchema);
