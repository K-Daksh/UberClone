
const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller');
const { body, query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().notEmpty().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    body('destination').isString().notEmpty().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    body('vehicle').isString().notEmpty().isIn(['auto', 'car', 'moto']).withMessage('Invalid Vehicle Type'),
    rideController.createRide
)
router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router;