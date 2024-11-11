// backend/controllers/postController.js
import Post from '../models/Post.js';
import {cloudinary} from '../server.js';

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const newPost = new Post({
      title,
      excerpt,
      content,
      image: result.secure_url,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      post.image = result.secure_url;
    }

    post.title = title;
    post.excerpt = excerpt;
    post.content = content;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
