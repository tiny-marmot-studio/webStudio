// PostgreSQL Connection
const pool = require("../../db");

const getRequest = async (queryText) => {
  const client = await pool.connect();
  try {
      const result = await client.query(queryText);
      return result.rows;
  } finally {
      client.release();
  }
};

const postRequest = async (values) => {
  const queryText = `
      INSERT INTO modelInfo (model_id, users, created_time, user_comment)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (model_id) DO UPDATE
      SET users = EXCLUDED.users,
          created_time = EXCLUDED.created_time,
          user_comment = EXCLUDED.user_comment;
  `;
  const client = await pool.connect();
  try {
      const result = await client.query(queryText, values);
      return result.rows[0];
  } finally {
      client.release();
  }
};

module.exports = {
  getRequest,
  postRequest
};



// API endpoint to fetch all data from modelInfo
// app.get('/modelInfo', async (req, res) => {
//   // Set differnt options of getting data with constraint
//   const queryOption = req.query.queryOption; // Get queryOption from query parameters

//   let queryText;
//   if (queryOption === 'not-exsist') {
//     queryText = 'SELECT model_id FROM modelInfo WHERE model_id IS NOT NULL  ORDER BY RANDOM() LIMIT 1;'; // Get a random id with null body
//   } 
//   else if (queryOption === 'max-value') {
//     queryText = `SELECT MAX(model_id)+1 AS model_id FROM modelinfo`;
//   }
//   else {
//     queryText = 'SELECT * FROM modelInfo'; // Default query: Select all
//   }

//   try {
//     const client = await pool.connect();
//     const result = await client.query(queryText); // Fetch all data from table1
//     client.release(); // Release the client back to the pool
//     res.json(result.rows); // Send data as JSON response
//   } catch (err) {
//     console.error('Error executing query', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // API endpoint to post data 
// app.post('/modelInfo', async (req, res) => {
//     const { model_id, users, created_time, user_comment } = req.body;

//     try {
//         const client = await pool.connect();
//         // SQL update text
//         const queryText = `
//           INSERT INTO modelInfo (model_id, users, created_time, user_comment)
//           VALUES ($1,$2,$3,$4)
//           ON CONFLICT (model_id) DO UPDATE
//           SET users = EXCLUDED.users,
//               created_time = EXCLUDED.created_time,
//               user_comment = EXCLUDED.user_comment;
//         `;
//         const values = [model_id, users, created_time, user_comment];
//         const result = await client.query(queryText, values);
//         client.release(); // Release the client back to the pool

//         res.status(201).json({ message: 'Model information saved successfully', newModelInfo: result.rows[0] });
//     } catch (error) {
//         console.error('Error saving model info:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
