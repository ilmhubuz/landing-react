#!/usr/bin/env node

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle /register route to serve register.html
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/register.html'));
});

// Handle all other routes with index.html (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 MPA server running on http://localhost:${port}`);
  console.log(`📝 Register page: http://localhost:${port}/register`);
  console.log(`🏠 Home page: http://localhost:${port}/`);
}); 