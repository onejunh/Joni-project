const express = require('express')
const userController = require('./controller.tsx')

const router = express.Router()

router.get('/getName', userController.getUser);

module.exports = router;