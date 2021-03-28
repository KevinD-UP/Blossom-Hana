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
router.post('/purchase', ensureAuthenticated, controllers.addCommand)

//Personalize page
router.get('/customize', ensureAuthenticated, controllers.renderCustomize)

//Cart page
router.get('/cart', ensureAuthenticated, controllers.renderCart)
router.post('/cart', ensureAuthenticated, controllers.deleteCommand)

//Payment page
router.get('/payment', controllers.renderPayment)
router.post('/payment', controllers.resolveCommand)

module.exports = router;
