const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error in movie.router.get', error);
      res.sendStatus(500);
    });
});

router.post('/UPDATE_MOVIE', (req, res) => {
  const qText = 'UPDATE movies SET title=$1, poster=$2, description=$3 WHERE id=$4;';
  //console.log(req.body); // test function
  pool.query(qText, [req.body.title, req.body.poster, req.body.description, req.body.id])
  .then (result => {
    res.send(result.rows);
  })
  .catch (error => {
    console.log('Error in movie.router.update', error);
    res.sendStatus(500);
  });
});

router.delete('/DELETE_MOVIE_AND_GENRE', (req, res) => {
  const qText = `DELETE FROM movies_genres WHERE movie_id=$1;`;
  //console.log(req.body.payload); // test function
  pool.query(qText, [req.body.payload])
  .then( 
    result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('Error in movie.router.delete', error);
    res.sendStatus(500);
  });
});

router.delete('/DELETE_MOVIE', (req, res) => {
  const qText = `DELETE FROM movies WHERE id=$1;`;
  //console.log('trying to delete from movies:', req.body.payload.payload); // test function
  pool.query(qText, [req.body.payload.payload])
  .then( 
    result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('Error in second movie.router.delete', error);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(error => {
        console.log('Error in second movie.router.post', error);
        res.sendStatus(500);
      });
// Catch for first query
  }).catch(error => {
    console.log('Error in first movie.router.post', error);
    res.sendStatus(500);
  });
});

module.exports = router;