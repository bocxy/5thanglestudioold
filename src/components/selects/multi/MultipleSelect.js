import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import 'index.css'

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 270,
//     },
    
//   },

  
// };

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
// const [open, setOpen] = React.useState(false);


class MultipleSelect extends React.Component {
  state = {
    name: [],
    id:this.props.keys,
    open:false,
    
    
  };
  handleClickOpen=()=> {
    this.setState({open:true});
  }
  
   handleClose=()=> {
    document.getElementById('selects').blur(); 
    // document.getElementsById('selects').blur();
    this.setState({open:false});
    
 
  }
  handleChange = event => {
    this.setState({name: event.target.value});
    
  };
  handleBlur = (e) => {
    // document.getElementById('selects').blur(); 
    
    // console.log('Closed')
    this.setState({open: true});
    
  };
  render() {
    let {open} = this.state;
// console.log(this.state.name,this.state.id);
    return (
      <div className="row"  >
        <div className="col-12">
          <FormControl className="w-100 " style={{minWidth:'140px',maxWidth:'140px'}}  >
            <InputLabel htmlFor="name-multiple">Name</InputLabel>
       
            {/*  */}
            <Select
        //  className="selectMultiple"
        variant='outlined'
          multiple
          title={this.state.name}
          value={this.state.name}
          onChange={this.handleChange}
          onBlur={(e)=>this.handleBlur(e)}
          // onBlur={this.handleBlur}
          input={<Input id="select-multiple-checkbox"  id="selects" /> }
          renderValue={selected => selected.join(',')}
          MenuProps
          
        >
          {/*  */}


          
          {names.map(name => (
            
            <MenuItem key={name} value={name}  className="scroll"  >
              
              
              <ListItemAvatar className="avatarMultiSelect">
          <Avatar >
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <Checkbox color="primary" checked={this.state.name.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
          {/*  */}
        </Select>
          </FormControl>
        </div>


        {/*  */}
        <div>
    {open===true?
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation <i className="fa fa-check-circle" style={{fontSize:'24px'}}></i></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          { this.state.name.length>0?
          <>
         <div style={{fontWeight:'bold'}}>Are you sure to assign these photographers for the event?</div>
      
        
          <span style={{fontWeight:'italic'}}> {this.state.name.map(
            n=>
            (
              
             
              
             
             <div>{n}</div>
             
          
            
            )

            
          )}
           </span>
</>
          :
          <span>The photographers were not selected</span>

        }

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

:
''
    }
    </div>
      </div>
    );
  }
}

export default MultipleSelect;