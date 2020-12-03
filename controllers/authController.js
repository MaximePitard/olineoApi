var User = require("../models/User.model.js"),
  config = require("../jwtConfig.js"),
  jwt = require('jsonwebtoken');

exports.login = function (req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      console.log("Error Happened In auth /token Route");
      res.send({message: "Erreur d'authentification"});
      return;
    } 
    
    User.comparePassword(req.body.password, user.password, function(err, isMatch){
        if(isMatch) {
            var payload = {
                _id: user._id,
                role: user.role,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
                };
            var token = jwt.sign(payload, config.jwtSecret);
            res.json({ token: token, role: user.role, id: user.sellerId});
        } else {
            res.status(401).json({msg: "Wrong password" });
        }
    });
  });
};

exports.register = function (req, res) {
    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        sellerId: req.body.sellerId,
      });

    User.createUser(newUser, function(err, User){
        if(err) {
          res.status(401).json({ err: err, msg: "Failed to create User" });
        } else {
          res.send(User).end()  //Pour envoyer les infos entrées
        }
    });
  };
