# 🍽️ TastyKitchen

A full-stack food ordering web application built with the MERN stack. Users can browse restaurants, explore menus, manage a cart, and place orders — with secure authentication and order history saved per user.

**🔗 Live Demo:** [tastykitchenitems.netlify.app](https://tastykitchenitems.netlify.app)
**⚙️ Backend API:** [tastykitchen-backend-m0qr.onrender.com](https://tastykitchen-backend-m0qr.onrender.com)

> Note: the backend is hosted on Render's free tier, so the first request after inactivity may take 30–60 seconds to respond while the server wakes up.

---

## ✨ Features

- 🔐 **User Authentication** — secure registration and login with JWT-based sessions and hashed passwords (bcrypt)
- 🍔 **Browse Restaurants & Menus** — view restaurant listings sorted by rating, and explore detailed menus per restaurant
- 🛒 **Cart Management** — add, increment, and decrement items using Redux Toolkit, with cart state persisted across sessions via localStorage
- 📦 **Order Placement** — checkout flow that saves complete order records (items, quantities, pricing, and the placing user) to the database
- 🧾 **Order History** — every order is linked to the authenticated user, verified server-side via JWT (not trusted from the client)
- 📱 **Responsive Design** — clean, mobile-friendly UI across all pages

---

## 🛠️ Tech Stack

**Frontend**

- React (Vite)
- Redux Toolkit for state management
- React Router for client-side routing
- Axios for API requests

**Backend**

- Node.js + Express
- MongoDB with Mongoose (hosted on MongoDB Atlas)
- JWT for authentication
- bcrypt for password hashing

**Deployment**

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
TastyKitchen/
├── backend/
│   ├── models/          # Mongoose schemas (User, Order, Restaurant, Menu, Banner)
│   ├── index.js          # Express server & API routes
│   └── package.json
└── frontend/
    └── foodweb/
        ├── src/
        │   ├── components/    # React components (login, cart, payment, etc.)
        │   ├── reducers/      # Redux slices
        │   └── localstorage/  # Redux state persistence
        └── package.json
```

---

## 🔑 Key Implementation Details

- **Protected routes**: Sensitive endpoints (like placing an order) require a valid JWT, verified via custom Express middleware before any database write occurs.
- **Server-trusted user identity**: Order records store the user's name and email by looking them up from the verified token — never trusted directly from the client — preventing spoofed orders.
- **Persisted cart state**: Redux state syncs to localStorage, so a user's cart survives page refreshes without needing a backend call.
- **Environment-based configuration**: All secrets (database URI, JWT secret) and environment-specific values (API base URL) are managed via environment variables, kept out of version control.

---

## 🚀 Running Locally

**Backend**

```bash
cd backend
npm install
# Create a .env file with MONGO_URI, JWT_SECRET, and PORT
npm start
```

**Frontend**

```bash
cd frontend/foodweb
npm install
# Create a .env file with VITE_API_URL pointing to your backend
npm run dev
```

---

## 📬 Contact

Built by **Veerendra Prasad** — feel free to reach out or connect!

Linkedin Profile ----"linkedin.com/in/veerendra-prasad-valmiki"
Github Profile ----- "https://github.com/VEERENDRA-5"
Gmail ---valmikiveerendraprasad55@gmail.com
