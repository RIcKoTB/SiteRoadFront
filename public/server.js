const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// CORS Configuration: Allowing both frontend and API server addresses
app.use(cors({
  origin: (origin, callback) => {
      console.log('Origin attempting access:', origin);  // Додати це для дебагінгу
      if (!origin) return callback(null, true);
      if (['http://localhost:3000', 'http://127.0.0.1:8000'].indexOf(origin) === -1) {
          var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          console.error(msg, origin);  // Логувати помилку з джерелом
          return callback(new Error(msg), false);
      }
      return callback(null, true);
  },
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
}));


// Middleware for parsing application/json
app.use(express.json());

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serving static files from 'public' directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Example of an API route
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from the API!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
