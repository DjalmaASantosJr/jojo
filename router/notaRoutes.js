const express = require('express');
const router = express.Router();
const notaController = require('../controllers/notaController');
const auth = require('../middleware/authMiddleware');

router.post('/notas', auth, notaController.adicionarNota);
router.get('/notas', auth, notaController.listarNotas);
router.get('/notas/:nomeAluno/media', auth, notaController.mediaAluno);

module.exports = router;