//const {ObjectId} = require('mongodb').Types;
const {Thoughts, Users} = require('../models')


//aggregate function to get all thoughts
const thoughtsController = {
    getAllThoughts: async (req, res) => {
        try {
            const dbThoughtData = await Thoughts.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'username',
                        foreignField: 'username',
                        as: 'user'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        thoughtText: 1,
                        username: 1,
                        reactions: 1,
                        user: {
                            $arrayElemAt: ['$user', 0]
                        }
                    }
                }
            ]);
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getThoughtById: async ({ params }, res) => {
        try {
            const dbThoughtData = await Thoughts.findById(params.id);
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
    
    createThought: async ({ body }, res) => {
        try {
            const dbThoughtData = await Thoughts.create(body);
            const dbUserData = await Users.findOneAndUpdate(
                { username: body.username },
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
    }
    ,

    updateThought: async ({ params, body }, res) => {
        try {
            const dbThoughtData = await Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
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

    
    //add reaction

    async addReaction({ params, body }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { reactions: body } },
                { new: true }
            );

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove reaction

    async removeReaction({ params }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    deleteThought: async ({ params }, res) => {
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
    }
};

module.exports = thoughtsController;