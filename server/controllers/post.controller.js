import Post from "../models/post.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const getPosts = async (req, res) => {
  try {
    const topic = req.query.topic;

    let filters = {};

    if (topic) {
      filters.topic = topic;
    }

    const posts = await Post.find(filters);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};



export const addPost = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);

    const { title, desc, image, topic } = req.body;

    if (!title || !desc || !image) {
      return res.status(400).json("All fields are required!");
    }

    const newPost = new Post({
      title,
      desc,
      image,
      topic,
      author: {
        name: decoded.name,
        username: decoded.username,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    res.status(200).json({ message: "File uploaded successfully", file: req.file.originalname });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};


export const singlePost = async (req, res)=>{
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}

export const getImage = (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename);

    res.sendFile(filepath, (err) => {
      if (err) {
        res.status(404).json({ message: 'Image not found' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

export const deletePost = async(req, res)=>{
  try {
    const postId = req.params.id;
    const deletepost = await Post.findByIdAndDelete(postId)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}

export const editPost = async (req, res) => {
  try {
    const postId = req.query.id; // Assuming you have a route parameter for post ID
    console.log(postId)

    // Send a success response
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};





