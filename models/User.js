const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z\d_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
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
    ],

},
{ 
    toJSON: {
        virtuals: true,
        getters: true
    },
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;