const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { conectarDB, Mensaje } = require("./db");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  // Cargar los mensajes antiguos desde la base de datos
  const mensajes = await Mensaje.find();
  socket.emit("cargarMensajesAntiguos", mensajes);

  socket.on("enviarMensaje", async (infoMensaje) => {
    console.log("Mensaje recibido: ", infoMensaje);
    // Emitimos el mensaje a todos los clientes excepto al que lo envió
    socket.broadcast.emit("recibirMensaje", infoMensaje);

    // Guardar el mensaje en la base de datos
    const mensaje = new Mensaje(infoMensaje);
    await mensaje.save();
  });

  socket.on('solicitarMensajesAntiguos', async () => {
    // Cargar los mensajes antiguos desde la base de datos
    const mensajes = await Mensaje.find();
    socket.emit('cargarMensajesAntiguos', mensajes);
  });
});

const PORT = process.env.PORT || 3000;
conectarDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1);
  });
