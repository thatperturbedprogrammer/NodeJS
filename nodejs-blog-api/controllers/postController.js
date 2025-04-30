const Post = require("../models/Post");

// get All Posts
async function getAllPosts(req, res) {
  const savedPosts = await Post.find({});

  res.json(savedPosts);
}

// get Post by id
async function getPostById(req, res) {
  const savedPost = await Post.findById(req.params.id);
  if (!savedPost) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(savedPost);
}

// post Post
async function createPost(req, res) {
  // 1. get entered post data
  const { postTitle, postBody } = req.body;

  console.log();
  // 2. Create a post with reference to the user
  const post = new Post({
    postTitle,
    postBody,
    // author: user._id,
  });

  const newPost = await post.save();

  console.log(newPost);

  res.status(201).json(newPost);
}

// update Post
async function updatePost(req, res) {
  const { postTitle, postBody } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { postTitle, postBody },
    { new: true }
  );

  res.json(updatedPost);
}

// delete Post
async function deletePost(req, res) {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
}
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
