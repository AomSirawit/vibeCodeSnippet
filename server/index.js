const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'codesnippet',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// Routes
app.get('/snippets', (req, res) => {
  const sql = 'SELECT * FROM snippets ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching snippets:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

app.post('/snippets', (req, res) => {
  const { title, code, language } = req.body;

  if (!title || !code || !language) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO snippets (title, code, language) VALUES (?, ?, ?)';
  db.query(sql, [title, code, language], (err, result) => {
    if (err) {
      console.error('Error inserting snippet:', err);
      return res.status(500).json({ error: 'Database insert error' });
    }
    res.status(201).json({
      id: result.insertId,
      title,
      code,
      language,
    });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
