const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password } = req.body;
        const isUserAlreadyExist = await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: 'User already exist' });
        }
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUsers({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword });
        const token = user.generateAuthToken();
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password'); // This helps to bring the password with the query as well because we used select:false by default in model

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password); // This will compare the password with the hashed password in the database

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ user: user, token: token });
}

module.exports.getUserProfile = async (req, res, next) => {
    // console.log(req.user)
    res.status(200).json({ user: req.user });
}

module.exports.logoutUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const blackToken = await blacklistTokenModel.create({ token: token });
    blackToken.save();
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}