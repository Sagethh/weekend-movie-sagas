const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/', (req, res) => {
  const query = `SELECT movie_id, genre_id FROM movies_genres GROUP BY movie_id, genre_id ORDER BY movie_id, genre_id ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movie genres', err);
      res.sendStatus(500)
    })
});

module.exports = router;