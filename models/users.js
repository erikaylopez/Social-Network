const {Schema, model} = require('mongoose');

const userSchema = new Schema( {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

//create the User model using the userSchema
const User = model('User', userSchema);

//total count of comments and replies
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//export the User model
module.exports = User;