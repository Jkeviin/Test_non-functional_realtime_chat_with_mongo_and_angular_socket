const mongoose = require("mongoose");

const mensajeSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  fecha: { type: String, required: true },
  tipoUsuario: { type: Number, required: true },
});

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

module.exports = Mensaje;