import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

const lists = [
  {id: 1,  name: 'All Day', color: 'primary'},
];

class CheckboxList extends Component {
  constructor(props){
    super(props)
  // this.state = {
  //   // checked: false,
  //   see:false,
  // };
}

  // handleToggle = () => {
  //   let {checked} = this.state;
  //   // const currentIndex = checked.indexOf(value);
  //   // const newChecked = [...checked];

  //   if (checked === false) {
  //     checked=true
  //   } else {
  //     checked=false
  //   }

  //   this.setState({
  //     checked
  //   });
  // };

  render() {
    // const see=this.state.see;
    // console.log("123"+see);
    return (
      
      <List  disabled ={this.props.see} >
        {lists.map(item =>
          <ListItem button key={item.id} onClick={this.props.onChange} disabled ={this.props.see} className={this.props.className}>
        
            <Checkbox color="primary"
                      checked={this.props.checked}
                  
                       
            />

            <ListItemText primary={item.name}  onClick={this.props.onChange}/>
            {/* <ListItemSecondaryAction>
              <IconButton>
                <i className={`zmdi zmdi-${item.icon} text-${item.color}`}/>
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>,
        )}
      </List>
      
    );
  }
}

export default CheckboxList;