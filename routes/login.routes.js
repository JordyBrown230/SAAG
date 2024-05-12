const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const {auditLogout} = require('../middlewares/audit.middleware');

//auditLogin
router.post('/login/', usuarioController.login);

router.post('/logout/:token',  usuarioController.logout, auditLogout);

router.post('/refresh/:token',  usuarioController.refreshToken);


module.exports = router;
