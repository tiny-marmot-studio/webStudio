const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Enable CORS for all routes

// PostgreSQL Connection
const pool = new Pool({
    user: "postgres",
    password: "mysecretpassword",
    host: "localhost",
    port : "5432",
    database: "postgres"
});

// API endpoint to fetch all data from modelInfo
app.get('/modelInfo', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM modelInfo'); // Fetch all data from table1
    client.release(); // Release the client back to the pool
    res.json(result.rows); // Send data as JSON response
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API endpoint to post data 
app.post('/modelInfo', async (req, res) => {
    const { model_id, users, created_time, user_comment } = req.body;

    try {
        const client = await pool.connect();
        // SQL update text
        const queryText = `
            INSERT INTO modelInfo (model_id, users, created_time, user_comment)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [model_id, users, created_time, user_comment];
        const result = await client.query(queryText, values);
        client.release(); // Release the client back to the pool

        res.status(201).json({ message: 'Model information saved successfully', newModelInfo: result.rows[0] });
    } catch (error) {
        console.error('Error saving model info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
