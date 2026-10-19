# CampusConnect — Student Placement & Career Portal

## 1. Project Overview

CampusConnect is a MERN stack web application designed to help students explore career opportunities, view job details, apply for jobs, and track their application statuses. Administrators can review student applications and update their statuses through an admin dashboard.

## 2. Problem Statement

Students often need to search across different sources to discover placement opportunities and track their applications. CampusConnect provides a central platform for browsing opportunities and managing the application process.

## 3. Target Users

### Students
- Register and log in securely.
- Browse job and internship opportunities.
- View detailed job descriptions, skills, and qualifications.
- Apply for opportunities.
- Track their applications and statuses.

### Administrators
- Access the admin dashboard using an authorised admin account.
- View student applications.
- Update application statuses.

## 4. Project Scope

### Implemented Features
- Student registration and login.
- Password hashing and JWT-based authentication.
- MongoDB Atlas database integration.
- Job listings retrieved from the backend API.
- Dedicated job details page.
- Job application submission.
- My Applications page.
- Application status tracking.
- Role-based admin dashboard.
- Admin application review and status updates.
- Sample career opportunities stored in MongoDB.

### Future Improvements
- Deploy the frontend and backend for public access.
- Add advanced job search and filtering.
- Add email notifications for application status changes.
- Add pagination for large job and application lists.
- Improve automated testing and accessibility.

## 5. User Stories and Acceptance Criteria

### Student Registration and Login
**User story:** As a student, I want to register and log in so that I can access placement opportunities.

**Acceptance criteria:**
- A student can register with valid details.
- Passwords are stored as hashes, not plain text.
- A registered student can log in with valid credentials.
- Invalid credentials are rejected.

### Browse Jobs and View Details
**User story:** As a student, I want to browse jobs and view their details so that I can choose suitable opportunities.

**Acceptance criteria:**
- Job listings are retrieved from the backend.
- Each job has a View Details action.
- The details page displays available job information.
- The student can return to the listings.

### Apply for Jobs
**User story:** As a logged-in student, I want to apply for a job and track my application.

**Acceptance criteria:**
- An authenticated student can submit an application.
- Duplicate applications for the same job are prevented.
- Submitted applications appear on the My Applications page.
- Application statuses are displayed.

### Admin Application Management
**User story:** As an administrator, I want to review applications and update their statuses.

**Acceptance criteria:**
- An authorised administrator can access the dashboard.
- The administrator can view student and job information.
- The administrator can update an application's status.
- Normal student accounts cannot access admin-only API operations.

## 6. MERN Stack Architecture

CampusConnect follows the MERN architecture:

- **MongoDB Atlas:** Stores users, jobs, and applications.
- **Express.js:** Provides backend API routes.
- **React.js:** Renders the frontend interface.
- **Node.js:** Runs the backend server.

### Request Flow

1. A user interacts with the React frontend.
2. React sends an HTTP request to the Express API.
3. The backend validates the request and checks authentication where required.
4. Mongoose communicates with MongoDB.
5. The API returns a response.
6. React updates the interface.

## 7. Technology Stack

- React
- Vite
- JavaScript
- HTML and CSS
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Tokens (JWT)
- dotenv
- cors
- lucide-react

## 8. Data Model

### User
- `name`: User's name
- `email`: Unique email address
- `passwordHash`: Hashed password
- `role`: `student` or `admin`
- Timestamps

### Job
- `company`: Company name
- `role`: Job title
- `type`: Internship, Full-time, or Part-time
- `location`: Job location
- `duration`: Duration or employment period
- `category`: Opportunity category
- `description`: Job description
- `requirements`: Qualifications and requirements
- `responsibilities`: Job responsibilities
- `skills`: Required skills
- `workMode`: Work arrangement
- `applicationInstructions`: Application instructions
- Timestamps

### Application
- `student`: Reference to a User
- `job`: Reference to a Job
- `status`: Pending, Reviewed, Shortlisted, Rejected, or Accepted
- Timestamps

## 9. API Contract

Base URL for local development: `http://localhost:5000`

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register an account | Public |
| POST | `/api/auth/login` | Log in | Public |
| GET | `/api/jobs` | Retrieve job listings | Public |
| GET | `/api/jobs/:id` | Retrieve a job by ID | Depends on implemented route |
| POST | `/api/jobs` | Create a job | Admin |
| POST | `/api/applications` | Submit an application | Authenticated |
| GET | `/api/applications/my` | View the current student's applications | Authenticated |
| GET | `/api/admin/applications` | View all applications | Admin |
| PATCH | `/api/admin/applications/:id/status` | Update an application status | Admin |

Protected endpoints use a bearer JWT in the Authorization header. Request validation and access control are handled by the backend.

## 10. Project Structure

```text
CampusConnect/
├── client/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── JobDetails.jsx
│       ├── JobDetails.css
│       ├── MyApplications.jsx
│       ├── MyApplications.css
│       ├── AdminDashboard.jsx
│       └── AdminDashboard.css
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Application.js
│   │   ├── Job.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── applications.js
│   │   └── auth.js
│   ├── seedJobs.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## 11. Add Sample Jobs

From the `server` folder, run:

```bash
node seedJobs.js
```

The script adds the sample opportunities that are not already present.

## 12. Security and Privacy

- Passwords are hashed using bcryptjs.
- JWTs are used for authenticated requests.
- Protected backend routes check authentication.
- Admin routes check the user's role.
- Environment variables hold database connection details and the JWT secret.
- Real environment files and secrets must not be committed to GitHub.
- The public registration route assigns the student role rather than allowing users to select admin privileges.

## 13. Testing

The following functional checks have been performed during development:

- Student registration and login.
- Retrieval of job listings.
- Job details navigation and returning to the listings.
- Job application submission.
- Viewing submitted applications.
- Admin dashboard access.
- Updating application statuses.
- Student and admin role-based access checks.

Automated test coverage and production deployment checks remain future improvements unless separately completed.

## 14. Limitations

- Sample job opportunities are demonstration data and are not verified live vacancies.
- The application currently uses local development URLs unless separately configured for deployment.
- Email notifications and advanced job filtering are not implemented.
- Production deployment and production security configuration must be completed before public use.

## 15. Future Scope

- Deploy the React frontend and Express API.
- Add search, filters, and pagination.
- Add email notifications.
- Improve automated API and integration testing.
- Add analytics for application trends.
- Improve accessibility and mobile usability.

## 16. Project Links

- GitHub Repository: https://github.com/Teresa-Regi/CampusConnect.git


## 17. Acknowledgement

This project was developed as part of a MERN stack learning assignment. It applies frontend development, REST API integration, database modelling, authentication, authorisation, and version control concepts.
