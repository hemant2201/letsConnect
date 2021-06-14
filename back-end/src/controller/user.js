const Model = require("../Model/index");
const R = require("ramda");
const post = require("./post");

const addUser = async (params) => {
  try {
    const user = new Model.User({
      userId: params.userId,
      email: params.email,
      name: params.name,
      photoUrl: params.photoUrl,
      status: 1,
      category: "Normal",
      followers: [],
      following: [],
      timeline: [],
      self: [],
    });
    return await user.save();
  } catch (e) {
    return {
      err: "User not created!",
    };
  }
};

const deleteUser = async (params) => {
  const userId = params.userId;
  return await updateUser({
    userId: userId,
    status: 0,
  });
};

const updateUser = async (params) => {
  try {
    const query = {
      userId: params.userId,
    };
    R.dissoc("userId", params);
    await Model.User.findOneAndUpdate(query, params, {
      upsert: true,
      useFindAndModify: false,
    }).exec();
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

const getUserById = async (params) => {
  try {
    const userModel = Model.User;
    const userId = params.userId;
    return await userModel.find({ userId: userId }).exec();
  } catch (e) {
    return { err: "User Not Found" };
  }
};

const addFollower = async (params) => {
  
  try {
    const followerId = params.userId;
    const followeeId = params.followeeId;
    const userModel = Model.User;

    const isAlreadyFollower = await userModel
      .find({
        userId: followerId,
        followings: followeeId,
      })
      .exec();

    if (!isAlreadyFollower.length) {
      await Promise.all([
        userModel
          .findOneAndUpdate(
            {
              userId: followerId,
            },
            { $push: { followings: followeeId } },
            { useFindAndModify: false }
          )
          .exec(),
        userModel
          .findOneAndUpdate(
            {
              userId: followeeId,
            },
            { $push: { followers: followerId } },
            { useFindAndModify: false }
          )
          .exec(),
      ]);
    }
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

const removeFollower = async (params) => {
  try {
    const followerId = params.userId;
    const followeeId = params.followeeId;
    const userModel = Model.User;

    const isFollower = await userModel
      .find({
        userId: followerId,
        followings: followeeId,
      })
      .exec();

    if (isFollower.length) {
      await Promise.all([
        userModel
          .findOneAndUpdate(
            {
              userId: followerId,
            },
            { $pull: { followings: followeeId } },
            { useFindAndModify: false }
          )
          .exec(),
        userModel
          .findOneAndUpdate(
            {
              userId: followeeId,
            },
            { $pull: { followers: followerId } },
            { useFindAndModify: false }
          )
          .exec(),
      ]);
    }
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

const getFollowers = async (params) => {
  try {
    const userModel = Model.User;
    let userDetails = await getUserById(params);
    userDetails = userDetails.shift()._doc;
    if (userDetails && userDetails.followers && userDetails.followers.length) {
      return await userModel
        .find({ userId: { $in: userDetails.followers }, status: 1 })
        .exec();
    }
    return [];
  } catch (e) {
    return { err: "Error Occurred" };
  }
};

const getFollowings = async (params) => {
  try {
    const userModel = Model.User;
    let userDetails = await getUserById(params);
    userDetails = userDetails.shift()._doc;
    if (
      userDetails &&
      userDetails.followings &&
      userDetails.followings.length
    ) {
      return await userModel
        .find({ userId: { $in: userDetails.followings }, status: 1 })
        .exec();
    }
    return [];
  } catch (e) {
    return { err: "Error Occurred" };
  }
};

const getSuggestedUser = async (params) => {
  try {
    const limit = params.limit | 15;
    let userDetails = await getUserById(params);
    userDetails = userDetails.shift()._doc;
    const suggestedUsers = await Model.User.find({
      userId: {
        $nin: userDetails.followings,
      },
      status: 1,
    })
      .sort({ followers: -1 })
      .limit(limit)
      .exec();
    return suggestedUsers;
  } catch (e) {
    console.log(e);
    return { err: "Error Occurred!" };
  }
};

const addPostInSelf = async (userId, postId) => {
  try {
    const userModel = Model.User;
    const post = await userModel
      .find({
        userId: userId,
        self: postId,
      })
      .exec();
    if (!post.length) {
      await userModel
        .findOneAndUpdate(
          {
            userId: userId,
          },
          { $push: { self: postId } },
          { useFindAndModify: false }
        )
        .exec();
    }
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

const addPostInTimeLine = async (userId, postId) => {
  try {
    const userModel = Model.User;
    let userDetails = await getUserById({ userId });
    userDetails = userDetails.shift()._doc;
    const allPost = [];
    if (userDetails && userDetails.followers && userDetails.followers.length) {
      for (const p of userDetails.followers) {
        allPost.push(
          userModel
            .findOneAndUpdate(
              {
                userId: p,
              },
              { $push: { timeline: postId } },
              { useFindAndModify: false }
            )
            .exec()
        );
      }
    }
    await Promise.all(allPost);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

const getTimeLine = async (userId) => {
  let userDetails = await getUserById(userId);
  userDetails = userDetails.shift()._doc;
  if (userDetails && userDetails.timeline && userDetails.timeline.length) {
    return await post.getPostByIds({ postId: userDetails.timeline });
  }
  return [];
};

const getSelfTimeLine = async (userId) => {
  let userDetails = await getUserById(userId);
  userDetails = userDetails.shift()._doc;
  if (userDetails && userDetails.self && userDetails.self.length) {
    return await post.getPostByIds({ postId: userDetails.self });
  }
  return [];
};

module.exports = {
  addUser: addUser,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUser: deleteUser,
  addFollower: addFollower,
  removeFollower: removeFollower,
  getFollowers: getFollowers,
  getFollowings: getFollowings,
  getSuggestedUser: getSuggestedUser,
  addPostInSelf: addPostInSelf,
  addPostInTimeLine: addPostInTimeLine,
  getTimeLine: getTimeLine,
  getSelfTimeLine: getSelfTimeLine,
};
