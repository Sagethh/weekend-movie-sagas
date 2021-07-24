import React from 'react';
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

const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width: "50%", margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3),},
}));

function AddMovie() {
    const [open, setOpen] = React.useState(false);
    const modal = useModal();
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};

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