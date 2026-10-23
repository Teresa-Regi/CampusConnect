import JobDetails from "./JobDetails";
import AdminDashboard from "./AdminDashboard";
import MyApplications from "./MyApplications";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import AboutPage from "./pages/AboutPage";
import InternshipsPage from "./pages/InternshipsPage";
import { useEffect, useState } from "react";
import {
  Search,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Clock3,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  Menu,
  X,
  LogOut,
  UserRound,
} from "lucide-react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobError, setJobError] = useState("");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication state
  const [showApplications, setShowApplications] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [authMode, setAuthMode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fetch jobs from MongoDB through the backend
  useEffect(() => {
    fetch(`${API_URL}/api/jobs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load job opportunities.");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setJobError("");
      })
      .catch(() => {
        setJobError(
          "Unable to load jobs. Please check that the backend is running."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      (job.role || "").toLowerCase().includes(searchText) ||
      (job.company || "").toLowerCase().includes(searchText) ||
      (job.location || "").toLowerCase().includes(searchText) ||
      (job.category || "").toLowerCase().includes(searchText) ||
      (job.type || "").toLowerCase().includes(searchText)
    );
  });

  function openAuth(mode) {
    setAuthMode(mode);
    setAuthError("");
    setAuthMessage("");
    setForm({ name: "", email: "", password: "" });
    setMobileMenu(false);
  }

  function closeAuth() {
    setAuthMode("");
    setAuthError("");
    setAuthMessage("");
    setForm({ name: "", email: "", password: "" });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthError("");
    setAuthMessage("");
    setAuthLoading(true);

    const endpoint =
      authMode === "register"
        ? "/api/auth/register"
        : "/api/auth/login";

    const payload =
      authMode === "register"
        ? {
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
          }
        : {
            email: form.email.trim(),
            password: form.password,
          };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      if (authMode === "register") {
        setAuthMessage(
          "Account created successfully! You can now log in."
        );
        setAuthMode("login");
        setForm({
          name: "",
          email: payload.email,
          password: "",
        });
      } else {
        setUser(data.user);
        setToken(data.token);
        closeAuth();
      }
    } catch (error) {
      setAuthError(
        error.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    setUser(null);
    setToken("");
    setAuthMessage("");
    setAuthError("");
  }

  
const handleApplyClick = async (job) => {
  // Students must log in before applying.
  if (!user || !token) {
    openAuth("login");
    return;
  }

  const jobId = job._id || job.id;

if (!jobId) {
  alert("This job does not have a valid ID.");
  return;
}

  try {
    
const response = await fetch(
  `${API_URL}/api/applications`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: jobId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Application failed.");
    }

    alert(data.message);
  } catch (error) {
    alert(error.message || "Unable to submit application.");
  }
};


  return (
    <>
    

{selectedJob ? (
  <JobDetails
    job={selectedJob}
    onBack={() => setSelectedJob(null)}
    onApply={() => {
      const jobToApply = selectedJob;
      setSelectedJob(null);
      handleApplyClick(jobToApply);
    }}
  />
) : showAdminDashboard ? (
  <AdminDashboard
    token={token}
    onBack={() => setShowAdminDashboard(false)}
  />
) : showApplications ? (

  <MyApplications
    token={token}
    onBack={() => setShowApplications(false)}
  />
) : (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <GraduationCap size={25} />
          </span>
          <span>
            Campus<span className="brand-highlight">Connect</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

        
<nav className={mobileMenu ? "nav-links open" : "nav-links"}>
  <a href="/" onClick={(e) => {
    e.preventDefault();
    navigate("/");
    setMobileMenu(false);
  }}>
    Home
  </a>

  <a href="/jobs" onClick={(e) => {
    e.preventDefault();
    navigate("/jobs");
    setMobileMenu(false);
  }}>
    Find Jobs
  </a>

  <a href="/about" onClick={(e) => {
    e.preventDefault();
    navigate("/about");
    setMobileMenu(false);
  }}>
    About
  </a>

  <a href="/internships" onClick={(e) => {
    e.preventDefault();
    navigate("/internships");
    setMobileMenu(false);
  }}>
    Internships
  </a>
</nav>


       
<div className="nav-actions">
  {user ? (
    <>
      <span className="signed-in-user">
        <UserRound size={17} />
        {user.name}
      </span>

      <button
        className="btn btn-outline"
        onClick={() => setShowApplications(true)}
      >
        My Applications
      </button>

      {/* Admin Dashboard button */}
      {user.role === "admin" && (
        <button
          className="btn btn-outline"
          onClick={() => setShowAdminDashboard(true)}
        >
          Admin Dashboard
        </button>
      )}

      <button className="btn btn-outline" onClick={handleLogout}>
        <LogOut size={16} /> Log out
      </button>
    </>
  ) : (
    <>
      <button
        className="btn btn-outline"
        onClick={() => openAuth("login")}
      >
        Log in
      </button>

      <button
        className="btn btn-primary"
        onClick={() => openAuth("register")}
      >
        Get Started <ArrowRight size={16} />
      </button>
    </>
  )}
</div>

      </header>

      
<main>
  {location.pathname === "/about" ? (
    <AboutPage />
  ) : location.pathname === "/jobs" ? (
    <JobsPage
      jobs={jobs}
      loading={loading}
      error={jobError}
      onViewDetails={(job) => setSelectedJob(job)}
      onApply={(job) => handleApplyClick(job)}
      onBack={() => navigate("/")}
    />
  ) : location.pathname === "/internships" ? (
    <InternshipsPage
      jobs={jobs}
      loading={loading}
      error={jobError}
      onViewDetails={(job) => setSelectedJob(job)}
      onApply={(job) => handleApplyClick(job)}
      onBack={() => navigate("/")}
    />
  ) : (
    <>
      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR CAREER JOURNEY STARTS HERE
          </div>

          <h1>
            Your future is
            <br />
            <span>full of possibilities.</span>
          </h1>

          <p className="hero-description">
            Discover internships, explore exciting job opportunities,
            and take the next step toward your dream career.
          </p>

          <form
            className="search-box"
            onSubmit={(event) => {
              event.preventDefault();
              navigate("/jobs");
            }}
          >
            <Search size={21} />
            <input
              type="text"
              placeholder="Job title, company or location"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              className="btn btn-primary search-button"
              type="submit"
            >
              Search Jobs
            </button>
          </form>

          <div className="popular-searches">
            <span>Popular:</span>
            <button type="button" onClick={() => setSearch("Development")}>
              Development
            </button>
            <button type="button" onClick={() => {
              setSearch("Internship");
              navigate("/internships");
            }}>
              Internship
            </button>
            <button type="button" onClick={() => {
              setSearch("Remote");
              navigate("/jobs");
            }}>
              Remote
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-orb orb-one" />
          <div className="visual-orb orb-two" />

          <div className="career-card">
            <div className="career-card-top">
              <div className="career-icon">
                <BriefcaseBusiness size={25} />
              </div>
              <span className="status-pill">Opportunities await</span>
            </div>

            <p className="card-caption">YOUR NEXT CHAPTER</p>
            <h2>Find work that moves you forward.</h2>
            <p className="career-card-description">
              Connect your skills with opportunities that match your ambitions.
            </p>

            <div className="mini-profile">
              <div className="profile-avatars">
                <span>T</span>
                <span>A</span>
                <span>R</span>
              </div>
              <div>
                <strong>Made for students</strong>
                <p>Explore. Apply. Grow.</p>
              </div>
            </div>
          </div>

          <div className="floating-note">
            <span className="floating-note-icon">
              <TrendingUp size={20} />
            </span>
            <div>
              <strong>Start growing</strong>
              <p>Your career, your journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section" id="about">
        <div className="stat-item">
          <span className="stat-icon">
            <BriefcaseBusiness size={21} />
          </span>
          <div>
            <strong>Job Opportunities</strong>
            <p>Explore career openings</p>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">
            <Building2 size={21} />
          </span>
          <div>
            <strong>Company Connections</strong>
            <p>Discover potential employers</p>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">
            <Users size={21} />
          </span>
          <div>
            <strong>Student Focused</strong>
            <p>Built for your next step</p>
          </div>
        </div>
      </section>

      {/* FEATURED OPPORTUNITIES SECTION */}
      <section className="opportunities-section" id="opportunities">
        <div className="section-heading">
          <div>
            <p className="section-label">TAKE THE NEXT STEP</p>
            <h2>Featured opportunities</h2>
            <p className="section-description">
              Explore internships and jobs stored in CampusConnect.
            </p>
          </div>

          <span className="listing-count">
            {filteredJobs.length} opportunities
          </span>
        </div>

        {loading ? (
          <p className="jobs-message">Loading opportunities...</p>
        ) : jobError ? (
          <p className="jobs-message error-message">{jobError}</p>
        ) : filteredJobs.length > 0 ? (
          <div className="job-grid">
            {filteredJobs.map((job) => (
              <article
                className="job-card"
                key={job._id || job.id}
              >
                <div className="job-card-top">
                  <div className={`company-logo ${job.color || "blue"}`}>
                    {(job.company || "?").charAt(0).toUpperCase()}
                  </div>
                  <span className="job-type">{job.type}</span>
                </div>

                <h3>{job.role}</h3>
                <p className="company-name">{job.company}</p>

                <div className="job-details">
                  <span>
                    <MapPin size={15} /> {job.location}
                  </span>
                  <span>
                    <Clock3 size={15} /> {job.duration || "Not specified"}
                  </span>
                </div>

                <div className="job-card-bottom">
                  <span className="category-tag">{job.category}</span>

                  <button
                    className="apply-link"
                    onClick={() => setSelectedJob(job)}
                  >
                    View Details <ArrowRight size={16} />
                  </button>

                  <button
                    className="apply-link"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>No matching opportunities</h3>
            <p>
              Try another job title, company, location or category.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </>
  )}
</main>


      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon"><GraduationCap size={22} /></span>
          <span>Campus<span className="brand-highlight">Connect</span></span>
        </a>
        <p>Connecting students with their next opportunity.</p>
        <span>CampusConnect · Student Placement Portal</span>
      </footer>

      {authMode && (
        <div
          className="auth-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeAuth();
          }}
        >
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
          >
            <button
              type="button"
              className="auth-close"
              onClick={closeAuth}
              aria-label="Close authentication form"
            >
              <X size={21} />
            </button>

            <div className="auth-brand-icon">
              <GraduationCap size={27} />
            </div>

            <p className="section-label">CAMPUSCONNECT ACCOUNT</p>
            <h2 id="auth-title">
              {authMode === "register" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="auth-subtitle">
              {authMode === "register"
                ? "Start discovering opportunities built for you."
                : "Log in to continue your career journey."}
            </p>

            {authMessage && (
              <p className="auth-message success-message" role="status">
                {authMessage}
              </p>
            )}

            {authError && (
              <p className="auth-message error-message" role="alert">
                {authError}
              </p>
            )}

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === "register" && (
                <label>
                  Full name
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleInputChange}
                    maxLength={100}
                    required
                  />
                </label>
              )}

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                  maxLength={254}
                  required
                />
              </label>

              <label>
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete={
                    authMode === "register" ? "new-password" : "current-password"
                  }
                  placeholder={
                    authMode === "register"
                      ? "At least 8 characters"
                      : "Enter your password"
                  }
                  value={form.password}
                  onChange={handleInputChange}
                  minLength={authMode === "register" ? 8 : undefined}
                  maxLength={72}
                  required
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={authLoading}
              >
                {authLoading
                  ? "Please wait..."
                  : authMode === "register"
                    ? "Create account"
                    : "Log in"}
                {!authLoading && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="auth-switch">
              {authMode === "register"
                ? "Already have an account?"
                : "New to CampusConnect?"}{" "}
              <button
                type="button"
                onClick={() => openAuth(
                  authMode === "register" ? "login" : "register"
                )}
              >
                {authMode === "register" ? "Log in" : "Create an account"}
              </button>
            </p>
          </section>
        </div>
      )}
    </div>
    )}
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
