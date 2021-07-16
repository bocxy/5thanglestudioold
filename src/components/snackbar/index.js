import React from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  const handleClose = () => {
      
    props.snackBarClose();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={6000} anchorOrigin={{ vertical:"top", horizontal:"center" }} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.color}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
