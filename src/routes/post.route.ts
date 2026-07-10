import { Router } from "express";

import {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = Router();

// Create Post
router.post("/", createPost);

// Browse Posts
router.get("/", getAllPosts);

// My Posts
router.get("/my", getMyPosts);

// Single Post
router.get("/:id", getPostById);

// Update Post
router.patch("/:id", updatePost);

// Delete Post
router.delete("/:id", deletePost);

export default router;