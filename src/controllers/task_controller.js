// src/controllers/task_controller.js

const Task = require("../models/task");

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// Crear tarea
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Error al crear tarea" });
  }
};

// Actualizar tarea
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};
