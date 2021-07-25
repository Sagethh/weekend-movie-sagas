import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Editor from '../Editor/Editor';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles({root: {width: "100%", height: "100%"}, media: {height: 500,}});
const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "60%", maxWidth:"700px", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, borderRadius:'10%', border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3)}
}));
// materialUI styling

function MovieItem(movie) { // main function for this page
    const editor = useSelector(store => store.editor); // genre handler
    const handleEditorOpen = () => { setEditorOpen(true); setEditMovieTitle(movie.movie.title); setEditMovieGenre(movie.movie.genre); setEditMovieDescription(movie.movie.description); setEditMoviePoster(movie.movie.poster); setEditMovieID(movie.movie.id)}; //  materialUI modal handler
    const [editorOpen, setEditorOpen] = React.useState(false); // materialUI modal handler
    const classes = useStyles(); // materialUI style handler
    const history = useHistory();
    const modal = useModal(); // materialUI style handler
    const [open, setOpen] = React.useState(false); // main modal open handler
    const handleOpen = () => { setOpen(true) }; // main modal open handler
    const handleClose = () => { setOpen(false) }; // main modal open handler
    const [editedMovie, setEditedMovie] = useState([]); // main movie array that will be send back to the server
    const [editMovieID, setEditMovieID] = useState('')
    const [editMovieTitle, setEditMovieTitle] = useState(''); // handles addMovie title
    const [editMovieGenre, setEditMovieGenre] = useState(''); // handles addMovie genre
    const [editMovieDescription, setEditMovieDescription] = useState(''); // handles addMovie description
    const [editMoviePoster, setEditMoviePoster] = useState(''); // handles addMovie poster
    const genres = useSelector(store => store.genres); // genre handler
    const dispatch = useDispatch();
    const genreHandler = [{value: 0, label: "Select An Option"}, {value: 1, label: "Adventure"}, {value: 2, label: "Animated"}, {value: 3, label: "Biographical"}, {value: 4, label: "Comedy"}, {value: 5, label: "Disaster"}, {value: 6, label: "Drama"}, {value: 7, label: "Epic"}, {value: 8, label: "Fantasy"}, {value: 9, label: "Musical"}, {value: 10, label: "Romantic"}, {value: 11, label: "Science Fiction"}, {value: 12, label: "Space-Opera"}, {value: 13, label: "Superhero"}];
    // genre selector for materialUI
    const handleEditorClose = () => { setEditorOpen(false); setEditMovieTitle(''); setEditMovieGenre(0); setEditMovieDescription(''); setEditMoviePoster('') };
    // clears all inputs on modal close
    const movieCardHandler = () => { handleOpen(); dispatch ({ type: 'FETCH_MOVIES_AND_GENRES', payload: movie.movie })}; // main modal close handler

    const deleteMovie = (movie) => { // function to delete movie on button click
        let movieToDelete = movie.movie.id;
        // console.log('trying to delete movie #', movieToDelete); // test function
        dispatch ({
            type: 'DELETE_MOVIES_GENRES',
            payload: movieToDelete
        })};
        const saveChanges = () => { // submit onClick function
            if (movieTitle == "" || movieDescription == "" || moviePoster == "" || movieGenre == 0) { // checks for any empty inputs and declines to post if there are any
                alert('Please fill in all inputs');
                return false;
            };
            editedMovie.push({ id: movieID, title: movieTitle, description: movieDescription, poster: moviePoster, genre_id: movieGenre }); // pushes movie data into movie array to send back to server
            console.log(editedMovie[0]); // test function
            dispatch({ // sends an ADD_MOVIE request on submit with the payload of movie array (all the data we collected in the form)
               type: "SAVE_EDITED_MOVIE",
               payload: movie
           });
            handleClose(); // requests function to clears everything
        };

    const editMovie = (movie) => {
        handleEditorOpen();
        //console.log(movie);
        //console.log(`passing:`, movie.movie);
        dispatch({
            type: 'EDIT_MOVIE',
            payload: movie
        });
        return (
           <Editor key={movie.id} movie={movie} /> 
        )
        
        //history.push('/editor');
    }

    return ( // main return, what will be shown on the DOM
        <Box width="18%" minWidth="300px" p={"5px"} margin="auto">
            <Modal aria-labelledby="Edit Movie Modal" aria-describedby="Upload a movie" className={modal.modal} open={editorOpen} onClose={handleEditorClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
                <Fade in={editorOpen}>
                    <div className={modal.paper}>
                        <TextField id="Edit Movie Title" label="Movie Title" variant="outlined" value={editMovieTitle} onChange={(event) => setEditMovieTitle(event.target.value)}/><br /><br />
                        <TextField id="Edit Movie Description" label="Movie Description" style={{width: "100%"}} multiline maxRows={6} variant="outlined" value={editMovieDescription} onChange={(event) => setEditMovieDescription(event.target.value)}/><br /><br />
                        <TextField id="Edit Movie Poster URL" label="Movie Poster URL" variant="outlined" value={editMoviePoster} onChange={(event) => setEditMoviePoster(event.target.value)}/><br /><br />
                        <Button variant="contained" color="primary" startIcon={<CloseIcon />} onClick={handleEditorClose}>Close</Button>
                        &nbsp;
                        <Button variant="contained" color="primary" endIcon={<PublishIcon />} onClick={saveChanges}>Save</Button> 
                    </div>
                </Fade>
            </Modal>
            <Modal align="center" aria-labelledby="Movie Title Modal" aria-describedby={movie.movie.title} className={modal.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
                <Fade in={open}>
                    <div className={modal.paper}>
                        <h2 ul id={movie.movie.title}><u>{movie.movie.title}</u></h2>
                        <p id={movie.movie.description} style={{backgroundColor:"WhiteSmoke", padding:"20px", borderRadius:"25px"}}>{movie.movie.description}</p>    
                        <h4><u>Genres:</u></h4>
                        <>
                            {genres.map( (genre) => { return (<p key={genre}> {genre} </p>) })}
                        </>
                        <Button variant="contained" color="secondary" onClick={() => { deleteMovie(movie) }}>Delete Movie</Button>
                        <Button variant="contained" color="primary" onClick={handleEditorOpen}>Edit Movie</Button>
                    </div>
                </Fade>
            </Modal>
            <Card className={classes.root} style={{maxHeight: "600px"}}>
                <CardActionArea>
                    <CardMedia component="img" className={classes.media} src={movie.movie.poster} title={movie.movie.title} onClick={movieCardHandler}/>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h3" noWrap>{movie.movie.title}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

export default MovieItem;