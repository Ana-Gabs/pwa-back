// src/controllers/task_controller.js

const Task = require("../models/task");

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
  try {
    console.log("🔍 Petición GET /tasks recibida");
    const tasks = await Task.find();
    console.log(`✅ Se encontraron ${tasks.length} tareas`);
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error al obtener tareas:", err);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// Crear tarea
exports.createTask = async (req, res) => {
  try {
    console.log("🔍 Petición POST /tasks recibida");

    const { title, description, location } = req.body;

    // Foto (subida con multer)
    const photo = req.file ? req.file.path : null;

    // Parsear ubicación si viene como string JSON
    const loc = location ? JSON.parse(location) : null;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const task = new Task({
      title,
      description,
      photo,
      location: loc
    });

    const savedTask = await task.save();
    console.log("✅ Tarea guardada correctamente:", savedTask);
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err);
    res.status(500).json({ error: "Error al crear tarea" });
  }
};


// Actualizar tarea
exports.updateTask = async (req, res) => {
  try {
    console.log(`🔍 Petición PUT /tasks/${req.params.id} recibida con body:`, req.body);

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!task) {
      console.warn(`⚠️ Tarea con ID ${req.params.id} no encontrada`);
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    console.log("✅ Tarea actualizada:", task);
    res.json(task);
  } catch (err) {
    console.error("❌ Error al actualizar tarea:", err);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
  try {
    console.log(`🔍 Petición DELETE /tasks/${req.params.id} recibida`);

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      console.warn(`⚠️ Tarea con ID ${req.params.id} no encontrada`);
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    console.log("✅ Tarea eliminada:", deletedTask);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    console.error("❌ Error al eliminar tarea:", err);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};
