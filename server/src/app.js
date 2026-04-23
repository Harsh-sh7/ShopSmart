const express = require('express');
const cors = require('cors');

const app = express();

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Root Route (optional, just to show something)
app.get('/', (req, res) => {
  res.send('ShopSmart Backend Service');
});

// Fallback for SPA routing: send index.html for any unknown routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

module.exports = app;
