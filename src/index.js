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
    yield takeEvery('DELETE_MOVIES_GENRES', deleteMoviesGenres);
    yield takeEvery('DELETE_MOVIE', deleteMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        //console.log('getting all movies:', movies.data); // test function
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    }
    catch(error) {
        console.log('get all error', error);
    };
};

function* deleteMoviesGenres(movie) {
    //console.log('trying to delete movie with ID:', movie); // test function
    const movieToDelete = movie;
   
    try {
        const response = yield axios({
        method: 'DELETE',
        url: '/api/movie/DELETEMOVIEANDGENRE',
        data: movieToDelete
        });
        //console.log(response); // test function
       // yield call (axios.delete, '/api/movie/delete', movieToDelete); // test function
       // yield put ({type: 'DELETE_MOVIE', payload: movieToDelete}); // test function
       yield put({type: "DELETE_MOVIE", payload: movie})
    }
    catch(error) {
        console.log('delete movie error', error);
    };
};

function* deleteMovie(movie) {
    console.log('trying to delete movie with ID:', movie);
    const movieToDelete = movie;
    try {
        const response = yield axios({
        method: 'DELETE',
        url: '/api/movie/DELETEMOVIE',
        data: movieToDelete
        });
        console.log(response);
       // yield call (axios.delete, '/api/movie/delete', movieToDelete);
       // yield put ({type: 'DELETE_MOVIE', payload: movieToDelete});
       yield put({type: "FETCH_MOVIES"})
    }
    catch(error) {
        console.log('delete movie error', error);
    };
};

function* addMovie(movie) {
    try {
        const movieToAdd = movie.payload[0];
        console.log(movieToAdd);
        //const add = yield axios.post('/api/movie'); // test function
        yield call (axios.post, '/api/movie', movieToAdd);
        yield put ({type:'FETCH_MOVIES'});
    }
    catch(error) {
        console.log('error in adding movie', error);
    };
};

function* fetchGenres(IDs) {
    try {
        const genre = yield axios.get('/api/genre/genreNames');
        const firstArray = [];
        let sendBack = [];
        for (let x = 0; x < genre.data.length; x++) {firstArray.push(genre.data[x].id);}
        const secondArray = IDs.payload;
        //console.log(firstArray); // test function
        //console.log(secondArray); // test function
        const intersection = firstArray.filter(element => secondArray.includes(element)); // filters through both arrays and looks for matching IDs
        //console.log(intersection);
        for (let i = 0; i < intersection.length; i++) {
            //console.log(intersection[i]); // test function
            //console.log(genre.data[intersection[i]].name); // test function
            sendBack.push(genre.data[intersection[i]-1].name); // pushes matching 
        };
        // console.log(sendBack); // test function
        yield put ({type: "SET_GENRES", payload: sendBack});
    }
    catch {
        console.log('fetch genres error');
    };
};

function* fetchMoviesAndGenres(movie) {
    try {
        const movies = yield axios.get(`/api/genre`);
        //console.log('movie:', movie.payload); // test function
        let genreIDs = [];
        for (let x = 0; x < movies.data.length; x++) {
            //console.log(movies.data[x].movie_id, movies.data[x].genre_id); // test function
            if (movies.data[x].movie_id == movie.payload.id) {
                genreIDs.push(movies.data[x].genre_id);
            };
        };
        //console.log(`Genre IDs of ${movie.payload.title} are: ${genreIDs}`); // test function
        yield put({ type: 'FETCH_GENRES', payload: genreIDs });
    }
    catch {
        console.log('fetch moves and genres error');
    };
};

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    };
};


// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            //console.log('setting genre', action.payload) // test function
            return action.payload;
        default:
            return state;
    };
};

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
