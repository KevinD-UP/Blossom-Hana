const express = require('express')
router = express.Router()
login = require('../controllers/login.controllers')

router.get('/', login.login)


module.exports = router
