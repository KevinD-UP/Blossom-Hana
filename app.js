const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require("express-session")
const flash = require("connect-flash")
const passport = require('passport')

const app = express()

// Passport config
require('./config/passport')(passport);

// ENV
require('dotenv').config()

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash());

// Global Vars;
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// ROUTES
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.use(express.static(__dirname))

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log(`Listening on Port: ${PORT}`)
})

