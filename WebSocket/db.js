const mongoose = require("mongoose");
mongoose.set("debug", true);

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Jkeviin:Jkeviin2130@cluster0.ovudi9t.mongodb.net/test?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al conectarse a la base de datos", error);
    process.exit(1);
  }
};

const Mensaje = require("./model");

module.exports = {
  conectarDB,
  Mensaje,
};