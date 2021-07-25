import React from 'react';
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

const useStyles = makeStyles({root: {width: 350, height: 600}, media: {height: 500,}});
const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "50%", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},
}));

function MovieItem(movie) {
    const classes = useStyles(); 
    const modal = useModal();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    // materialUI stuff
    const genres = useSelector(store => store.genres); // genres from server
    const dispatch = useDispatch();
    const movieData = () => { handleOpen(); dispatch({ type: 'FETCH_MOVIES_AND_GENRES', payload: movie.movie })};
    // onclick function, serves as a pass for other stuff if needed

    return ( // what will be displayed on the DOM
        <div>
            <Modal
                aria-labelledby="Movie-Modal"
                aria-describedby={movie.movie.title}
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
                        <h2 id="transition-modal-title">{movie.movie.title}</h2>
                        <p id="transition-modal-description">{movie.movie.description}</p>
                        <h4> Genres: </h4>
                        <ul>
                            {genres.map((genre) => {
                                return (
                                    <li key={genre}>
                                        {genre}
                                    </li>
                                );
                            })}
                        </ul>
                        <Button variant="contained" color="primary">Delete Movie</Button>
                    </div>
                </Fade>
            </Modal>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        src={movie.movie.poster}
                        title={movie.movie.title}
                        onClick={movieData}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {movie.movie.title}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default MovieItem;