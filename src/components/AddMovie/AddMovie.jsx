import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';

const useModal = makeStyles((theme) => ({ 
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},
}));
// materialUI styling

function AddMovie() {
    const handleOpen = () => { setOpen(true) }; //  materialUI modal handler
    const [open, setOpen] = React.useState(false); // materialUI modal handler
    const modal = useModal(); // materialUI modal handler
    const [movie, setMovie] = useState([]); // main movie array that will be send back to the server
    const [movieTitle, setMovieTitle] = useState(''); // handles addMovie title
    const [movieGenre, setMovieGenre] = useState(''); // handles addMovie genre
    const [movieDescription, setMovieDescription] = useState(''); // handles addMovie description
    const [moviePoster, setMoviePoster] = useState(''); // handles addMovie poster
    const dispatch = useDispatch();
    const genreHandler = [{value: 0, label: "Select An Option"}, {value: 1, label: "Adventure"}, {value: 2, label: "Animated"}, {value: 3, label: "Biographical"}, {value: 4, label: "Comedy"}, {value: 5, label: "Disaster"}, {value: 6, label: "Drama"}, {value: 7, label: "Epic"}, {value: 8, label: "Fantasy"}, {value: 9, label: "Musical"}, {value: 10, label: "Romantic"}, {value: 11, label: "Science Fiction"}, {value: 12, label: "Space-Opera"}, {value: 13, label: "Superhero"}];
    // genre selector for materialUI
    const handleClose = () => { setOpen(false); setMovieTitle(''); setMovieGenre(0); setMovieDescription(''); setMoviePoster('') };
    // clears all inputs on modal close
    
    const submit = () => { // submit onClick function
        if (movieTitle == "" || movieDescription == "" || moviePoster == "" || movieGenre == 0) { // checks for any empty inputs and declines to post if there are any
            alert('Please fill in all inputs');
            return false;
        };
        movie.push({ title: movieTitle, description: movieDescription, poster: moviePoster, genre_id: movieGenre }); // pushes movie data into movie array to send back to server
        // console.log(movieGenre); // test function
        dispatch({ // sends an ADD_MOVIE request on submit with the payload of movie array (all the data we collected in the form)
            type: "ADD_MOVIE",
            payload: movie
        });
        handleClose(); // requests function to clears everything
    };

    return ( // main return, what will be shown on the DOM
        <>
            <Modal aria-labelledby="Upload Movie Modal" aria-describedby="Upload a movie" align="center"  className={modal.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
                <Fade in={open}>
                    <div className={modal.paper} style={{width: '550px'}}>
                        <TextField id="Movie Title" label="Movie Title" variant="outlined" style={{width: "100%"}} value={movieTitle} onChange={(event) => setMovieTitle(event.target.value)}/><br /><br />
                        <TextField id="Movie Description" label="Movie Description" style={{width: "100%"}} multiline maxRows={6} variant="outlined" value={movieDescription} onChange={(event) => setMovieDescription(event.target.value)}/><br /><br />
                        <TextField id="Movie Poster URL" label="Movie Poster URL" style={{width: "100%"}} variant="outlined" value={moviePoster} onChange={(event) => setMoviePoster(event.target.value)}/><br /><br />
                        <TextField select id="Movie Genre Selector" label="Genre" style={{width: "100%"}} SelectProps={{native: true}} variant="outlined" onChange={(event) => setMovieGenre(event.target.value)}>
                            {genreHandler.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField><br /><br />
                        <Button variant="contained" color="primary" startIcon={<CloseIcon />} onClick={handleClose}>Close</Button>
                        &nbsp;
                        <Button variant="contained" color="primary" endIcon={<PublishIcon />} onClick={submit}>Submit</Button> 
                    </div>
                </Fade>
            </Modal>
            <Button variant="contained" color="primary" startIcon={<AddBoxIcon />} onClick={handleOpen}>Add A Movie</Button>   
        </>
    );
};

export default AddMovie;