const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => { // gets our movie_id and genre_id from movies_genres and then sorts it by movie id
  const query = `SELECT movie_id, genre_id FROM movies_genres GROUP BY movie_id, genre_id ORDER BY movie_id, genre_id ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows); // sends data back to server
    })
    .catch(error => {
      console.log('Error in first genre.router.get', error);
      res.sendStatus(500);
    });
});

router.get('/GET_GENRES', (req, res) => { // selects everything from genres and orders it
  const query = `SELECT * FROM genres ORDER BY id ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows); // sends data back to server
    })
    .catch(error => {
      console.log('Error in second genre.router.get', error);
      res.sendStatus(500);
    });
});

module.exports = router;