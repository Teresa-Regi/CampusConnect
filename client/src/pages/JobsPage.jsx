import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";

function JobsPage({ jobs, loading, error, onViewDetails, onApply, onBack }) {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const text = search.toLowerCase();

    return (
      (job.role || "").toLowerCase().includes(text) ||
      (job.company || "").toLowerCase().includes(text) ||
      (job.location || "").toLowerCase().includes(text) ||
      (job.category || "").toLowerCase().includes(text)
    );
  });

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <button className="btn btn-outline" onClick={onBack}>
        <ArrowLeft size={16} /> Home
      </button>

      <h1 style={{ marginTop: "30px" }}>Find Jobs</h1>
      <p>Explore opportunities and take the next step in your career.</p>

      <div style={{ display: "flex", gap: "10px", margin: "24px 0" }}>
        <Search size={22} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by role, company, location..."
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
          }}
        />
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredJobs.length === 0 ? (
        <p>No matching jobs found. Try another search.</p>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <article className="job-card" key={job._id || job.id}>
              <h3>{job.role}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.type}</p>

              <button
                className="apply-link"
                onClick={() => onViewDetails(job)}
              >
                View Details →
              </button>{" "}

              <button
                className="apply-link"
                onClick={() => onApply(job)}
              >
                Apply Now
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default JobsPage;