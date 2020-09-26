import passport from 'passport';
import Local from 'passport-local';
const LocalStrategy = Local.Strategy;
import client from '../utils/db';
import bcrypt from 'bcrypt';
require('dotenv').config()

passport.serializeUser((user: any, done) => {
    done(null, user.uid);
});

passport.deserializeUser((user, done)  =>{
    client.query(`select * from users where uid =$1`, [user], (err, result) => {	
        if (err) throw err;
        done(null, result.rows[0]);
    });});

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},async (username, password, done) => {
        try {
            client.query('select * from users where email=$1', [username], (err, result) => {
                if (err) throw err;
                if (result.rowCount > 0) {
                    return done(null, false, { message: "email already taken" });
                } else {
                    bcrypt.hash(password, 10).then(hashedPassword => {
                        client.query('insert into users(email,name,password) values($1, $2, $3 ) returning *', [username, ' ', hashedPassword], (error, results) => {
                            if (error) throw err;
                            return done(null, results.rows[0]);
                        });
                    });
                }
            });
        } catch (error) {
            return done(error)
        }
            
}))
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (username, password, done) => {
        try {
            client.query('select * from users where email=$1', [username], (err, result) => {
                if (err) throw err;
                if (result.rowCount < 1) {
                    return done(null, false, { message: 'bad email' });
                } else {
                    bcrypt.compare(password, result.rows[0].password).then(response => {
                        if (!response) {
                            return done(null, false, { message: "password does not match" });
                        }
                        return done(null, result.rows[0]);
                    })
                }
            })
        } catch (error) {
            return done(error)
        }
}))

