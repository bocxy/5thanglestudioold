import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Grid } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
export default function AlertDialog(props) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    props.alertClose();
  };
  const handleSure = () => {
    props.alertSure();
  }
  const handleCancel = () => {
    props.alertCancel();
  }
  const buttonBackgroundColor = ()=>{
      if(props.alertStatus ==="info"){
          return "#6a68cc" ;
      }else if(props.alertStatus ==="success"){
          return "rgb(94, 152, 92)";
      }else{
          return "rgba(222, 78, 53, 0.75)";
      }
  }
  return (
    < >
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.alertOpen}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent style={{    margin: "auto",
    padding: "30px 50px"}} >
        <Grid item container alignItems="center" style={{display:"flex",justifyContent:"center"}}>
            {
                props.alertStatus ==="info" ?<> <InfoIcon style={{    color: "#8988d4",fontSize: "50px"}}/>&nbsp;&nbsp;</> : props.alertStatus ==="success" ? 
                <><CheckCircleIcon style={{    color: "rgba(10, 148, 40, 0.77)",fontSize: "50px"}}/>&nbsp;&nbsp;</> :<> <ErrorIcon style={{    color: "rgba(222, 78, 53, 0.75)",fontSize: "50px"}}/>&nbsp;&nbsp;</>
            }
        </Grid>
        <Grid item container alignItems="center">
          <DialogContentText id="alert-dialog-description" style={{fontWeight: "700", marginTop: "15px"}}  >
            {props.alertContent}
          </DialogContentText>
        </Grid>
        <Grid item container style={{display:"flex",justifyContent:"flex-end",marginTop:"30px"}} >
          {
            props.twoBtn ? <>
             <Button onClick={handleSure} style={{ background: "rgb(137, 136, 212",color: "#fff"}}>
            Sure
          </Button>
          <Button onClick={handleCancel} style={{ background: "rgba(212, 200, 200, 0.13)",color: "rgb(37, 35, 35)"}}>
            Cancel
          </Button>
            </> : 
            <>
             <Button onClick={handleClose} style={{ background: buttonBackgroundColor(),color: "#fff"}}>
            Ok
          </Button>
            </>
          }
         
        </Grid>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
         
        </DialogActions> */}
      </Dialog>
    </>
  );
}