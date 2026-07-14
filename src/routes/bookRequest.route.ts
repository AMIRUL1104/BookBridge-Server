import { Router } from "express";
import {
  acceptBookRequest,
  checkBookRequest,
  createBookRequest,
  deleteBookRequest,
  getReceivedRequests,
  getSentRequests,
  rejectBookRequest,
} from "../controllers/bookRequest.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyUser } from "../middleware/role.middleware.js";

const router = Router();

// Send Book Request
router.post("/", verifyToken, verifyUser, createBookRequest);

// My Sent Requests
router.get("/sent", verifyToken, verifyUser, getSentRequests);

// Requests Received On My Posts
router.get("/received", verifyToken, verifyUser, getReceivedRequests);

router.get("/check", checkBookRequest);

// Accept Request
router.patch("/:id/accept", verifyToken, verifyUser, acceptBookRequest);

// Reject Request
router.patch("/:id/reject", verifyToken, verifyUser, rejectBookRequest);

// Cancel/Delete Request
router.patch("/:id/cancel", verifyToken, verifyUser, deleteBookRequest);

export default router;
