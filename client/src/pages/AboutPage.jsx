import { GraduationCap, Target, Users, BriefcaseBusiness } from "lucide-react";

function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#1e293b" }}>
      <header style={{ padding: "24px 8%", background: "#ffffff" }}>
        <h2 style={{ color: "#2563eb", margin: 0 }}>
          <GraduationCap size={26} style={{ verticalAlign: "middle" }} />{" "}
          CampusConnect
        </h2>
      </header>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px" }}>
        <p style={{ color: "#2563eb", fontWeight: "600" }}>
          ABOUT CAMPUSCONNECT
        </p>

        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: "20px" }}>
          Connecting students with their next opportunity.
        </h1>

        <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#64748b" }}>
          CampusConnect is a student-focused career portal that brings job
          opportunities, internships, and application tracking together in one
          place. It helps students explore career options and manage their
          applications through a simple, accessible platform.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <Feature
            icon={<Target size={28} />}
            title="Our Mission"
            description="Help students discover opportunities that support their career goals."
          />

          <Feature
            icon={<BriefcaseBusiness size={28} />}
            title="Career Opportunities"
            description="Explore job listings and internships from one convenient platform."
          />

          <Feature
            icon={<Users size={28} />}
            title="Student Focused"
            description="Make it easier to apply for opportunities and track application progress."
          />
        </div>
      </main>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <article
      style={{
        background: "#ffffff",
        padding: "28px",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
      }}
    >
      <div style={{ color: "#2563eb", marginBottom: "16px" }}>{icon}</div>
      <h3>{title}</h3>
      <p style={{ color: "#64748b", lineHeight: 1.7 }}>{description}</p>
    </article>
  );
}

export default AboutPage;