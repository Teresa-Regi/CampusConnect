import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

function InternshipsPage({
  jobs,
  loading,
  error,
  onViewDetails,
  onApply,
  onBack,
}) {
  const [search, setSearch] = useState("");

  const internships = jobs.filter((job) =>
    (job.type || "").toLowerCase().includes("intern")
  );

  const filteredInternships = internships.filter((job) => {
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

      <h1 style={{ marginTop: "30px" }}>Internship Opportunities</h1>
      <p>Discover internships to develop your skills and gain experience.</p>

      <div style={{ display: "flex", gap: "10px", margin: "24px 0" }}>
        <Search size={22} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search internships..."
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
          }}
        />
      </div>

      {loading ? (
        <p>Loading internships...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredInternships.length === 0 ? (
        <p>No matching internships found.</p>
      ) : (
        <div className="job-grid">
          {filteredInternships.map((job) => (
            <article className="job-card" key={job._id || job.id}>
              <h3>{job.role}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>

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

export default InternshipsPage;