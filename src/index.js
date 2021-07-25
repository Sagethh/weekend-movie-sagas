import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIES_AND_GENRES', fetchMoviesAndGenres);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('ADD_MOVIE', addMovie)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        //console.log('getting all movies:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    }
    catch {
        console.log('get all error');
    }
}

function* addMovie(movie) {
    try {
        const movieToAdd = movie.payload[0];
        console.log(movieToAdd);
        //const add = yield axios.post('/api/movie');
        yield call (axios.post, '/api/movie', movieToAdd);
        yield put ({type:'FETCH_MOVIES'});
    }
    catch(error) {
        console.log('error in adding movie', error);
    }

}


function* fetchGenres(IDs) {
    try {
        const genre = yield axios.get('/api/genre/genreNames');
        const firstArray = [];
        let sendBack = [];
        for (let x = 0; x < genre.data.length; x++) {firstArray.push(genre.data[x].id);}
        const secondArray = IDs.payload;
        //console.log(firstArray);
        //console.log(secondArray);
        const intersection = firstArray.filter(element => secondArray.includes(element));
        //console.log(intersection);
        for (let i = 0; i < intersection.length; i++) {
            //console.log(intersection[i]);
            //console.log(genre.data[intersection[i]].name);
            sendBack.push(genre.data[intersection[i]-1].name);
        }
        console.log(sendBack);
        yield put ({type: "SET_GENRES", payload: sendBack});
    }
    catch {
        console.log('fetch genres error');
    }
}

function* fetchMoviesAndGenres(movie) {
    try {
        const movies = yield axios.get(`/api/genre`);
        //console.log('movie:', movie.payload);
        let genreIDs = [];
        for (let x = 0; x < movies.data.length; x++) {
            //console.log(movies.data[x].movie_id, movies.data[x].genre_id);
            if (movies.data[x].movie_id == movie.payload.id) {
                genreIDs.push(movies.data[x].genre_id);
            }
        }
        //console.log(`Genre IDs of ${movie.payload.title} are: ${genreIDs}`);
        yield put({ type: 'FETCH_GENRES', payload: genreIDs });
    }
    catch {
        console.log('fetch moves and genres error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            //console.log('setting genre', action.payload)
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
