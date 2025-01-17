const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

router.get('/get-coordinates',
    query('address').isString().notEmpty().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/get-distance', query('origin').isString().notEmpty().isLength({ min: 3 }),
    query('destination').isString().notEmpty().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistance
);



router.get('/get-suggestions',
    query('address').isString().notEmpty().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getSuggestions
)

router.get('/get-prices',
    query('origin').isString().notEmpty().isLength({ min: 3 }),
    query('destination').isString().notEmpty().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getPrices
);

module.exports = router;