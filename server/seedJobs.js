
import "dotenv/config";
import mongoose from "mongoose";
import Job from "./models/Job.js";

const sampleJobs = [
  {
    company: "TechNova Solutions",
    role: "Frontend Developer Intern",
    type: "Internship",
    location: "Bengaluru, India",
    duration: "3 months",
    category: "Web Development",
    description:
      "Learn to build responsive, accessible, and modern web applications with an experienced development team.",
    responsibilities: [
      "Build responsive user interfaces.",
      "Work with developers to integrate APIs.",
      "Test and improve website usability.",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript.",
      "Interest in learning React.",
      "Willingness to work in a team.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "React"],
    workMode: "Hybrid",
    applicationInstructions:
      "Submit your application through CampusConnect with your resume and project links.",
  },
  {
    company: "DataBridge Analytics",
    role: "Data Analyst Intern",
    type: "Internship",
    location: "Kochi, India",
    duration: "3 months",
    category: "Data Science",
    description:
      "Support data analysis projects by cleaning datasets, finding patterns, and preparing useful reports.",
    responsibilities: [
      "Clean and organise datasets.",
      "Create charts and reports.",
      "Help the team identify trends in data.",
    ],
    requirements: [
      "Basic programming or spreadsheet knowledge.",
      "Interest in data analysis.",
      "Good problem-solving skills.",
    ],
    skills: ["Python", "SQL", "Excel", "Data Visualisation"],
    workMode: "On-site",
    applicationInstructions:
      "Apply through CampusConnect and include relevant coursework or projects.",
  },
  {
    company: "SecureNet Labs",
    role: "Cybersecurity Intern",
    type: "Internship",
    location: "Hyderabad, India",
    duration: "6 months",
    category: "Cybersecurity",
    description:
      "Gain supervised experience in security monitoring, vulnerability assessment, and network security fundamentals.",
    responsibilities: [
      "Assist with authorised security assessments.",
      "Review basic security alerts.",
      "Document findings and recommendations.",
    ],
    requirements: [
      "Understanding of basic networking concepts.",
      "Interest in cybersecurity and ethical practices.",
      "Willingness to learn Linux fundamentals.",
    ],
    skills: ["Networking", "Linux", "Python", "Security Fundamentals"],
    workMode: "Hybrid",
    applicationInstructions:
      "Apply through CampusConnect with your resume and any relevant learning projects.",
  },
  {
    company: "PixelCraft Studio",
    role: "UI/UX Design Intern",
    type: "Internship",
    location: "Remote, India",
    duration: "3 months",
    category: "Design",
    description:
      "Help design clear, accessible digital experiences by creating wireframes, prototypes, and interface layouts.",
    responsibilities: [
      "Create wireframes and prototypes.",
      "Assist with user interface design.",
      "Collaborate with developers on design handoff.",
    ],
    requirements: [
      "Interest in user-centred design.",
      "Basic design or prototyping knowledge.",
      "A willingness to explain design decisions.",
    ],
    skills: ["Figma", "Wireframing", "Prototyping", "UI Design"],
    workMode: "Remote",
    applicationInstructions:
      "Apply through CampusConnect and include a portfolio if available.",
  },
  {
    company: "CloudPeak Systems",
    role: "Junior Backend Developer",
    type: "Full-time",
    location: "Chennai, India",
    duration: "Full-time role",
    category: "Software Development",
    description:
      "Contribute to server-side applications, REST APIs, and database-backed services as part of a development team.",
    responsibilities: [
      "Develop and maintain REST APIs.",
      "Work with databases and server-side code.",
      "Help test, debug, and document services.",
    ],
    requirements: [
      "Fundamental knowledge of programming.",
      "Understanding of APIs and databases.",
      "Willingness to learn and collaborate.",
    ],
    skills: ["JavaScript", "Node.js", "Express", "MongoDB"],
    workMode: "On-site",
    applicationInstructions:
      "Apply through CampusConnect with your resume and relevant project details.",
  },
];

async function seedJobs() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from your server/.env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    let added = 0;
    let skipped = 0;

    for (const jobData of sampleJobs) {
      const existingJob = await Job.findOne({
        company: jobData.company,
        role: jobData.role,
      });

      if (existingJob) {
        console.log(`Skipped existing job: ${jobData.role}`);
        skipped++;
        continue;
      }

      await Job.create(jobData);
      console.log(`Added: ${jobData.role}`);
      added++;
    }

    console.log(`Finished. Added: ${added}; skipped: ${skipped}.`);
  } catch (error) {
    console.error("Could not seed jobs:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedJobs();
