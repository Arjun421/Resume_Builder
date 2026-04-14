# Resume Builder

A full-stack resume builder application that allows users to create, customize, and download professional resumes with multiple templates and color themes.

## Live Demo

- **Frontend**: [Vercel](https://your-app.vercel.app)
- **Backend**: [Render](https://resume-builder-0q2r.onrender.com)

## Features

- **User Authentication** — Register, login with JWT-based auth
- **3 Resume Templates** — Classic sidebar, Modern dark, Clean minimal
- **Color Palettes** — Multiple color themes per template
- **Step-by-step Form** — Profile, Contact, Experience, Education, Skills, Projects, Certifications, Languages, Interests
- **Live Preview** — Real-time resume preview as you fill in details
- **PDF Download** — One-click download via browser print
- **Profile Photo Upload** — Upload and display profile photo
- **Save & Exit** — Resume data persists in MongoDB

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- React Hot Toast
- React To Print

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- CORS

## Project Structure

```
ResumeBuilder/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Auth & upload middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   └── server.js
│
└── frontend/resume-builder/
    ├── src/
    │   ├── assets/          # Template thumbnails
    │   ├── components/      # Reusable components
    │   │   ├── Cards/
    │   │   ├── Inputs/
    │   │   ├── ResumeTemplates/
    │   │   └── ResumeSections/
    │   ├── pages/
    │   │   ├── Auth/        # Login, Signup
    │   │   ├── Home/        # Dashboard
    │   │   └── ResumeUpdate/ # Edit resume + forms
    │   ├── context/         # User context
    │   └── utils/           # API paths, axios instance
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend/resume-builder
npm install
```

Create `frontend/resume-builder/.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |
| POST | `/api/resume` | Create resume |
| GET | `/api/resume` | Get all resumes |
| GET | `/api/resume/:id` | Get resume by ID |
| PUT | `/api/resume/:id` | Update resume |
| DELETE | `/api/resume/:id` | Delete resume |

## Deployment

**Backend → Render**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`
- Environment Variables: `MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`

**Frontend → Vercel**
- Root Directory: `frontend/resume-builder`
- Framework: Vite
- Environment Variables: `VITE_API_URL`

## License

MIT
