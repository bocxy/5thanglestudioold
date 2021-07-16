import React, {Component} from 'react';
// import moment from 'moment';
import {DatePicker} from 'material-ui-pickers';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
export default class DatePickers extends Component {
  constructor(props){
    super(props)
  this.state = {
    // selectedDate: moment(),
    see:this.props.see,
  };

}
  // handleDateChange = (date) => {
  //   this.setState({selectedDate: date});
  // };
  // componentWillReceiveProps (newProps) {
  //   if( newProps.see !== this.props.see ) /* do stuff */
  //   this.setState(newProps.see);
  // }

  render() {
    
    // let see=this.state.see;
    
    
    
    return (
      <div key="basic_day" className="picker">
        <DatePicker
          fullWidth
          format="DD/ MM /YYYY"
          value={this.props.selectedDate} 
          className={this.props.className}
          label={this.props.label}
          onChange={this.props.onChange}
          animateYearScrolling={false}
          minDate = {this.props.minDate}
          leftArrowIcon={<KeyboardBackspaceIcon />}
          rightArrowIcon={<KeyboardBackspaceIcon style={{transform: "rotate(180deg)"}}/>}
          variant="outlined"
          helperText= { this.props.error ? "select the date" : ""}
          error= {this.props.error}
          margin="normal"
          disabled={this.props.see}
        />
      </div>
    )

  }
}