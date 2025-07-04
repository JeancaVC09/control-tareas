const User = require('../models/User');
const Task = require('../models/Task');

exports.getProfile = async (req, res) => {
  try {
    // Solo algunos campos: username, role, email (ajusta según tu modelo)
    const user = await User.findById(req.user.id).select('username role email');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Solo admins pueden usar esta ruta (ya lo controla middleware)
    const users = await User.find().select('username password role'); // password hashed

    // Contar tareas por usuario (optimizable pero simple)
    const usersWithTaskCount = await Promise.all(users.map(async (user) => {
      const taskCount = await Task.countDocuments({ userId: user._id });
      return {
        _id: user._id,
        username: user.username,
        password: user.password,  // muestra hashed (cuidado)
        role: user.role,
        taskCount
      };
    }));

    res.json(usersWithTaskCount);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};
