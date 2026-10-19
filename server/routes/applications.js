
import express from "express";
import mongoose from "mongoose";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a job application
router.post("/", protect, async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!mongoose.isValidObjectId(jobId)) {
      return res.status(400).json({
        message: "Please select a valid job.",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    const application = await Application.create({
      student: req.user.id,
      job: job._id,
    });

    return res.status(201).json({
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already applied for this job.",
      });
    }

    console.error("Application error:", error.message);

    return res.status(500).json({
      message: "Unable to submit application. Please try again.",
    });
  }
});

// Get the logged-in student's applications
router.get("/my", protect, async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    return res.json(applications);
  } catch (error) {
    console.error("Fetch applications error:", error.message);

    return res.status(500).json({
      message: "Unable to load your applications.",
    });
  }
});

export default router;
