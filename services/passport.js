const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
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
};

// We are going to get the payload argument from an incoming request
// The payload argument is coming from the function that we will create in authRoutes
// done is the function we call once we tried to authenticate this user
const jwtLogin = new JwStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch(e){
        done(e, false);
    }
});

// This tells passport that we declared these strategies
// the local login says we have a strategy called "Local"
// The jwtLogin says we have a strategy called jwt
// When we say passport.authenticate 'jwt'
// passport will look for a strategy called 'jwt'
passport.use(localLogin);
passport.use(jwtLogin);