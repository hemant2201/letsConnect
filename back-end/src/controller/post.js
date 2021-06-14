const Model = require('../Model/index');
const R = require('ramda');

const createPost = async params => {
    const post = new Model.Post({
       content: params.content,
       status: 1,
        userId: params.userId,
        likes: 0,
        photoUrl: params.photoUrl ? params.photoUrl: ""
    });
    return await post.save();
};

const getPostByIds = async params => {
    try {
        const postModel = Model.Post;
        return await postModel.find({_id: { $in:params.postId }, status: 1 }).exec();
    }
    catch(e)
    {
        return {success: false};
    }
};

const updatePost = async params => {
    try{
        const query = {
            _id: params.postId
        };
        R.dissoc('postId', params);
        await Model.User.findOneAndUpdate(query, params,{upsert: true, useFindAndModify: false}).exec();
        return {success: true};
    }
    catch(e)
    {
        return {success: false};
    }
};

const deletePost = async params => {
    const postId = params.postId;
    return await updatePost({
        postId: postId,
        status: 0
    });
};


module.exports = {
    createPost: createPost,
    getPostByIds: getPostByIds,
    updatePost: updatePost,
    deletePost: deletePost
}
