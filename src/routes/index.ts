import { Router } from "express";

// import userRoutes from "./user.route.js";
import postRoutes from "./post.route.js";
// import bookRequestRoutes from "./bookRequest.route.js";
// import publisherRoutes from "./publisher.route.js";
// import pendingPublisherRoutes from "./pendingPublisher.route.js";

const router = Router();

// API Routes
// router.use("/users", userRoutes);
router.use("/posts", postRoutes);
// router.use("/book-requests", bookRequestRoutes);
// router.use("/publishers", publisherRoutes);
// router.use("/pending-publishers", pendingPublisherRoutes);

export default router;