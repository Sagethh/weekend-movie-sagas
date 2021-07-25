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

const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "50%", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},
}));

function AddMovie() {
     const dispatch = useDispatch();
    const [movie, setMovie] = useState([]);
    const [movieTitle, setMovieTitle] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [moviePoster, setMoviePoster] = useState('');
    const [open, setOpen] = React.useState(false);
    const modal = useModal();
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const numberHandler = [{value: 0,label: "Select An Option"},{value: 1,label: "1"},{value: 2,label: "2"},{value: 3,label: "3"},{value: 4,label: "4"},{value: 5,label: "5"},{value: 6,label: "6"},{value: 7,label: "7"},{value: 8,label: "8"},{value: 9,label: "9"},{value: 10,label: "10"},];
    // big long thingy for materialUI, gives options 1-10 for the dropdown

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
                <TextField id="Movie-Genre" label="Movie Genre" variant="outlined" value={movieGenre} onChange={(event) => setMovieGenre(event.target.value)}/>
                <br />
                <br />
                <TextField id="Movie-Poster-URL" label="Movie Poster URL" variant="outlined" value={moviePoster} onChange={(event) => setMoviePoster(event.target.value)}/>
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