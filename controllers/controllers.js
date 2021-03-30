const database = require('../config/database')
const bcrypt = require('bcryptjs')
const passport = require('passport')

//==================================================================================
//=================== RENDER PAGE ==================================================
//==================================================================================
exports.home = (req, res) => {
    res.render('../views/welcome')
}

exports.renderOrdered = (req, res) => {
    res.render('../views/ordered')
}

exports.renderDashboard = (req, res) => {
    if(req.user.type === 'client')
        res.render('../views/dashboardClient', {
            name: req.user.name
        })
    else {
        database.connect((err) => {
            if(err) throw err
            database.query(`SELECT * FROM bouquets, ordered WHERE isCompleted=0 AND status=1 AND ordered.idBouquet=bouquets.idBouquet ORDER BY ordered.date`, (err, rows, fields) => {
                res.render('../views/dashboardEmployee', {
                    name: req.user.name,
                    bouquets: rows
                })
            })
        })
    }
}

exports.renderLogin = (req, res) => {
    res.render('../views/login')
}

exports.renderCustomize = (req, res) => {
    database.connect(err => {
        if(err) throw err
        database.query(`SELECT * FROM flowers`, (err, rows, fields) => {
            if(err) throw err
            res.render('../views/customize', {
                flowers: rows
            })
        })
    })
}

exports.renderAbout = (req, res) => {
    res.render('../views/about')
}

exports.renderCart = (req, res) => {
    database.connect(err => {
        if(err) throw err
        database.query(`SELECT * FROM bouquets, ordered WHERE ordered.idUser=${req.user.id} AND bouquets.idBouquet=ordered.idBouquet`, (err, rows, fields) => {
            if(err) throw err
            res.render('../views/cart', {
                cart: rows
            })
        })
    })
}

exports.renderPurchase = (req, res) => {
    database.connect(err => {
        if(err) throw err
        database.query("SELECT * FROM bouquets WHERE isPredefined="+true, (err, rows, fields) => {
            if(err) throw err
            res.render('../views/purchase', {
                bouquets: rows
            })
        })
    })
}

exports.renderRegister = (req, res) => {
    res.render('../views/register')
}

exports.renderPayment = (req, res) => {
    res.render('../views/payment')
}

//==================================================================================
//=================== FUNCTIONALITY ================================================
//==================================================================================

//Registration function
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

    //If there is an error
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

exports.addCommand = (req, res) => {
    database.connect(err => {
        if(err) throw err
        let idBouquet = req.body.idBouquet
        let idUser = req.user.id
        database.query(`INSERT INTO ordered (idBouquet, idUser, date, status) VALUES (${idBouquet},${idUser}, CURDATE(), false)`)
    })
}

exports.resolveCommand = (req, res) => {
    database.connect(err => {
        if(err) throw err
        database.query(`UPDATE ordered SET status=1 WHERE idUser=${req.user.id}`, )
    })
}

exports.deleteCommand = (req, res) => {
    database.connect ((err) => {
        if(err) throw err
        database.query(`DELETE FROM ordered WHERE idUser=${req.user.id} AND idBouquet=${req.body.idBouquet}`)
    })
}

exports.addCustomBouquet = (req, res) => {

   const {name, description, price} = req.body
    database.connect((err)=> {
        if(err) throw err
        database.query(`INSERT INTO bouquets (name, image, description, price, isPredefined, isCompleted) VALUES ('${name}', '/images/custom.jpg', '${description}', ${price}, false, false)`, (err, result) => {
            if(err) throw err
            database.query(`SELECT idBouquet FROM bouquets WHERE name='${name}' AND description='${description}' AND price=${price}`, (err, rows, fields) => {
                if(err) throw err
                database.query(`INSERT INTO ordered (idUser, idBouquet, date, status) VALUE (${req.user.id}, ${rows[0].idBouquet}, CURDATE(), false)`)
            })
        })
    })
}

exports.resolveCustom = (req, res) => {
    database.connect((err)=> {
        if(err) throw err
        database.query(`UPDATE bouquets SET isCompleted=1 WHERE idBouquet=${req.body.idBouquet}`)
    })
}