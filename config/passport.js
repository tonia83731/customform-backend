const passport = require("passport");
const passportJWT = require("passport-jwt");
const Auth = require("../models/auth-models");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await Auth.findById(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

module.exports = passport;
