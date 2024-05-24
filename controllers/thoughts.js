const { Thoughts, Users } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find().populate('user');
            res.json(thoughts);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    //get a thought by id
    async getThoughtById({  params }, res) {
        try {
            const thought = await Thoughts.findOne({ _id: params.id }).populate('user');
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    // create a thought
    async createThought({ body }, res) {
        try {
            const thought = await Thoughts.create(body);
            const user = await Users.findOneAndUpdate(

                { _id: body.userId }, // find the user by id
                { $push: { thoughts: thought._id } }, // add thought to user's thoughts array
                { new: true } // return updated user
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    // update a thought by id
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate({ _id: params
                .id }, body, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },


    // delete a thought
    async deleteThought({ params }, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: params.id });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            const user = await Users.findOneAndUpdate(
                { thoughts: params.id },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    // add a reaction to a thought
    async addReaction({ params, body }, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: params.id },
                { $push: { reactions: body } }, // add reaction to thought
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    // remove a reaction from a thought
    async removeReaction({ params }, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: params.id },
                { $pull: { reactions: { reactionId: params.reactionId } } }, // remove reaction from thought
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
};

module.exports = thoughtsController;