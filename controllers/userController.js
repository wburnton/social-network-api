const { Thought, User } = require('../models'); 

module.exports = { 
    getUsers(req, res) { 
        User.find() 
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err)); 
    }, 
    getSingleUser(req, res) { 
        User.findOne({_id: req.params.userId })
            
    }
}