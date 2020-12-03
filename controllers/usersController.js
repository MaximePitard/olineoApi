const User = require('../models/User.model.js')

exports.getUsers = (req,res) => {
    User.find()
        .then(users => res.status(200).json({ users }))
        .catch(error => res.status(400).json({ error }));
}