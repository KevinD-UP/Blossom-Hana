const express = require('express')
const router = express.Router()
controllers  = require('../controllers/controllers')

//default
router.get('/', (req, res) => {
    res.redirect('/users/login')
})

//login page
router.get('/login', controllers.renderLogin);

//register page
router.get('/register', controllers.register);

//register handle
router.post('/register', controllers.registration);

//login handle
router.post('/login', controllers.login)

//logout handle
router.get('/logout', controllers.logout)

//Buying page
router.get('/buying', controllers.renderBuying)


module.exports = router;
