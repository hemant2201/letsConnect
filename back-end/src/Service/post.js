const c = require("../controller/index");

const createPost = async (params) => {
  const p = await c.post.createPost(params);
  c.user.addPostInTimeLine(params.userId, p.postId);
  c.user.addPostInSelf(params.userId, p.postId);
  return p;
};

module.exports = {
  createPost: createPost,
};
