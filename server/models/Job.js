
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Internship", "Full-time", "Part-time"],
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      default: "Not specified",
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    workMode: {
      type: String,
      default: "Not specified",
    },
    applicationInstructions: {
      type: String,
      default: "Apply through CampusConnect.",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
