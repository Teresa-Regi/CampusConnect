
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  RefreshCw,
  Users,
} from "lucide-react";
import "./AdminDashboard.css";

const API_URL = "http://localhost:5000";

const STATUSES = [
  "Pending",
  "Reviewed",
  "Shortlisted",
  "Rejected",
  "Accepted",
];

function AdminDashboard({ token, onBack }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  async function loadApplications() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/applications`, {
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

  useEffect(() => {
    if (token) {
      loadApplications();
    } else {
      setError("Please log in to continue.");
      setLoading(false);
    }
  }, [token]);

  async function updateStatus(applicationId, status) {
    setUpdatingId(applicationId);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update status.");
      }

      setApplications((previous) =>
        previous.map((application) =>
          application._id === applicationId
            ? { ...application, status: data.application.status }
            : application
        )
      );
    } catch (err) {
      setError(err.message || "Unable to update status.");
      await loadApplications();
    } finally {
      setUpdatingId("");
    }
  }

  const pendingCount = applications.filter(
    (application) => application.status === "Pending"
  ).length;

  const shortlistedCount = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;

  return (
    <main className="admin-page">
      <button className="admin-back" onClick={onBack}>
        <ArrowLeft size={17} /> Back to jobs
      </button>

      <section className="admin-heading">
        <span className="admin-eyebrow">CAMPUSCONNECT MANAGEMENT</span>
        <h1>Admin Dashboard</h1>
        <p>Review applications and manage recruitment progress.</p>
      </section>

      <section className="admin-stats">
        <article className="admin-stat-card">
          <span className="admin-stat-icon">
            <Users size={21} />
          </span>
          <div>
            <p>Total applications</p>
            <h2>{applications.length}</h2>
          </div>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-icon pending-icon">
            <BriefcaseBusiness size={21} />
          </span>
          <div>
            <p>Pending review</p>
            <h2>{pendingCount}</h2>
          </div>
        </article>

        <article className="admin-stat-card">
          <span className="admin-stat-icon shortlisted-icon">
            <Users size={21} />
          </span>
          <div>
            <p>Shortlisted</p>
            <h2>{shortlistedCount}</h2>
          </div>
        </article>
      </section>

      <section className="admin-table-section">
        <div className="admin-table-heading">
          <div>
            <h2>Student Applications</h2>
            <p>Review each application and update its status.</p>
          </div>

          <button
            className="admin-refresh"
            onClick={loadApplications}
            disabled={loading}
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {error && <p className="admin-error">{error}</p>}

        {loading ? (
          <p className="admin-message">Loading applications...</p>
        ) : applications.length === 0 && !error ? (
          <p className="admin-message">No student applications found yet.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Applied on</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td>
                      <strong>
                        {application.student?.name || "Unknown student"}
                      </strong>
                      <span className="admin-email">
                        {application.student?.email || "No email"}
                      </span>
                    </td>

                    <td>{application.job?.role || "Job unavailable"}</td>

                    <td>{application.job?.company || "—"}</td>

                    <td>
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <select
                        className="admin-status-select"
                        value={application.status}
                        disabled={updatingId === application._id}
                        onChange={(event) =>
                          updateStatus(
                            application._id,
                            event.target.value
                          )
                        }
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;
