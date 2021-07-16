import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Select from '@material-ui/core/Select';

class StatusDropDown extends Component {
  constructor(props){
    super(props);
  this.state = {
    name: '',
    currency: 'EUR',
    label: 'FollowUp',
  }
};
  // handleChange = event => {
  //   this.setState({ name: event.target.value });
  // };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    let LeadStatus = (this.props.LeadStatus !== undefined && this.props.LeadStatus !==null) ? this.props.LeadStatus : [];
    let statusValue = this.props.status
    // let stylesdropdown =this.props.stylesdropdown;
    console.log("test")
    return (
      <Grid item xs={12}  >
        <TextField
          id="select-currency-native"          
          select
          className="test-input"
         style={{height:'30px !important ',width:'100%'}}
          value={statusValue}
          onChange={this.handleChange('currency')}
          SelectProps={{
            native: true,
          }}
          disabled={this.props.disabled}

          margin="dense"

          variant="outlined"
        >
          {LeadStatus.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
     

          {/* <FormControl className="" style={{ width:'100%'}}>
            <Select
              native
              style={{ height: '35px', border:'1px solid' }}
              className="test-input"
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              variant="outlined"
            >
       {LeadStatus.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
             ))}
            </Select>
            
          </FormControl> */}
      </Grid>
    )
  }
}
export default StatusDropDown;