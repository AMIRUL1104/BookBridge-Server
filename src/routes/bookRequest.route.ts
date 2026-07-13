import { Router } from "express";
import {
  acceptBookRequest,
  createBookRequest,
  deleteBookRequest,
  getReceivedRequests,
  getSentRequests,
  rejectBookRequest,
} from "../controllers/bookRequest.controller.js";

const router = Router();

// Send Book Request
router.post("/", createBookRequest);

// My Sent Requests
router.get("/sent", getSentRequests);

// Requests Received On My Posts
router.get("/received", getReceivedRequests);

// Accept Request
router.patch("/:id/accept", acceptBookRequest);

// Reject Request
router.patch("/:id/reject", rejectBookRequest);

// Cancel/Delete Request
router.delete("/:id", deleteBookRequest);

export default router;
