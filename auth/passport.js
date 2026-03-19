// define our localStrategy and session behavior

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
    new LocalStrategy(async(username, password, done) => {
        try{
            const user = await User.findOne({username});
            if(!user) return done(null, false);
            const ok = await bcrypt.compare(password, user.passwordHash); // true/false
            if(!ok) return done(null, false);
            // at this point we are sure that username and password 
            // are correct if it passes the above logic
            return done(null, user)
        }catch(err){
            return done(err)
        }
    })
)

//define what is stored in the session cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async(id, done) => {
    try{
        const user = await User.findById(id).select("username");
        done (null, user);
    }catch(err){
        done(err);
    }
});

module.exports = passport;