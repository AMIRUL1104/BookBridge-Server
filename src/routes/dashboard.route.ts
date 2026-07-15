import { Router } from "express";
import {
  getAdminDashboard,
  getUserDashboard,
} from "../controllers/dashboard.controller.js";

import { verifyAdmin, verifyUser } from "../middleware/role.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const dashboardRouter = Router();

// Admin overview — admin-only
dashboardRouter.get("/admin", verifyToken, verifyAdmin, getAdminDashboard);

// User overview — any authenticated user
dashboardRouter.get("/user", verifyToken, verifyUser, getUserDashboard);

export default dashboardRouter;
