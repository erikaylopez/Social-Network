const {Thoughts, Users} = require('../models');

module.exports = {

//create a thought

async createThought({params, body}, res) {
    try {
        const dbThoughtData = await Thoughts.create(body);
        const dbUserData = await Users.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        );
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//get all thoughts

async getAllThoughts(_, res) { 
    try {
        const dbThoughtData = await Thoughts.find({});
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//get one thought by id

async getThoughtById({ params }, res) {
    try {
        const dbThoughtData = await Thoughts.findOne({ _id: params.id });
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//update a thought by id

async updateThought({ params, body }, res) {
    try {
        const dbThoughtData = await Thoughts.findOneAndUpdate({ _id: params.id }, body
        , { new: true, runValidators: true });
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//delete a thought

async deleteThought({ params }, res) {
    try {
        const dbThoughtData = await Thoughts.findOneAndDelete({ _id: params.id });
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

//add a reaction to a thought

    addReaction ({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

//delete a reaction from a thought
    
        deleteReaction({ params }, res) {
            Thoughts.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
        },

};



