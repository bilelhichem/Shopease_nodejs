const UserController = require('../Controllers/User.Controller');
const router = require('express').Router();

router.post('/api/RegisterUser',UserController.RegisterUser);


module.exports = router;