const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // 🔒 solo tareas del usuario
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, userId: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear tarea' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    // 🔒 solo dueño puede editar
    if (task.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'No autorizado para editar esta tarea' });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed ?? task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar tarea' });
  }
};

exports.deleteTask = async (req, res) => {

  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado para eliminar esta tarea' });
    }

    await task.deleteOne();

    res.json({ message: 'Tarea eliminada', deletedTaskId: task._id, deletedUserId: task.userId });
  } catch (err) {
    console.error('ERROR al eliminar tarea:', err);
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }
};
