const express = require('express');
const router = express.Router();

// POSTGRESQL SETUP
const pg = require('pg');
const Pool = pg.Pool;
const config = {
  database: 'message_board', // name of database
  host: 'localhost',
  port: 5432,
  max: 10, // max number of concurrent connections
  idleTimeoutMillis: 10000 // attepmt to connect for 10 seconds
};

const pool = new Pool(config);
pool.on('connect', () => console.log('postgresql connected!!!'));
pool.on('error', error => console.log('Error connecting to db', error));

// '/messages' ROUTES

// GET ALL MESSAGES
router.get('/', (req, res) => {
  console.log('/messages GET hit');
  const queryText = `SELECT * FROM "messages";`;
  pool.query(queryText)
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log('DB Query Error:', error);
      res.sendStatus(500);
    });
});

// ADD NEW MESSAGE
router.post('/', (req, res) => {
  const messageToAdd = req.body; // This the data we sent
    console.log('/messages POST hit:', messageToAdd); // Has a name, size and cost
    const queryText = 'INSERT INTO "messages" ("name", "message") VALUES ($1, $2);';
    pool.query(queryText, [messageToAdd.name, messageToAdd.message])
      .then(() => res.sendStatus(201))
      .catch(error => {
        console.log('Error in POST:', error);
        res.sendStatus(500);
    });
});

module.exports = router;