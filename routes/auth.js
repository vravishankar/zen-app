const express = require('express');
const router = express.Router();

// const asyncRoute = require('../middlewares/async-handler');
require('express-async-errors');

const authController = require('../controllers').auth;

// router.post('/login', asyncRoute(authController.login));
// router.post('/register', asyncRoute(authController.register));
// router.get('/current', asyncRoute(authController.current)); 

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/current', authController.current); 

module.exports = router;
