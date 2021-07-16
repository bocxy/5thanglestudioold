import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';

class RadioButtonsGroup extends Component {

  render() {
    const { handleRadio } = this.props 
    return (
      <div className="row" style={{display:'flex',justifyContent:'center'}}>


      
          <FormControl  component="fieldset" required >
            <RadioGroup
              className="d-flex flex-row justify-content-center"
              aria-label="gender"
              name="gender" 
              style={{marginLeft: "-19px"}}  
              value={this.props.value}
              onChange={handleRadio}
             
            >
              <FormControlLabel value="email" control={<Radio color="primary"/>} label="Email"/> 
              <FormControlLabel value="sms" control={<Radio color="primary"/>} label="SMS"/>
              {/* <FormControlLabel value="mobile" control={<Radio color="primary"/>}label="Mobile"/> */}
              {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
            </RadioGroup>
          </FormControl>
       

      </div>


    );
  }
}

export default RadioButtonsGroup;