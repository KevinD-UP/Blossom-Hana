const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
controllers  = require('../controllers/controllers')

// Home page
router.get('/', controllers.home)

// Dashboard
router.get('/dashboard', ensureAuthenticated, controllers.renderDashboard)

//Buying page
router.get('/purchase', ensureAuthenticated, controllers.renderPurchase)

module.exports = router;
