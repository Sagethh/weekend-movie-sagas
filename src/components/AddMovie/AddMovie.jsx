import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "50%", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},
}));

function AddMovie() {
    const [movieGenreLabel, setMovieGenreLabel] = useState('');
    const [movie, setMovie] = useState([]);
    const [movieTitle, setMovieTitle] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [moviePoster, setMoviePoster] = useState('');
    const [open, setOpen] = React.useState(false);
    const [genreModalOpen, setGenreModalOpen] = React.useState(false);
    const modal = useModal();
    const dispatch = useDispatch();
    const openGenreModal = () => {setGenreModalOpen(true);};
    const closeGenreModal = () => {setGenreModalOpen(false);};
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false); setMovieTitle(''); setMovieGenre(0); setMovieDescription(''); setMoviePoster('')}; // clears all inputs on modal close
    const genreHandler = [{value: 0,label: "Select An Option"},{value: 1,label: "Adventure"},{value: 2,label: "Animated"},{value: 3,label: "Biographical"},{value: 4,label: "Comedy"},{value: 5,label: "Disaster"},{value: 6,label: "Drama"},{value: 7,label: "Epic"},{value: 8,label: "Fantasy"},{value: 9,label: "Musical"},{value: 10,label: "Romantic"},{value: 11,label: "Science Fiction"},{value: 12,label: "Space-Opera"},{value: 13,label: "Superhero"},];
    // big long thingy for materialUI, gives options 1-10 for the dropdown
    
    const submit = () => { // submit onClick function
        if (movieTitle == "" || movieDescription == "" || moviePoster == "" || movieGenre == 0) { // checks for empty inputs and declines to post if there are any
            alert('Please fill in all inputs');
            return false;
        };
        movie.push({title: movieTitle, description: movieDescription, poster: moviePoster, genre_id: movieGenre}); // pushes movie data into an array to send back to server
        //console.log(movieGenre); //test function
        dispatch({ // sends an ADD_MOVIE request on submit with the payload of movie (all the data we collected in the form)
            type: "ADD_MOVIE",
            payload: movie
        });
        handleClose(); // clears everything
    };

    return (
        <>
            <Modal
                aria-labelledby="Upload Movie Modal"
                aria-describedby="Upload a movie"
                className={modal.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500,}}
            >
            <Fade in={open}>
                <div className={modal.paper}>
                <TextField id="Movie-Title" label="Movie Title" variant="outlined" value={movieTitle} onChange={(event) => setMovieTitle(event.target.value)}/>
                <br />
                <br />
                <TextField id="Movie-Description" label="Movie Description" variant="outlined" value={movieDescription} onChange={(event) => setMovieDescription(event.target.value)}/>
                <br />
                <br />
                <TextField id="Movie-Poster-URL" label="Movie Poster URL" variant="outlined" value={moviePoster} onChange={(event) => setMoviePoster(event.target.value)}/>
                <br />
                <br />
                <TextField select id="Movie Genre Selector" label="Genre" style={{width: "100%"}} SelectProps={{native: true}} variant="outlined" onChange={(event) => setMovieGenre(event.target.value)}>
                    {genreHandler.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <br />
                <br />
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