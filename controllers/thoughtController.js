const { Thought, User} = require('../models'); 

module.exports = { 
    getThoughts(req, res) { 
        Thought.find() 
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    }, 
    getSingleThought(req,res) { 
        Thought.findOne({_id: req.params.thoughtId}) 
            .then((thought) => 
                !thought 
                    ? res.status(404).json({ message: 'No thought with this ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }, 
    createThought(req,res) { 
        Thought.create(req.body) 
            .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
              );
            }
            )
        
            .then((thought) => 
                res.json(thought))
            .catch((err) => { 
                console.log(err); 
                return res.status(500).json(err);
            })
    }, 

    updateThought(req, res) { 
        Thought.findOneAndUpdate( 
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        ) 
        .then((thought) => 
            !thought 
                ? res.status(404).json({ message: 'No thought with this ID'})
                : res.json(thought)
        ) 
        .catch ((err) => res.status(500).json(err));
    }, 

    deleteThought(req, res) { 
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) => 
                !thought 
                    ? res.status(404).json ({ message: 'No thought with this ID'})
                    : res.json(thought)
            ) 
            .catch ((err) => res.status(500).json(err)); 

    }, 
    createReaction(req, res) { 
        Thought.findOneAndUpdate( 
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true } 
        ) 
        .then((reaction) => 
            !reaction 
                ? res.status(404).json({ message: 'Reaction unable to be created :/'}) 
                : res.json(reaction) 
            ) 
        .catch ((err) => res.status(500).json(err));
    }, 
    deleteReaction(req, res) { 
        Thought.findOneAndDelete( 
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.body.reactionId } } },
            { new: true }
        ) 
            .then((reaction) => 
            !reaction 
                ? res.status(404).json({ message: 'Reaction unable to be created :/'}) 
                : res.json(reaction)
            ) 
            .catch ((err) => res.status(500).json(err));
    },
}