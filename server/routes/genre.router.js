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
      console.log('ERROR: Get all movies and their genres', err);
      res.sendStatus(500)
    })
});

router.get('/genreNames', (req, res) => {
  const query = `SELECT * FROM genres ORDER BY id ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500)
    })
});

// router.put('/updateGenres', (req, res) => {
//   const qText = `INSERT INTO "mgenres"`
// })

module.exports = router;