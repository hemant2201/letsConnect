const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    content: String,
    status: Number,
    likes: { type: Number, default: 0 },
    userId:{ type: String },
    photoUrl: { type: String, required: false},
    createdAt:
        { type: Date,  default: Date.now() }
});

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

postSchema.virtual('postId').get(function() {
    return this._id;
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
