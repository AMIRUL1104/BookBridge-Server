import type { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { postsCollection } from "../database/collections.js";

// Create Post
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = req.body;

    const result = await postsCollection.insertOne(post);

    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create post.",
    });
  }
};

// Get All Posts 
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postsCollection
      .find({
        isDeleted: false,
      })
      .sort({ publishedAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch posts.",
    });
  }
};

// Get My Posts . this api serve a seller all posts
export const getMyPosts = async (req: Request, res: Response) => {
  try {
    // Better Auth middleware পরে req.user.id থেকে আসবে
    const sellerId = req.query.sellerId;

    const posts = await postsCollection
      .find({
        sellerId,
        isDeleted: false,
      })
      .sort({ publishedAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch your posts.",
    });
  }
};

// Get Single Post
export const getPostById = async (req: Request, res: Response) => {
  try {
    // const { id } = req.params;
    const id = req.params.id as string;

    const post = await postsCollection.findOne({
      _id: new ObjectId(id),
      isDeleted: false,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch post.",
    });
  }
};

// Update Post
export const updatePost = async (req: Request, res: Response) => {
  try {
    // const { id } = req.params;
    const id = req.params.id as string;
    const updatedPost = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await postsCollection.updateOne(
      {
        _id: new ObjectId(id),
        isDeleted: false,
      },
      {
        $set: updatedPost,
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update post.",
    });
  }
};

// Delete Post (Soft Delete)
export const deletePost = async (req: Request, res: Response) => {
  try {
    // const { id } = req.params;
    const id = req.params.id as string;
    const result = await postsCollection.updateOne(
      {
        _id: new ObjectId(id),
        isDeleted: false,
      },
      {
        $set: {
          isDeleted: true,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete post.",
    });
  }
};