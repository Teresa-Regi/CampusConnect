
import { useEffect, useState } from "react";
import { BriefcaseBusiness, Clock3, MapPin, ArrowLeft } from "lucide-react";
import "./MyApplications.css";

const API_URL = "http://localhost:5000";

function MyApplications({ token, onBack }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch(`${API_URL}/api/applications/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load applications.");
        }

        setApplications(data);
      } catch (err) {
        setError(err.message || "Unable to load applications.");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchApplications();
    } else {
      setError("Please log in to view your applications.");
      setLoading(false);
    }
  }, [token]);

  return (
    <main className="my-applications-page">
      <button className="applications-back" onClick={onBack}>
        <ArrowLeft size={17} /> Back to jobs
      </button>

      <div className="applications-heading">
        <span className="applications-eyebrow">YOUR CAREER JOURNEY</span>
        <h1>My Applications</h1>
        <p>Track the progress of your job applications in one place.</p>
      </div>

      {loading && <p className="applications-message">Loading applications...</p>}

      {!loading && error && (
        <p className="applications-error">{error}</p>
      )}

      {!loading && !error && applications.length === 0 && (
        <section className="applications-empty">
          <BriefcaseBusiness size={38} />
          <h2>No applications yet</h2>
          <p>Explore available opportunities and apply for a job to get started.</p>
          <button className="applications-primary" onClick={onBack}>
            Explore jobs
          </button>
        </section>
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="applications-list">
          {applications.map((application) => {
            const job = application.job;

            return (
              <article
                className="application-card"
                key={application._id}
              >
                <div className="application-card-top">
                  <div className="application-icon">
                    <BriefcaseBusiness size={23} />
                  </div>

                  <div className="application-title">
                    <h2>{job?.role || "Job title unavailable"}</h2>
                    <p>{job?.company || "Company unavailable"}</p>
                  </div>

                  <span
                    className={`application-status ${
                      application.status?.toLowerCase() || "pending"
                    }`}
                  >
                    {application.status || "Pending"}
                  </span>
                </div>

                <div className="application-details">
                  <span>
                    <MapPin size={15} />
                    {job?.location || "Location not specified"}
                  </span>

                  <span>
                    <Clock3 size={15} />
                    Applied{" "}
                    {application.createdAt
                      ? new Date(application.createdAt).toLocaleDateString()
                      : "date unavailable"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default MyApplications;
