const captainModel = require('../models/captain.model');
const captainSerivce = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password, vehicle } = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: 'Captain already exist' });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainSerivce.createCaptain({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword, color: vehicle.color, plate: vehicle.plate, capacity: vehicle.capacity, vehicleType: vehicle.vehicleType });
        const token = captain.generateAuthToken();
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const { email, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const captain = await captainModel.findOne({ email });
    // console.log(captain);
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({ token, captain });

}

module.exports.getCaptainProfile = async (req, res, next) => {
    // console.log(req.captain);
    return res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const blackToken = await blacklistTokenModel.create({ token });
    blackToken.save();
    // console.log(token);
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out' });
}