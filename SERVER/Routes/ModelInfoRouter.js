const express = require('express');
const router = express.Router();
const { getRequest, postRequest } = require('../services/modelInfo/GetModelInfo'); 

// API endpoint to fetch all data from modelInfo
router.get('/', async (req, res) => {
    const queryOption = req.query.queryOption; // Get queryOption from query parameters

    let queryText;
    if (queryOption === 'not-exist') {
        queryText = 'SELECT model_id FROM modelInfo WHERE model_id IS NOT NULL ORDER BY RANDOM() LIMIT 1;'; // Get a random id with null body
    } else if (queryOption === 'max-value') {
        queryText = 'SELECT MAX(model_id)+1 AS model_id FROM modelInfo';    //Get the next id after the current max id
    } else {
        queryText = 'SELECT * FROM modelInfo'; // Default query: Select all
    }

    try {
        const result = await getRequest(queryText); // Fetch all data from table1
        res.json(result); // Send data as JSON response
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to post data
router.post('/', async (req, res) => {
    const { model_id, users, created_time, user_comment } = req.body;

    try {
        const values = [model_id, users, created_time, user_comment];
        const result = await postRequest(values);
        res.status(201).json({ message: 'Model information saved successfully', newModelInfo: result });
    } catch (error) {
        console.error('Error saving model info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
