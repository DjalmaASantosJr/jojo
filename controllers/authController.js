const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        const user = await User.create({ email, password });
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch {
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: 'Email ou senha inválidos' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
};