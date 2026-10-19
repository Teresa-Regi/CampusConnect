
import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import "./JobDetails.css";

function JobDetails({ job, onBack, onApply }) {
  if (!job) {
    return (
      <main className="job-details-page">
        <button className="details-back-button" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Jobs
        </button>
        <p>Job details are unavailable. Please select a job again.</p>
      </main>
    );
  }

  const responsibilities = job.responsibilities || [];
  const requirements = job.requirements || [];
  const skills = job.skills || [];

  return (
    <main className="job-details-page">
      <div className="details-container">
        <button className="details-back-button" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Jobs
        </button>

        <section className="details-hero">
          <div className="details-company-icon">
            <Building2 size={30} />
          </div>

          <div className="details-heading">
            <span className="details-category">
              {job.category || "Career Opportunity"}
            </span>
            <h1>{job.role}</h1>
            <p className="details-company">{job.company}</p>

            <div className="details-meta">
              <span><MapPin size={16} /> {job.location}</span>
              <span><BriefcaseBusiness size={16} /> {job.type}</span>
              <span><Clock size={16} /> {job.duration || "Not specified"}</span>
            </div>
          </div>

          <button className="details-apply-button" onClick={onApply}>
            Apply Now <ArrowRight size={17} />
          </button>
        </section>

        <div className="details-content-grid">
          <div className="details-main-column">
            <section className="details-section">
              <h2>About this opportunity</h2>
              <p className="details-description">
                {job.description ||
                  "Explore this opportunity and review the requirements before applying."}
              </p>
            </section>

            <section className="details-section">
              <h2>Responsibilities</h2>
              {responsibilities.length > 0 ? (
                <ul className="details-list">
                  {responsibilities.map((item, index) => (
                    <li key={index}>
                      <CheckCircle2 size={17} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="details-muted">
                  Responsibilities have not been specified yet.
                </p>
              )}
            </section>

            <section className="details-section">
              <h2>Requirements and qualifications</h2>
              {requirements.length > 0 ? (
                <ul className="details-list">
                  {requirements.map((item, index) => (
                    <li key={index}>
                      <GraduationCap size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="details-muted">
                  Check with the employer for specific qualifications.
                </p>
              )}
            </section>
          </div>

          <aside className="details-sidebar">
            <section className="details-section">
              <h2>Required skills</h2>
              <div className="details-skills">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span className="details-skill" key={skill}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="details-muted">Skills not specified.</p>
                )}
              </div>
            </section>

            <section className="details-section">
              <h2>Work arrangement</h2>
              <p>{job.workMode || "Not specified"}</p>
            </section>

            <section className="details-section">
              <h2>How to apply</h2>
              <p className="details-description">
                {job.applicationInstructions ||
                  "Apply through CampusConnect."}
              </p>
              <button
                className="details-apply-button details-sidebar-apply"
                onClick={onApply}
              >
                Apply Now <ArrowRight size={17} />
              </button>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default JobDetails;
