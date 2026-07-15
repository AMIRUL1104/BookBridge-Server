// src/controllers/dashboard.controller.ts

import type { Response } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import {
  getAdminDashboardData,
  getUserDashboardData,
} from "../database/dashboard.database.js";

// GET /api/dashboard/admin
// Only accessible by users with role = "admin" (enforced by requireAdmin middleware)
export const getAdminDashboard = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const data = await getAdminDashboardData();
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error("[AdminDashboard] Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch admin dashboard data" });
  }
};

// GET /api/dashboard/user
// Only accessible by authenticated users (enforced by requireAuth middleware)
export const getUserDashboard = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user!._id as string;
    const data = await getUserDashboardData(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error("[UserDashboard] Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch user dashboard data" });
  }
};
