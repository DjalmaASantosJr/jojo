const Nota = require('../models/nota');

exports.adicionarNota = async (req, res) => {
    const { nomeAluno, valor } = req.body;
    if (valor < 0 || valor > 10) {
        return res.status(400).json({ error: 'Nota deve estar entre 0 e 10' });
    }
    await Nota.create({ nomeAluno, valor, user: req.user._id });
    res.status(201).json({ message: 'Nota adicionada com sucesso!' });
};

exports.listarNotas = async (req, res) => {
    const notas = await Nota.find({ user: req.user._id });
    res.status(200).json(notas);
};

exports.mediaAluno = async (req, res) => {
    const { nomeAluno } = req.params;
    const notas = await Nota.find({ user: req.user._id, nomeAluno });

    if (notas.length === 0) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    const media = notas.reduce((soma, n) => soma + n.valor, 0) / notas.length;
    res.status(200).json({ nomeAluno, media });
};