import passport from "passport";
import passportJWT, { StrategyOptions } from "passport-jwt";
import User from "../models/user-models";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      console.log(jwtPayload);
      const user = await User.findById(jwtPayload._id);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

export default passport;
