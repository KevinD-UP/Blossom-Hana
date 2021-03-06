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
router.get('/register', controllers.renderRegister);

//register handle
router.post('/register', controllers.registration);

//login handle
router.post('/login', controllers.login)

//logout handle
router.get('/logout', controllers.logout)



module.exports = router;
