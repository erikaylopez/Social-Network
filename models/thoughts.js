const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal).format('MM/DD/YYYY [at] hh:mm:ss a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal).format('MM/DD/YYYY [at] hh:mm:ss a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const Thoughts = model('Thoughts', ThoughtsSchema);

// get total count of reactions on retrieval
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = Thoughts;