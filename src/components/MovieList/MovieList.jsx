import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieItem from '../MovieItem/MovieItem';
import Grid from '@material-ui/core/Grid';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => { // update movies whenever MovieList is loaded
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return ( // main return, what will be shown on the DOM
        <main>
            <h1>Movie List</h1>
            <section className="movies">
                <Grid container spacing={5}>
                    {movies.map(movie => {
                        return (
                            <MovieItem key={movie.id} movie={movie} />
                        )
                    })}
                </Grid>
            </section>
        </main>
    );
};

export default MovieList;