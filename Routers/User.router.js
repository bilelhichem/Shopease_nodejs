const UserController = require('../Controllers/User.Controller');
const router = require('express').Router();

router.post('/api/RegisterUser',UserController.RegisterUser);

router.post('/api/LoginUser',UserController.LoginUser);

router.post('/api/forgotpassword',UserController.forgotPassword);


module.exports = router;