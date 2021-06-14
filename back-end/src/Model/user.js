const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    photoUrl: String,
    status: Number,
    category: {
        type:String,
        enum: ['Celebrities', 'Normal']
    },
    updated: {
         type: Date,
        default: Date.now()
        },
    createdAt:
        {
            type: Date,
            default: Date.now()
        },
    followers: [{type: String, ref: 'User'}],
    followings: [{type: String, ref: 'User'}],
    timeline: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    self: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.virtual('followersCount').get(function() {
    return (this.followers && this.followers.length) ? this.followers.length : 0;
});

userSchema.virtual('followingCount').get(function() {
    return (this.followings && this.followings.length) ? this.followings.length : 0;
});

const User = mongoose.model('User',userSchema);

module.exports = User;