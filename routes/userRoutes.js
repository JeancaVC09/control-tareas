const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Rutas protegidas: requiere token
router.use(verifyToken);

router.get('/profile', userController.getProfile);

// Solo admin puede listar usuarios
router.get('/', checkRole(['admin']), userController.getAllUsers);

module.exports = router;
