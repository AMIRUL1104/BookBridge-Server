import { Router } from "express";

import {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyUser } from "../middleware/role.middleware.js";
const router = Router();

// Create Post
router.post("/", createPost);

// Browse Posts
router.get("/", getAllPosts);

// My Posts
router.get("/my", verifyToken, verifyUser, getMyPosts);

// Single Post
router.get("/:id", getPostById);

// Update Post
router.patch("/:id", updatePost);

// Delete Post
router.delete("/:id", deletePost);

export default router;
