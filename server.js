// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./src/config/mongo");
const taskRoutes = require("./src/routes/task_routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conectar a MongoDB y corroborar conexión
dbConnect()
  .then(() => console.log("Conexión a MongoDB exitosa."))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/tasks", taskRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
