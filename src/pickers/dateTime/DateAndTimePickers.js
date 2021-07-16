import React, { Component } from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
export default class DateAndTimePickers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // selectedDate: moment(),
      see: this.props.see,
    };
  }

  render() {

    return (
      <div key="datetime_default" className="picker">

        <DateTimePicker
        // style ={{   cursor: "auto"}}
           fullWidth
           format="Do MMMM YYYY, h:mm a"
           value={this.props.selectedDate} 
           className={this.props.className}
           label={this.props.label}
           onChange={this.props.onChange}
           animateYearScrolling={false}
          //  strictMode 
          //  disablePast={true}
           strictCompareDates={true}
           minDate = {this.props.minDate}
           leftArrowIcon={<KeyboardBackspaceIcon />}
           rightArrowIcon={<KeyboardBackspaceIcon style={{transform: "rotate(180deg)"}}/>}
           InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{cursor:"auto"}}>
                <EventIcon style={{color:"rgba(0, 0, 0, 0.7)"}} />
              </InputAdornment>
            ),
            style:{color:"rgba(0, 0, 0, 0.7)",fontSize:"14px",cursor:"auto !importent"}
          }}
           variant="outlined"
           helperText= { this.props.error ? this.props.errorMsg: ""}
           error= {this.props.error}
           margin="dense"
          //  cursor="auto"
           disabled={this.props.see}
        />
      </div>)
  }
}