const express = require('express')
const loginController = require('./controller.tsx')

const router = express.Router()

router.post('/login', loginController.login);
router.post('/accessToken', loginController.accessToken);
router.post('/refreshToken', loginController.refreshToken);
router.post('/success', loginController.loginSuccess);
router.post('/logout', loginController.logout);

module.exports = router;