# FlyRank BE-03 Auth API

A secure API that handles user authentication (Sign Up, Log In, Log Out) and protects specific routes using Supabase JWT verification. This project acts as the "guard tower" demonstrating modern web security using Identity Providers (IdP).

## 🚀 Setup & Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   > **Note:** Make sure to supply your own `SUPABASE_URL` and `SUPABASE_KEY` values if you are cloning this repository. (Check Supabase Dashboard -> Project Settings -> API)

3. Start the server:
   ```bash
   npm start
   # or run in dev mode:
   npm run dev
   ```
   The server will start at `http://localhost:3000`.

## 📖 API Endpoints

| Method | Endpoint               | Requires Auth | Description                                                |
|--------|------------------------|---------------|------------------------------------------------------------|
| POST   | `/auth/signup`         | ❌ No          | Create a new user account with email and password          |
| POST   | `/auth/login`          | ❌ No          | Authenticate and receive a Bearer Token (JWT)              |
| POST   | `/auth/logout`         | ✅ Yes         | Terminate the current user session (requires valid token)  |
| GET    | `/public/info`         | ❌ No          | Retrieve public, unprotected data                          |
| GET    | `/protected/profile`   | ✅ Yes         | Retrieve private user profile data (requires valid token)  |
| GET    | `/protected/dashboard` | ✅ Yes         | Another secure route protected by reusable Middleware      |

## 🛡️ Swagger UI

Swagger documentation with Bearer Auth configuration is available at:
**[http://localhost:3000/docs](http://localhost:3000/docs)**

> **Screenshot Placeholder:**
> *(Replace this block with your own screenshot of Swagger UI showing the locked routes)*
> ![Swagger UI Screenshot](swagger.png)

## 💡 AI vs Me (Bonus)

If you completed Stage 7, write your reflection here:
- **Token Extraction:** ...
- **Security Flaws (if any):** ...
- **Assumptions made by AI:** ...
