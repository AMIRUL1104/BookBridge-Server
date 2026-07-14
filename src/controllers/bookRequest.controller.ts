import type { Request, Response } from "express";
import { bookRequestsCollection } from "../database/collections.js";
import type { AuthRequest } from "../types/auth.types.js";
import { ObjectId } from "mongodb";

// Send Book Request
export const createBookRequest = async (req: Request, res: Response) => {
  try {
    const postData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await bookRequestsCollection.insertOne(postData);

    res.status(201).json({
      success: true,
      message: "Request Sent Successfully.",
      insertedId: result.insertedId,
      publishedAt: postData.publishedAt,
    });
  } catch (error) {
    console.error("Failed to create post:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create post.",
    });
  }
};

// Get My Sent Requests
export const getSentRequests = async (req: Request, res: Response) => {
  try {
    const requesterId = req.query.requesterId as string;

    if (!requesterId) {
      return res.status(400).json({
        success: false,
        message: "requesterId is required.",
      });
    }

    const requests = await bookRequestsCollection
      .find({
        requesterId,
      })
      .toArray();

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Failed to get sent requests:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get sent requests.",
    });
  }
};

// Get Requests Received On My Posts
export const getReceivedRequests = async (req: Request, res: Response) => {
  try {
    const sellerId = req.query.sellerId as string;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "sellerId is required.",
      });
    }

    const requests = await bookRequestsCollection
      .find({
        sellerId,
      })
      .toArray();

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Failed to get received requests:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get received requests.",
    });
  }
};

// Check Book Request
export const checkBookRequest = async (req: Request, res: Response) => {
  try {
    const { postId, requesterId, sellerId } = req.query;

    if (!postId || !requesterId || !sellerId) {
      return res.status(400).json({
        success: false,
        message: "postId, requesterId and sellerId are required.",
      });
    }

    // User cannot request their own post
    if (requesterId === sellerId) {
      return res.status(200).json({
        success: true,
        canRequest: false,
        reason: "own_post",
      });
    }

    // Check if a request already exists
    const existingRequest = await bookRequestsCollection.findOne({
      postId: postId as string,
      requesterId: requesterId as string,
    });

    if (existingRequest) {
      return res.status(200).json({
        success: true,
        canRequest: false,
        reason: "already_requested",
      });
    }

    return res.status(200).json({
      success: true,
      canRequest: true,
    });
  } catch (error) {
    console.error("Failed to check book request:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check book request.",
    });
  }
};

// Accept Book Request
export const acceptBookRequest = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user!._id;
    const requestId = req.params.id as string;

    const query = {
      sellerId,
      _id: new ObjectId(requestId),
    };

    const update = { $set: { status: "accepted" } };
    const result = await bookRequestsCollection.updateOne(query, update);

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to accept book request.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request Accepted Successfully.",
    });
  } catch (error) {
    console.error("Failed to accept book request:", error);

    res.status(500).json({
      success: false,
      message: "Failed to accept book request.",
    });
  }
};

// Reject Book Request
export const rejectBookRequest = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user!._id;
    const requestId = req.params.id as string;

    const query = {
      sellerId,
      _id: new ObjectId(requestId),
    };
    const update = { $set: { status: "rejected" } };
    const result = await bookRequestsCollection.updateOne(query, update);

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to reject book request.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request Rejected Successfully.",
    });
  } catch (error) {
    console.error("Failed to reject book request:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reject book request.",
    });
  }
};

// Delete / Cancel Book Request
export const deleteBookRequest = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = req.params.id as string;

    const query = {
      _id: new ObjectId(requestId),
    };
    const update = { $set: { status: "cancelled" } };
    const result = await bookRequestsCollection.updateOne(query, update);

    if (result.matchedCount === 0) {
      return res.status(400).json({
        success: false,
        message: " Failed to cancel book request.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request Deleted Successfully.",
    });
  } catch (error) {
    console.error("Failed to delete book request:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete book request.",
    });
  }
};
