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


// get route params with "/route/:paramName, then reference it as req.params.paramName"
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

router.put('/:id', (req, res) => {
  /* 
  Model.findOne({_id: req.params.id})
    .then(foundModel => {
      //alter model then save in database
    }).catch(error => res.sendStatus(500));
  */

  // POSTGRESQL SAMPLE PUT
  //  const updatedShoe = req.body;
  //  const queryText = `UPDATE "shoes" 
  //                     SET "name" = $1, "cost" = $2, "size" = $3
  //                     WHERE "id" = $4;`;
  //  pool.query(queryText, [updatedShoe.name,
  //                         updatedShoe.cost, 
  //                         updatedShoe.size, 
  //                         updatedShoe.id]).then( (result) => {
  //                             res.sendStatus(200);
  //                         }).catch( (error) => {
  //                             res.sendStatus(500);
  //                         });
});

router.delete('/:id', (req, res) => {
  // Model.findByIdAndRemove(req.params.id)
  //  .then(response => res.sendStatus(201))
  //  .catch(() => res.sendStatus(500));

  // POSTGRESQL SAMPLE DELETE
  // const idOfShoeToDelete = req.params.id;
  //   console.log('deleting ', idOfShoeToDelete);
  //   const queryText = 'DELETE FROM "shoes" WHERE "id" = $1;';
  //   pool.query(queryText, [idOfShoeToDelete]).then((result) => {
  //       res.sendStatus(200);
  //   }).catch( (error) => {
  //       console.log('Error in delete', error);
  //       res.sendStatus(500);
  //   });
});

module.exports = router;