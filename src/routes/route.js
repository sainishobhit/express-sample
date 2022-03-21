const express = require('express');

const router = express.Router();

const { userController, loginUser } = require('../controllers')

//userRoutes
router.post('/register', userController.registerUser);
router,post('/login', userController.loginUser)

module.exports = router;