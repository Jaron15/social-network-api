const {  User, Thought } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reactions: { reactionId: params.reactionId}}},
            { new: true }
        )
        .then(dbuserData => res.json(dbUserData))
        .catch(err => res.json(err))       
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId})
        .then(deletedThought => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found wiht this id! '});
                requestAnimationFrame;
            }
            res.json(dbUserData);
        })
        .catch(dbUserData)
    }
};

module.exports = thoughtController;