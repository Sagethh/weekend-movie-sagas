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

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 500,
    },
  });

function MovieItem(movie) {
    const classes = useStyles();


    const test = () => {
        console.log(movie);
        console.log(movie.movie.poster);
    }


    return (
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            onClick={test}
            className={classes.media}
            src={movie.movie.poster}
            title={movie.movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.movie.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.movie.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>

    );
};

export default MovieItem;