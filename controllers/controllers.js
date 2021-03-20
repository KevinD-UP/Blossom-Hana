const database = require('../config/database')
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.home = (req, res) => {
    res.render('../views/welcome')
}

exports.renderDashboard = (req, res) => {
    if(req.user.type === 'client')
        res.render('../views/dashboardClient', {
            name: req.user.name
        })
    else
        res.render('../views/dashboardEmployee', {
            name: req.user.name
        })
}

exports.renderLogin = (req, res) => {
    res.render('../views/login')
}

fetchPersonalizedBouquet = () => {
    database.connect((err) => {
        if (err) throw err;
        database.query("SELECT * FROM bouquet_personalized", (err,  rows, field) => {
            if(rows === undefined)
                return []
            else
                return rows
        })
    })
}

exports.renderPurchase = (req, res) => {
    res.render('../views/purchase', { bouquet: fetchPersonalizedBouquet
    })
}

exports.register = (req, res) => {
    res.render('../views/register')
}

exports.registration = (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'})
    }

    //Check passwords match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'})
    }

    //Check pass length
    if(password.length < 6) {
        errors.push({msg: 'Password should be a least 6 characters'})
    }

    if(errors.length > 0){
        res.render('../views/register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        database.connect( (err) => {
            if (err) throw err;
            database.query("SELECT email FROM users WHERE email='"+email+"'", (err, rows, fields) => {
                if(err) throw err;
                if (rows[0] !== undefined && email === rows[0].email){
                    //User already exists
                    errors.push({msg: 'Email is already registered'})
                    res.render('../views/register', {
                        errors,
                        name,
                        email,
                        password,
                        password2 })
                }else {
                    const newUser = {name: name, email: email, password: password}
                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) =>  bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hashed
                            newUser.password = hash;
                            //Save user
                            database.connect((err) => {
                                if (err) throw err;
                                database.query(`INSERT INTO users (email, name, password, type) VALUES ('${newUser.email}','${newUser.name}','${newUser.password}', 'client')`, (err, result) => {
                                    if (err) throw err;
                                    console.log("A new user has been registered")
                                    req.flash('success_msg', 'You are now registered and can log in')
                                    res.redirect('/users/login')
                                })
                            })
                    }))
                }
            })
        })
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
}

exports.resolveCommand = (req, res) => {
    //TODO requete de mise a jour des commandes
    res.redirect('/users/dashboard')
}