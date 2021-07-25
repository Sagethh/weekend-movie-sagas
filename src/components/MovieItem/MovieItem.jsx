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
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({root: {width: 350, height: 600}, media: {height: 500,}});
const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "45%", maxWidth:"700px", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, borderRadius:'10%', border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3)}
}));
// materialUI styling

function MovieItem(movie) { // main function for this page
    const classes = useStyles(); // materialUI style handler
    const modal = useModal(); // materialUI style handler
    const [open, setOpen] = React.useState(false); // main modal open handler
    const handleOpen = () => { setOpen(true) }; // main modal open handler
    const handleClose = () => { setOpen(false) }; // main modal open handler
    const genres = useSelector(store => store.genres); // genre handler
    const dispatch = useDispatch();
    const movieCardHandler = () => { handleOpen(); dispatch ({ type: 'FETCH_MOVIES_AND_GENRES', payload: movie.movie })}; // main modal close handler

    const deleteMovie = (movie) => { // function to delete movie on button click
        let movieToDelete = movie.movie.id;
        // console.log('trying to delete movie #', movieToDelete); // test function
        dispatch ({
            type: 'DELETE_MOVIES_GENRES',
            payload: movieToDelete
        })};

    return ( // main return, what will be shown on the DOM
        <Grid item>
            <Modal align="center" aria-labelledby="Movie Title Modal" aria-describedby={movie.movie.title} className={modal.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
                <Fade in={open}>
                    <div className={modal.paper}>
                        <h2 ul id={movie.movie.title}><u>{movie.movie.title}</u></h2>
                        <p id={movie.movie.description} style={{backgroundColor:"WhiteSmoke", padding:"20px", borderRadius:"25px"}}>{movie.movie.description}</p>    
                        <h4><u>Genres:</u></h4>
                        <>
                            {genres.map( (genre) => { return (<p key={genre}> {genre} </p>) })}
                        </>
                        <Button variant="contained" color="primary" onClick={() => { deleteMovie(movie) }}>Delete Movie</Button>
                    </div>
                </Fade>
            </Modal>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia component="img" className={classes.media} src={movie.movie.poster} title={movie.movie.title} onClick={movieCardHandler}/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{movie.movie.title}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default MovieItem;