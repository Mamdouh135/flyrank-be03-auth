require('dotenv').config();
const express = require('express');
const supabase = require('./supabase');
const { requireAuth } = require('./middleware');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Setup Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Auth Routes ---

// Stage 1: Sign Up
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data.user);
});

// Stage 1: Log In
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  // Returns session including access_token and refresh_token
  return res.status(200).json(data.session);
});

// Stage 4: Log Out
app.post('/auth/logout', requireAuth, async (req, res) => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    return res.status(500).json({ error: "Failed to sign out" });
  }

  return res.status(204).send();
});

// --- Public & Protected Routes (Stage 2, 3, 4) ---

// Public route
app.get('/public/info', (req, res) => {
  return res.status(200).json({ message: "Welcome stranger! This info is public." });
});

// Protected route (requires token)
app.get('/protected/profile', requireAuth, (req, res) => {
  // requireAuth attaches the verified user to req.user
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at
  });
});

// Another protected route to verify middleware
app.get('/protected/dashboard', requireAuth, (req, res) => {
  return res.status(200).json({ message: "Welcome to your secure dashboard." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running and connected to Supabase on http://localhost:${PORT}`);
  console.log(`📖 Swagger UI available at http://localhost:${PORT}/docs`);
});
