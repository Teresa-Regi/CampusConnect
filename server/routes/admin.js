
import express from "express";
import mongoose from "mongoose";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all student applications (admin only)
router.get("/applications", protect, adminOnly, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "name email")
      .populate("job", "company role location type")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Admin applications error:", error.message);
    res.status(500).json({
      message: "Unable to load student applications.",
    });
  }
});

// Update an application's status (admin only)
router.patch(
  "/applications/:id/status",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { status } = req.body;
      const allowedStatuses = [
        "Pending",
        "Reviewed",
        "Shortlisted",
        "Rejected",
        "Accepted",
      ];

      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: "Invalid application ID.",
        });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid application status.",
        });
      }

      const application = await Application.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );

      if (!application) {
        return res.status(404).json({
          message: "Application not found.",
        });
      }

      res.json({
        message: "Application status updated successfully.",
        application,
      });
    } catch (error) {
      console.error("Update status error:", error.message);
      res.status(500).json({
        message: "Unable to update application status.",
      });
    }
  }
);

export default router;
