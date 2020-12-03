var passport = require("passport");
var passportJWT = require("passport-jwt");
var User = require("../models/User.model.js");
var cfg = require("../jwtConfig.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt')
};

module.exports = function() {
    passport.use(new Strategy(params, function(payload, done) {
        User.findById(payload._id).then(user => {
            if (!user) {
                res.status(404).json({err});
                return done(null, false);
            } else if(payload.expire<=Date.now()) {
                return done(new Error("TokenExpired"), false);
            } else {
                return done(null, user);
            } 
        });
    }));

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate('jwt', cfg.jwtSession);
        }
    
  };
};
