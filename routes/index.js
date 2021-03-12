const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
controllers  = require('../controllers/controllers')

// Home page
router.get('/', controllers.home)

// Dashboard
router.get('/dashboard', ensureAuthenticated, controllers.renderDashboard)

module.exports = router;
