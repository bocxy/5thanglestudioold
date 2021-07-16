import React, { Component } from 'react';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DatePickers from 'pickers/date/DatePickers';
import CardBox from 'components/CardBox/index';
// import IntlMessages from 'util/IntlMessages';
// import Tooltip from '@material-ui/core/Tooltip';
import "index.css";
import CheckboxList from '../list/checkbox/CheckboxList';
import moment from 'moment';
import { CREATE_CUSTOMER,CREATE_PROJECT } from '../services/grapgql/mutation';
import { v4 as uuidv4 } from 'uuid';
import { withApollo } from '@apollo/react-hoc';
import { AuthContext } from '../context/auth'; 
const LeadStatus = [
  {
    value: 'CAPTURED',
    label: 'Captured',
  },
  {
    value: 'FOLLOWUP',
    label: 'Follow-Up',
  },
  {
    value: 'SUCCESS',
    label: 'Success',
  },
  {
    value: 'MODERATE',
    label: 'Moderate',
  },
  {
    value: 'DROP',
    label: 'Drop',
  },
];

const EventType = [
  {
    value: 'ENGAGEMENTS',
    label: 'Engagements',
  },
  {
    value: 'WEDDINGS',
    label: 'Weddings',
  },
  {
    value: 'BIRTHDAYS',
    label: 'Birthdays',
  },
  {
    value: 'PORTRAITS',
    label: 'Portraits',
  },
  {
    value: 'PRE/POST_WEDDING_COUPLE_SHOOT',
    label: 'Pre / Post Wedding Couple Shoot',
  },
];

const LeadSource = [
  {
    value: 'WHATSAPP',
    label: 'WhatsApp',
  },
  {
    value: 'FACEBOOK',
    label: 'Facebook',
  },
  {
    value: 'LINKEDIN',
    label: 'LinkedIn',
  },
  {
    value: 'INSTAGRAM',
    label: 'Instagram',
  },
  {
    value: 'REFERRALS',
    label: 'Referrals',
  },
  {
    value: 'WALKINS',
    label: 'Walk-Ins',
  },
  {
    value: 'ORTHERS',
    label: 'Others',
  },
];

const invalidMessages = {
  customerName: "Sorry customer name required"
}

class ComposedTextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      phNumber: '',
      email:'',
      address:'',
      selectedDate: moment().toDate(),      
      checked: false,
      startTime:'07:30',
      endTime:'07:30',
      statusOfLead:'Captured',
      eventType:'Engagements',
      leadSource:'WhatsApp',
      shootDetails:'',
      errors:false,
      see: this.props.see,
      sees: this.props.sees,
      error: {
        customerName: null
      },
      ...(this.props.see !== false ? this.props : {})
    };
  }

  // handleInvalid = name => event => {
  //   event.preventDefault();
  //   let { error } = this.state;
  //   error[name] = invalidMessages[name];
  //   this.setState({ error })
  // }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    // console.log([name]+':' +event.target.value);
  };

  handleDateChange = (date) => {

    
    this.setState({selectedDate: date._d})

    // this.setState({updatedDate: date._d})
   
  };

  handleToggle = () => {
    let {checked} = this.state;
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    if (checked === false) {
      checked=true
    } else { 
      checked=false
    }

    this.setState({
      checked
    });
  };


  check = () => {
    this.setState({
      see: false
    })
  }
  handleSubmit = async(data,contextValue)=>{
    alert('dkfljdl')
    let customerVariable = {
      id: uuidv4(),
      name: this.state.name,
      mobile: this.state.phNumber,
      email: this.state.email,
      source: this.state.leadSource,
      profile_id: contextValue.profile_id,
      $created_at: new Date(),
      $updated_at: new Date
    }
    let projectVariable = {
      id: uuidv4(),
      customer_id: '',
      created_at: new Date(),
      updated_at:  new Date(),
      profile_id: contextValue.profile_id,
      $event_address: this.state.address,
      event_date: this.state.selectedDate,
      event_end_time: this.state.endTime,
      event_start_time: this.state.startTime,
      event_type: this.state.eventType,
      final_quote_id: '',
      is_event_full_day: this.state.checked,
      shoot_details: this.state.shootDetails,
      status: this.state.statusOfLead
    }
    // console.log(customerVariable,projectVariable);
    // await this.props.client.mutate({mutation:CREATE_CUSTOMER,variables}).then(res=>{

    //   if(res!==null){
    //     this.props.client.mutate({mutation:CREATE_PROJECT,variables}).then(res1=>{

    //     }).catch(console.error);
    //   }
    // }).catch(console.error)
  }

  render() {
    let contextValue = this.context;
    let data = this.state;

    return (

      <div>



        <CardBox
          styleName="col-lg-12 col-md-12 col-sm-12 p-0"

        >

 
          <form autoComplete="off" action="javascript:void(0)"   onSubmit={()=>{this.handleSubmit(data,contextValue.user)}}>

 
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '12px' }}>
              {data.see ?
                <Button type="submit" variant="contained" style={{ backgroundColor: '#3f51b5' }} className="jr-btn  text-white"
                  onClick={() => this.check()}
                >Edit</Button>
                : <Button type="submit" variant="contained"  style={{ backgroundColor: '#3f51b5' }} className="jr-btn  text-white" >Save</Button>
              }
            </div>
            <Grid container
              direction="column"
              justify="center"
              alignItems="stretch"

            >
 

 
              <Grid item container justify="space-around"
                alignItems="center" spacing={1} >
                <Grid item xs={12} lg={4} md={4}>
                  <TextField
                    // required
                    // pattern="[0-9]{2}"
                    // onInvalid={this.handleInvalid('customerName')}
                    // helperText={this.state.error.customerName}
                    id="outlined-password-input"
                    label="Customer Name"
                    style={{ width: '100%' }}
                    type="text"
                    title="text inputs only allowed"
                    disabled={data.see}
                    autoComplete="current-password"
                    margin="dense"
                    variant="outlined"
                    className={this.props.className}
                    value={ this.props.userDetails ? this.props.userDetails.name : this.state.name }
                    onChange={this.handleChange('name')}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>

                  <TextField
                    id="outlined-password-input"
                    // error={this.state.error}
                    label="Phone Number"
                    type="number"
                    error={this.state.errors}
                    title="please enter only numbers in digits"
                    required
                    margin="dense"
                    variant="outlined"
                    style={{ width: '100%' }}
                  
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  }}
                    disabled={data.see}
                    value={this.props.userDetails ? this.props.userDetails.phNumber : this.state.phNumber}
                    className={this.props.className}
                    onChange={this.handleChange('phNumber')}
                    
                    
            
                  />
                </Grid>
                <Grid item xs={12} lg={4} md={4}>

                  <TextField
                    id="outlined-password-input"
                    label="Email Id"
                    style={{ width: '100%' }}
                    type="email"
                    autoComplete="current-password"
                    margin="dense"
                    variant="outlined"
                    disabled={data.see}
                    className={this.props.className}
                    value={ this.props.userDetails ? this.props.userDetails.email : this.state.email }
                    onChange={this.handleChange('email')}
                    required
                  />
                </Grid>
              </Grid>

              <Grid item container lg={12} md={12}>


                <TextField
                  id="outlined-multiline-static"
                  label="Address of the Event"
                  multiline
                  rows="2"
                  style={{ width: '100%' }}

                  className={this.props.className}
                  margin="normal"
                  variant="outlined"
                  disabled={data.see}
                  value={ this.props.userDetails ? this.props.userDetails.address : this.state.address }
                  onChange={this.handleChange('address')}
                  required
                />

              </Grid>
              {/* pICKERS DATE  */}

              <Grid item container justify="space-around"
                alignItems="center" spacing={1} >
                <Grid item xs={12} lg={6} md={6}>

                  <DatePickers style={{ width: '100%' }} see={data.see} className={this.props.className} selectedDate={ this.props.userDetails?this.props.userDetails.selectedDate:this.state.selectedDate} onChange={this.handleDateChange
                
                }/>

                </Grid>
                <Grid item xs={12} lg={6} md={6}>

                  <CheckboxList style={{ width: '100%' }} see={data.see}  checked={data.checked} className={this.props.className} onChange={() => {
                    
                    this.setState({ checked: !this.state.checked })
                   
                  }
                  }
                  />

                </Grid>

              </Grid>
              {/*  */}
              <Grid item container justify="space-around"
                alignItems="center" spacing={1} >
                <Grid item xs={12} lg={6} md={6}>
                  <TextField
                    id="time"
                    label="Start time"
                    type="time"
                    defaultValue="07:30"
                    style={{ width: '100%' }}
                    className={this.props.className}
                    InputLabelProps={{
                      shrink: true,

                    }}
                    margin="dense"
                    variant="outlined"
                    disabled={data.see || data.checked}
                    value={ this.props.userDetails ? this.props.userDetails.startTime : this.state.startTime }
                    onChange={this.handleChange('startTime')}
                    required
                  />
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                  <TextField
                    id="time"
                    label="End time"
                    type="time"
                    defaultValue="07:30"
                    style={{ width: '100%' }}
                    className={this.props.className}
                    InputLabelProps={{
                      shrink: true,

                    }}
                    margin="dense"
                    variant="outlined"
                    disabled={data.see || data.checked}
                    value={ this.props.userDetails ? this.props.userDetails.endTime : this.state.endTime }
                    onChange={this.handleChange('endTime')}
                    required
                  />
                </Grid>

              </Grid>

              <Grid item container justify="space-around"
                alignItems="center" spacing={1} >
                <Grid item xs={12} lg={4} md={4}>
                  <TextField
                    id="select-currency-native"
                    select
                    label="Status Of Lead"
                    // value={this.state.statusOfLead}
                    value={ this.props.userDetails ? this.props.userDetails.statusOfLead : this.state.statusOfLead }

                    onChange={this.handleChange('statusOfLead')}
                    className={this.props.className}
                    SelectProps={{
                      native: true,
                    }}

                    margin="normal"
                    fullWidth
                    variant="outlined"
                    disabled={data.see}
                    required
                  >
                    {LeadStatus.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}

                  </TextField>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>

                  <TextField
                    id="select-currency-native"
                    select
                    label="Event Type"
                    value={ this.props.userDetails ? this.props.userDetails.eventType : this.state.eventType }
                    className={this.props.className}
                    onChange={this.handleChange('eventType')}
                    SelectProps={{
                      native: true,
                    }}

                    margin="normal"
                    variant="outlined"
                    fullWidth
                    disabled={data.see}
                    required
                  >
                    {EventType.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>

                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Lead Source"
                    className={this.props.className}
                    // value={this.state.leadSource}
                    value={ this.props.userDetails ? this.props.userDetails.leadSource : this.state.leadSource }
                    onChange={this.handleChange('leadSource')}
                    SelectProps={{
                      native: true,
                    }}

                    margin="normal"
                    variant="outlined"
                    style={{ width: '100%' }}
                    disabled={data.see}
                    required
                  >
                    {LeadSource.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>


                </Grid>
              </Grid>

              <Grid item justify="space-around"
                spacing={1} style={{ width: '100%' }} >


                <TextField
                  id="outlined-multiline-static"
                  label="Shoot Details"
                  multiline
                  rows="2"
                  style={{ width: '100%' }}
                  className={this.props.className}
                  value={ this.props.userDetails ? this.props.userDetails.shootDetails : this.state.shootDetails }
                  margin="dense"
                  variant="outlined"
                  disabled={data.see}
                  onChange={this.handleChange("shootDetails")}
                  required
                />


              </Grid>
            </Grid>
          </form>
        
        </CardBox>
      </div>
    );
  }
}
ComposedTextField.contextType = AuthContext;
export default withApollo(ComposedTextField);