const LocalStrategy = require('passport-local').Strategy;
const database = require('./database')
const bcrypt = require('bcryptjs')


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            database.connect( (err) => {
                if (err) throw err;
                database.query("SELECT * FROM users WHERE email='"+email+"'", async (err, rows, fields) => {
                    if (err) throw err;
                    if (rows[0] !== undefined && email === rows[0].email) {
                        // Found user
                        // Match password
                        bcrypt.compare(password, rows[0].password, (err, isMatch) => {
                            if(err) throw err
                            if(isMatch){
                                return done(null, rows[0])
                            } else {
                                return done(null, false, {message: 'Password incorrect'})
                            }
                        })
                    } else {
                        return done(null, false, {message: 'That email is not registered'});
                    }
                })
            })
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        database.query("select * from users where id = "+id,function(err,rows){
            done(err, rows[0]);
        });
    });

}