# 🍕 Zomato Clone

A full-stack **Zomato-inspired food discovery platform** featuring Instagram-style video reels for food items, restaurant partner management, and social interactions (like, save, follow). Built with **React + Vite** on the frontend and **Express.js + MongoDB** on the backend.

> **Live Demo:** [zomato-clone-87w6.vercel.app](https://zomato-clone-87w6.vercel.app)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Screenshots & Pages](#-screenshots--pages)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### For Users (Customers)
- 📝 **Register & Login** — Secure cookie-based JWT authentication
- 🎬 **Video Reels Feed** — Scroll through Instagram-style food video reels with auto-play on visibility
- ❤️ **Like / Unlike** — Toggle likes on food items (with like count tracking)
- 🔖 **Save / Unsave** — Bookmark food items to view later
- 📌 **Saved Collection** — View all saved food items in one place
- 👤 **Food Partner Profiles** — View restaurant/partner details and their uploaded food videos
- ➕ **Follow / Unfollow** — Follow your favorite food partners
- 📋 **Following List** — See all food partners you are following

### For Food Partners (Restaurants)
- 🏪 **Partner Registration & Login** — Separate auth flow for restaurant partners
- 🎥 **Upload Food Videos** — Upload short video reels showcasing dishes (supports MP4, WebM, MOV up to 100MB)
- 📊 **Business Profile** — Profile page displaying restaurant info, food items, and stats
- 🔗 **Video Storage** — Videos are stored via **ImageKit CDN** for fast, optimized delivery

### General
- 📱 **Mobile-First Design** — Responsive UI with bottom navigation bar
- 🌐 **CORS Support** — Multi-origin support for local dev and production
- 🚀 **Vercel Deployment** — Both frontend and backend are deployable to Vercel

---

## 🛠 Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 7, TailwindCSS 3, React Router DOM 7, Axios               |
| **Backend**  | Express.js 5, Node.js                                                     |
| **Database** | MongoDB Atlas (via Mongoose 8)                                            |
| **Auth**     | JWT (jsonwebtoken) + HTTP-only cookies, bcrypt password hashing           |
| **Storage**  | ImageKit (video/image CDN upload)                                         |
| **Upload**   | Multer (in-memory storage for video files)                                |
| **Deployment** | Vercel (frontend + backend as serverless functions)                     |

---

## 🏗 Architecture Overview

```
┌──────────────────────┐        HTTPS/REST        ┌──────────────────────────┐
│                      │ ◄──────────────────────── │                          │
│   React Frontend     │                           │   Express.js Backend     │
│   (Vite + Tailwind)  │ ────────────────────────► │   (REST API)             │
│                      │     Cookie (JWT Token)     │                          │
└──────────────────────┘                           └────────┬─────────────────┘
                                                            │
                                                   ┌───────┴────────┐
                                                   │                │
                                              ┌────┴─────┐   ┌─────┴──────┐
                                              │ MongoDB  │   │  ImageKit  │
                                              │ Atlas    │   │  CDN       │
                                              │ (Data)   │   │  (Videos)  │
                                              └──────────┘   └────────────┘
```

---

## 📂 Project Structure

```
zomato/
├── backend/
│   ├── api/
│   │   └── index.js              # Vercel serverless entry point
│   ├── src/
│   │   ├── app.js                # Express app setup, CORS, routes
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # User & Food Partner auth logic
│   │   │   ├── food.controller.js       # Food CRUD, like, save operations
│   │   │   └── food-partner.controller.js # Partner profile & follow toggle
│   │   ├── db/
│   │   │   └── db.js             # MongoDB connection (Mongoose)
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js # JWT verification for users & partners
│   │   ├── models/
│   │   │   ├── user.model.js     # User schema (fullName, email, password, followingFoodPartners)
│   │   │   ├── food.model.js     # Food schema (name, video, description, likeCount, savesCount)
│   │   │   ├── food-part.model.js # Food Partner schema (name, email, address, phone, contactname)
│   │   │   ├── likes.model.js    # Like schema (user ↔ food relationship)
│   │   │   └── save.model.js     # Save/Bookmark schema (user ↔ food relationship)
│   │   ├── routes/
│   │   │   ├── auth.routes.js    # Auth endpoints (user & partner)
│   │   │   ├── food.routes.js    # Food endpoints (CRUD, like, save)
│   │   │   └── food-partner.routes.js # Partner profile & follow endpoints
│   │   └── services/
│   │       └── storage.service.js # ImageKit upload service
│   ├── server.js                 # Local dev entry point
│   ├── vercel.json               # Vercel deployment config
│   ├── package.json
│   └── .env                      # Environment variables (not committed)
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx              # React entry point
│   │   ├── components/
│   │   │   ├── ReelFeed.jsx      # Reusable vertical video reels feed component
│   │   │   └── BottomNav.jsx     # Bottom navigation bar (Home, Saved)
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── HomePage.jsx             # Landing page with hero + video feed CTA
│   │   │   │   ├── FeedPage.jsx             # Full-screen video reels feed
│   │   │   │   ├── UserLoginPage.jsx        # User login form
│   │   │   │   ├── UserRegisterPage.jsx     # User registration form
│   │   │   │   ├── FoodPartnerLoginPage.jsx # Partner login form
│   │   │   │   ├── FoodPartnerRegisterPage.jsx # Partner registration form
│   │   │   │   └── Saved.jsx               # User's saved/bookmarked food items
│   │   │   ├── food-partner/
│   │   │   │   ├── CreateFood.jsx           # Upload new food video (drag & drop)
│   │   │   │   └── Profile.jsx             # Food partner profile with video grid
│   │   │   └── footer/
│   │   │       └── Footer.jsx              # Footer component
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx     # Client-side routing configuration
│   │   └── styles/
│   │       ├── theme.css         # Global theme variables
│   │       ├── auth-shared.css   # Shared auth page styles
│   │       ├── auth.css          # Auth-specific styles
│   │       ├── reels.css         # Video reels feed styles
│   │       ├── bottom-nav.css    # Bottom navigation styles
│   │       ├── create-food.css   # Create food page styles
│   │       └── profile.css       # Partner profile page styles
│   ├── index.html                # HTML entry point
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # TailwindCSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── package.json
│   └── .env                      # Frontend environment variables
│
├── videos/                       # Sample/reference videos
├── .gitignore
└── README.md                     # ← You are here
```

---

## 🗄 Database Schema

### User
| Field                  | Type       | Description                          |
| ---------------------- | ---------- | ------------------------------------ |
| `fullName`             | String     | User's full name (required)          |
| `email`                | String     | Unique email address (required)      |
| `password`             | String     | Bcrypt-hashed password (required)    |
| `followingFoodPartners`| ObjectId[] | Array of food partner IDs followed   |
| `createdAt`            | Date       | Auto-generated timestamp             |
| `updatedAt`            | Date       | Auto-generated timestamp             |

### Food Partner
| Field         | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| `name`        | String | Restaurant/business name (required)      |
| `email`       | String | Unique email address (required)          |
| `password`    | String | Bcrypt-hashed password (required)        |
| `address`     | String | Business address (required)              |
| `contactname` | String | Contact person's name (required)         |
| `phone`       | String | Contact phone number (required)          |

### Food
| Field         | Type     | Description                              |
| ------------- | -------- | ---------------------------------------- |
| `name`        | String   | Dish name (required)                     |
| `video`       | String   | ImageKit video URL (required)            |
| `description` | String   | Description of the dish                  |
| `foodpartner` | ObjectId | Reference to Food Partner who created it |
| `likeCount`   | Number   | Total likes (default: 0)                 |
| `savesCount`  | Number   | Total saves/bookmarks (default: 0)       |
| `createdAt`   | Date     | Auto-generated timestamp                 |

### Like
| Field   | Type     | Description                    |
| ------- | -------- | ------------------------------ |
| `user`  | ObjectId | Reference to User who liked    |
| `food`  | ObjectId | Reference to Food item liked   |

### Save (Bookmark)
| Field   | Type     | Description                    |
| ------- | -------- | ------------------------------ |
| `user`  | ObjectId | Reference to User who saved    |
| `food`  | ObjectId | Reference to Food item saved   |

---

## 📡 API Reference

Base URL: `/api`

### Authentication

| Method | Endpoint                    | Auth     | Description                      |
| ------ | --------------------------- | -------- | -------------------------------- |
| POST   | `/user/register`            | Public   | Register a new user              |
| POST   | `/user/login`               | Public   | Login user (sets JWT cookie)     |
| POST   | `/user/logout`              | Public   | Logout user (clears cookie)      |
| POST   | `/food-partner/register`    | Public   | Register a new food partner      |
| POST   | `/food-partner/login`       | Public   | Login food partner               |
| POST   | `/food-partner/logout`      | Public   | Logout food partner              |
| GET    | `/all/food-partner`         | Public   | Get all food partners            |
| GET    | `/all/following`            | User     | Get food partners user follows   |

### Food Items

| Method | Endpoint         | Auth     | Description                              |
| ------ | ---------------- | -------- | ---------------------------------------- |
| POST   | `/food`          | Partner  | Create food item (multipart: video file) |
| GET    | `/food/public`   | Public   | Get all food items (no auth required)    |
| GET    | `/food`          | User     | Get all food items (authenticated)       |
| POST   | `/food/like`     | User     | Toggle like on a food item               |
| POST   | `/food/save`     | User     | Toggle save/bookmark on a food item      |
| GET    | `/food/save`     | User     | Get all saved food items for user        |

### Food Partner Profiles

| Method | Endpoint                     | Auth   | Description                              |
| ------ | ---------------------------- | ------ | ---------------------------------------- |
| GET    | `/food-partner/:id`          | User   | Get partner profile with food items      |
| POST   | `/food-partner/:id/follow`   | User   | Toggle follow/unfollow a partner         |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB** Atlas account (or local MongoDB instance)
- **ImageKit** account (for video uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zomato-clone.git
cd zomato-clone
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/zomato?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Start the backend server:

```bash
npm start
```

The API will be running at `http://localhost:3000`.

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable                | Description                            |
| ----------------------- | -------------------------------------- |
| `PORT`                  | Server port (default: 3000)            |
| `MONGO_URI`             | MongoDB connection string              |
| `JWT_SECRET`            | Secret key for JWT token signing       |
| `IMAGEKIT_PUBLIC_KEY`   | ImageKit public API key                |
| `IMAGEKIT_PRIVATE_KEY`  | ImageKit private API key               |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint                  |

### Frontend (`frontend/.env`)

| Variable       | Description                                          |
| -------------- | ---------------------------------------------------- |
| `VITE_API_URL` | Backend API base URL (e.g., `http://localhost:3000/api`) |

---

## 🌐 Deployment

### Backend (Vercel)

The backend is configured for Vercel deployment via `vercel.json`:
- Entry point: `api/index.js`
- All routes are forwarded to the serverless function

```bash
cd backend
vercel --prod
```

### Frontend (Vercel)

```bash
cd frontend
npm run build
vercel --prod
```

> **Note:** Update `VITE_API_URL` in the frontend `.env` to point to the deployed backend URL before building.

---

## 📱 Screenshots & Pages

| Page                    | Route                     | Description                                         |
| ----------------------- | ------------------------- | --------------------------------------------------- |
| **Home / Landing**      | `/`                       | Hero section, features showcase, "See all videos" CTA |
| **Video Reels Feed**    | `/feed`                   | Full-screen scrollable video reels with like/save    |
| **User Register**       | `/user/register`          | User sign-up form                                   |
| **User Login**          | `/user/login`             | User login form                                     |
| **Partner Register**    | `/food-partner/register`  | Food partner registration form                      |
| **Partner Login**       | `/food-partner/login`     | Food partner login form                             |
| **Saved Items**         | `/saved`                  | User's bookmarked food items                        |
| **Create Food**         | `/create-food`            | Upload food video with name & description           |
| **Partner Profile**     | `/food-partner/:id`       | Partner details, stats, follow button, video grid   |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Made with ❤️ by <strong>Kunj Vaghani</strong>
</p>
