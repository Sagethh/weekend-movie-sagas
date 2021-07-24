import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({root: {width: 350,}, media: {height: 500,}});
const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "50%", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},
}));

function MovieItem(movie) {
    const genres = useSelector(store => store.genres);
    const classes = useStyles();
    const dispatch = useDispatch();
    const modal = useModal();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const movieData = () => {
        handleOpen();
        dispatch({ type: 'FETCH_MOVIES_AND_GENRES', payload: movie.movie })
    }
    const genrestuff = () => {
        console.log(genres);
    }



    return (
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
                            {genres.map((genre) => {
                                return (
                                    <>
                                        {genre},&nbsp;
                                    </>
                                    );
                            })}
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