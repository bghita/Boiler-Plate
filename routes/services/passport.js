const passport = require('passport');
const User = require('./../../models/User');
const config = require('./../config');
const JwStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy= require('passport-local');

// Create Local Strategy
// By default LocalStrategy it is expecting a username and password
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        const user = await User.findOne({email});
        if(!user) {
            return done(null, false);
        }
        user.comparePassword(password, (err, isMatch) => {
            if(err) return done(err)
            if(!isMatch) {
                return done(null, flase);
            }
            return done(null, user);
        });
    } catch(e) {
        done(e, false);
    }
});

// Setup oprions for Jwt Strategy
// We need to tell our Strategy where to look for the Token
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

passport.use(localLogin);