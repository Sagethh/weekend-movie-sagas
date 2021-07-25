import React, {useState} from 'react';
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
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "50%", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},
}));

function AddMovie() {
    const [genres, setGenres] = React.useState({
        Adventure: false,
        Animated: false,
        Biographical: false,
        Comedy: false,
        Disaster: false,
        Drama: false,
        Epic: false,
        Fantasy: false,
        Musical: false,
        Romantic: false,
        Science_Fiction: false,
        Space_Opera: false,
        Superhero: false,
      });
    const modal = useModal();
    const dispatch = useDispatch();
    const [movie, setMovie] = useState([]);
    const [movieTitle, setMovieTitle] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [moviePoster, setMoviePoster] = useState('');
    const [open, setOpen] = React.useState(false);
    const [genreModalOpen, setGenreModalOpen] = React.useState(false);
    const openGenreModal = () => {setGenreModalOpen(true);};
    const closeGenreModal = () => {setGenreModalOpen(false);};
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const submit = () => {
        if (movieTitle == "" || movieDescription == "" || moviePoster == "") {
            console.log('nice try bitch, fill it in');
            return false;
        }
        movie.push({title: movieTitle, description: movieDescription, poster: moviePoster,});
        //console.log(movie);
        dispatch({
            type: "ADD_MOVIE",
            payload: movie
        })
    }

    const changer = (event) => {
        setGenres({ ...genres, [event.target.name]: event.target.checked });
        console.log(genres);
    }
    

    return (
        <>
        <Modal
                aria-labelledby="Select Movie Genres Modal"
                aria-describedby="Select Movie Genres"
                className={modal.modal}
                open={genreModalOpen}
                onClose={closeGenreModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
            <Fade in={genreModalOpen}>
                <div className={modal.paper}>
                <FormControlLabel checked={genres.Adventure} name="Adventure" control={<Switch color="primary" />} label="Adventure" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Animated" control={<Switch color="primary" />} label="Animated" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Biographical" control={<Switch color="primary" />} label="Biographical" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Comedy" control={<Switch color="primary" />} label="Comedy" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Disaster" control={<Switch color="primary" />} label="Disaster" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Drama" control={<Switch color="primary" />} label="Drama" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Epic" control={<Switch color="primary" />} label="Epic" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Fantasy" control={<Switch color="primary" />} label="Fantasy" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Musical" control={<Switch color="primary" />} label="Musical" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Romantic" control={<Switch color="primary" />} label="Romantic" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Science_Fiction" control={<Switch color="primary" />} label="Science Fiction" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Space-Opera" control={<Switch color="primary" />} label="Space-Opera" labelPlacement="start" onChange={changer}/>
                <FormControlLabel checked={genres.Animated} name="Superhero" control={<Switch color="primary" />} label="Superhero" labelPlacement="start" onChange={changer}/>
                </div>
            </Fade>
            </Modal>
            <Modal
                aria-labelledby="Upload Movie Modal"
                aria-describedby="Upload a movie"
                className={modal.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
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
                <Button variant="contained" color="primary" endIcon={<PublishIcon />} onClick={openGenreModal}>Select Genres</Button>
                <br />
                <br />
                <Button variant="contained" color="primary" startIcon={<CloseIcon />} onClick={handleClose}>Close</Button>
                &nbsp;
                <Button variant="contained" color="primary" endIcon={<PublishIcon />} onClick={submit}>Submit</Button> 
                </div>
            </Fade>
            </Modal>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddBoxIcon />}
                onClick={handleOpen}
            >
                Add A Movie
            </Button>   
        </>
    );
};

export default AddMovie;