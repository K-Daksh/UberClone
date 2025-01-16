const express = require('express');
const { body } = require('express-validator')
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (req, res) => {
    console.log("Registering user");
    userController.registerUser(req, res);
});

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (req, res) => {
    userController.loginUser(req, res);
});

router.get('/profile', authMiddleware.authUser, (req, res) => {
    userController.getUserProfile(req, res);
});

router.get('/logout', authMiddleware.authUser, (req, res) => {
    userController.logoutUser(req, res);
});

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;