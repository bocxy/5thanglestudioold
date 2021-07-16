import React, { Component } from 'react';
import { EventType } from './eventType';

// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { ApolloConsumer } from 'react-apollo';
import { Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
// import DatePickers from 'pickers/date/DatePickers';
import DateAndTimePickers from 'pickers/dateTime/DateAndTimePickers';
// import TimePickers from 'pickers/time/TimePickers';
// import {TimePicker} from 'material-ui-pickers';
import CardBox from 'components/CardBox/index';
// import IntlMessages from 'util/IntlMessages';
// import Tooltip from '@material-ui/core/Tooltip';
import "index.css";
// import {CREATE_CUSTOMER} from './../services/grapgql/mutation'
// import CheckboxList from '../list/checkbox/CheckboxList';
import moment from 'moment';
import { CREATE_CUSTOMER, CREATE_PROJECT, UPDATE_CUSTOMER, FOLLOWUPDATE } from '../services/grapgql/mutation';
import { v4 as uuidv4 } from 'uuid';
// import { withApollo } from '@apollo/react-hoc';
import { AuthContext } from '../context/auth';
import { withRouter } from 'react-router-dom';
import { GET_CUSTOMER_ID_DATA, ALLMASTEREVENT, SALESPERSON, MASTER_COUNTRY_CODE } from '../services/grapgql/query';
import { GRAPHQL_URL, API_URL } from '../config/index';
import * as axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import CircularProgress from '@material-ui/core/CircularProgress';
import CustomizedSnackbars from '../components/snackbar/index';
const LeadSource = [
  {
    value: '  ',
    label: 'None',
  },
  {
    value: 'IVRCalls',
    label: 'IVR Calls',
  },
  {
    value: 'Facebook',
    label: 'Facebook',
  },
  {
    value: 'Webchat',
    label: 'Webchat',
  },
  {
    value: 'Webform',
    label: 'Webform',
  },
  {
    value: 'Instagram',
    label: 'Instagram',
  },
  {
    value: 'Mail',
    label: 'Mail',
  },
  {
    value: 'Walkin',
    label: 'Walkin',
  },
  {
    value: 'Reference',
    label: 'Reference',
  },
  {
    value: 'BDMLeads',
    label: 'BDM Leads',
  },
  {
    value: 'Canvera',
    label: 'Canvera',
  },
  {
    value: 'Wedmegood',
    label: 'Wedmegood',
  },
  {
    value: 'GoogleBusiness',
    label: 'Google Business',
  },
  {
    value: 'IVRWhatsapp',
    label: 'Whatsapp',
  },

];

const EventTypeJson = EventType;
class ComposedTextField extends Component {
  constructor(props) {
    super(props)
    // this.myRef = React.createRef();
    this.state = {
      SalesPerson: [{
        value: '  ',
        label: 'None',
      }],
      unmounted: false,
      follow_up_date: null,
      snackBarOpen: false,
      snackbarMessage: "",
      snackbarColor: "",
      isLoading: false,
      name: '',
      phNumber: '',
      email: '',
      address: '',
      selectedDate: new Date().toDateString(),
      checked: false,
      startTime: '07:30',
      endTime: '07:30',
      statusOfLead: 'CAPTURED',
      eventType: [],
      sendEventType: [],
      leadSource: '',
      shootDetails: '',
      errors: false,
      see: this.props.see,
      sees: this.props.sees,
      master_event: [],
      project_id: '',
      createdOn: '',
      project_status: '',
      serialNo: "",
      whatsappnumber: "",
      facebookId: "",
      instaId: "",
      salesPerson: '',
      phoneno_code: '+091(IND)',
      whatsapp_code: '+091(IND)',
      master_country_code: [
        {
          value: "+091(IND)",
          label: "+091(IND)"
        }
      ],
      regexEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error: {
        eventType: false,
        name: false,
        phNumber: false,
        address: false,
        leadSource: false,
        // shootDetails: false,
        email: false,
        //   whatsappnumber:false,
        // facebookId:false,
        // instaId:false,
        salesPerson: false,
      },
      errorMsg: {
        eventType: 'Please fill this field',
        name: 'Enter your name',
        phNumber: 'Enter your phone number',
        address: 'Enter your address',
        leadSource: 'Please fill this field',
        // shootDetails: 'Enter the shoot details',
        email: 'Enter your emailid',
        //   whatsappnumber:'Please fill this field',
        // facebookId:'Please fill this field',
        // instaId:'Please fill this field',
        salesPerson: 'Please fill this field',
      },
      ...(this.props.see !== false ? this.props : {})
    };
  }
  componentDidMount() {
    if (this.props.see) {
      this.editLeadData();
    }
    this.handleMasterEvent();
    this.handleSalesPerson();
    this.country_codes();

  }
  componentWillUnmount() {
    this.setState({
      unmounted: true
    });

  }
  handleSalesPerson = () => {
    axios.post(GRAPHQL_URL, { query: SALESPERSON })
      .then(salesman => {
        let SalesPerson = [];
        let salesPersonlist = salesman.data.data.allMasterRoles?.nodes?.map(saleman_list => {
          let salesPerson = saleman_list?.userProfilesByRoleId?.nodes?.map(salesman => {
            SalesPerson.push(
              {
                value: salesman.name,
                label: salesman.name
              }
            )
            return salesman;
          })
          return saleman_list;
        })
        SalesPerson.unshift({
          value: '  ',
          label: 'None',
        })
        if (this.state.unmounted === false) {
          this.setState({
            SalesPerson
          })
        }
      })
  }
  handleMasterEvent = () => {
    axios.post(GRAPHQL_URL, { query: ALLMASTEREVENT })
      .then(response => {
        if (this.state.unmounted) return;
        this.setState({
          master_event: response.data.data.allMasterEvents.nodes
        })
      });
  }
  country_codes = () => {
    axios.post(GRAPHQL_URL, { query: MASTER_COUNTRY_CODE })
      .then(country_code => {
        if (this.state.unmounted) return;
        let codes = country_code?.data?.data?.allMasterCountryCodes?.nodes?.map(code => {
          return {
            value: code.code + '(' + code.countryShortName + ')',
            label: code.code + '(' + code.countryShortName + ')'
          }
        });
        this.setState({
          master_country_code: codes
        })
      })
  }
  editLeadData = () => {
    axios.post(GRAPHQL_URL, { query: GET_CUSTOMER_ID_DATA, variables: { id: this.props.match.params.id } })
      .then(res => {
        if (this.state.unmounted) return;
        if (res) {
          const form_api = res.data.data.customerById;
          let master_event = form_api && form_api.projectsByCustomerId.nodes[0] && form_api.projectsByCustomerId.nodes[0].customerByCustomerId?.projectEventsByCustomerId.nodes.map(service => {
            return {
              // id: service.id,
              id: service.eventId,
              eventName: service.masterEventByEventId.eventName,
              // is_active: service.isActive
            }
          });
          let sendEventType = form_api && form_api.projectsByCustomerId.nodes[0] && form_api.projectsByCustomerId.nodes[0].customerByCustomerId?.projectEventsByCustomerId.nodes.map(service => {
            let eventJsonValue = JSON.parse(JSON.stringify(EventTypeJson[service.masterEventByEventId.eventName]));

            let eventsValue = eventJsonValue?.map(mapData => {
              if (mapData.key === "bride_name") {
                mapData.value = service?.brideName;
              }
              if (mapData.key === "groom_name") {
                mapData.value = service?.groomName;
              }
              if (mapData.key === "event_start_date") {
                mapData.value = service?.eventStartDate;
              }
              if (mapData.key === "event_end_date") {
                mapData.value = service?.eventEndDate;
              }
              if (mapData.key === "type_of_wedding") {
                mapData.value = service?.typeOfWedding;
              }
              if (mapData.key === "venue") {
                mapData.value = service?.venue;
              }
              if (mapData.key === "location") {
                mapData.value = service?.location;
              }
              if (mapData.key === "no_of_people") {
                mapData.value = service?.noOfPeople;
              }
              if (mapData.key === "other_function_details") {
                mapData.value = service?.otherFunctionDetails
              }
              return mapData;
            })
            eventsValue.unshift({ id: service.eventId, event_name: service.masterEventByEventId.eventName, project_event_id: service.id })
            return eventsValue;
          });
          let eventType = JSON.parse(JSON.stringify(master_event));
          let duplicateSentEventType = JSON.parse(JSON.stringify(sendEventType));
          //  eventType =eventType&& eventType.filter(filter_event=>filter_event.is_active===true);
          this.setState({
            follow_up_date: form_api?.followUpDate,
            name: form_api && form_api.name,
            phNumber: form_api?.mobile.split(' ')[0],
            phoneno_code: form_api?.mobile.split(' ')[1] ? form_api?.mobile.split(' ')[1] : "+091(IND)",
            email: form_api && form_api.email,
            createdOn: form_api && form_api.createdAt,
            address: form_api && form_api.eventAddress,
            serialNo: form_api?.serialNo,
            project_id: form_api && form_api.projectsByCustomerId.nodes[0] && form_api.projectsByCustomerId.nodes[0].id,
            project_status: form_api && form_api.projectsByCustomerId.nodes[0] && form_api.projectsByCustomerId.nodes[0].status,
            leadSource: form_api && form_api.source,
            shootDetails: form_api && form_api.shootDetails,
            whatsappnumber: form_api?.whatsappNumber !== null && form_api?.whatsappNumber.trim().length > 0 ? form_api.whatsappNumber.split(' ')[0] : '',
            whatsapp_code: form_api?.whatsappNumber !== null && form_api?.whatsappNumber.split(" ")[1] ? form_api.whatsappNumber.split(' ')[1] : '+091(IND)',
            facebookId: form_api && form_api.facebookId,
            instaId: form_api && form_api.instaId,
            salesPerson: form_api && form_api.salesPerson,
            sendEventType,
            eventType,
            duplicateSentEventType
            // master_event
          });
        }
      })
  }
  handleChange = name => event => {
    const state = this.state;
    if (typeof event.target.value === "string" && event.target.value.trim().length > 0) {
      if (name === "email" && !event.target.value.match(this.state.regexEmail)) {
        state.error.email = true;
        state.errorMsg.email = "Email address is invalid";
      }
      else if (name === "phNumber" && event.target.value.trim().length <= 9) {
        state.error.phNumber = true;
        state.errorMsg.phNumber = "Phone number must be 10 digit";
      }
      else {
        state.error[name] = false;
      }
    } else {
      if (name === "email") {
        state.errorMsg.email = "Enter your emailid";
      } else if (name === "phNumber") {
        state.errorMsg.phNumber = "Enter your phone number";
      }
      state.error[name] = true;
    }
    if (this.state.unmounted) return;
    this.setState({
      ...state,
      [name]: event.target.value,
    });
    // console.log([name]+':' +event.target.value);
  };
  AutohandleChange = name => (event, value) => {
    // this.myRef.current.focus();
    const state = this.state;
    if (typeof value === "object" && value.length > 0) {
      state.error[name] = false;
    } else {
      state.error[name] = true;
    }
    let autoValue = value;
    let pushEventValue = [];
    autoValue.map(auto_val => {
      let localUpdate = state.sendEventType;
      let check = state.sendEventType.some(send_evn => send_evn[0].id === auto_val.id);
      if (check) {
        pushEventValue.push(localUpdate.filter(loc_data => loc_data[0].id === auto_val.id)[0])
      } else {
        EventTypeJson[auto_val.eventName].unshift({ id: auto_val?.id, event_name: auto_val?.eventName })
        pushEventValue.push(JSON.parse(JSON.stringify(EventTypeJson[auto_val.eventName])));
      }

      // pushEventValue.push({
      //   id: auto_val.id,
      //   event_name: auto_val.eventName,
      //   event_start_date: null,
      //   // event_start_time:null,
      //   event_end_date: null,
      //   // event_end_time: null,
      //   error: {
      //     event_start_date: false,
      //     // event_start_time:false,
      //     event_end_date: false,
      //     // event_end_time: false
      //   },
      //   errorMsg: {
      //     event_start_date: "select the date",
      //     event_end_date: "select the date"
      //   }

      // })

      return auto_val;
    })
    if (this.state.unmounted) return;
    this.setState({
      ...state,
      [name]: value,
      sendEventType: pushEventValue
    });
    // console.log([name]+':' +event.target.value);
  };
  handleDateChange = (date) => {

    if (this.state.unmounted) return;
    this.setState({ selectedDate: date._d })

    // this.setState({updatedDate: date._d})

  };
  handleForEventTypeChange = (id, value, name) => {
    // if(value.getMilliseconds()<=new Date().getMilliseconds()){
    //   return;
    // }
    let selectEvent = this.state.sendEventType;
    selectEvent = selectEvent?.map(select_datas => {
      return select_datas?.map(select_data => {
        if (id === select_datas[0]?.id) {
          if (name === "event_start_date" || name === "event_end_date") {
            let selectStartDateValue = select_datas.filter(findStartDate => findStartDate.key === "event_start_date")[0];
            if (value.getTime() <= new Date().getTime()) {
              if (name === select_data?.key) {
                select_data.error = true;
              }
              if (name === "event_end_date") {
                if (selectStartDateValue?.value === null) {
                  if (name === select_data?.key) {
                    select_data.errorMsg = "please select start date";

                  }
                } else {
                  if (name === select_data?.key) {
                    select_data.value = null;

                    select_data.errorMsg = "please select valid time";

                  }
                }
              } else {
                if (name === select_data?.key) {
                  select_data.value = null;
                  select_data.errorMsg = "please select valid time";

                }

              }
            } else {
              if (name === "event_end_date") {
                if (selectStartDateValue?.value === null) {
                  if (name === select_data?.key) {
                    select_data.errorMsg = "please select start date";
                    select_data.error = true;
                  }

                } else {
                  if (new Date(selectStartDateValue.value).getTime() >= value.getTime()) {
                    if (name === select_data?.key) {
                      select_data.error = true;
                      select_data.value = null;
                      select_data.errorMsg = "please select valid time";
                    }

                  } else {
                    if (name === select_data?.key) {
                      select_data.value = value;
                      select_data.error = false;
                    }
                  }
                }
              } else {
                if (name === select_data?.key) {
                  select_data.value = value;
                  select_data.error = false;
                }

              }
            }
          } else {
            if (name === select_data?.key) {
              select_data.value = value
            }
          }
        }
        return select_data;
      })
    })
    if (this.state.unmounted) return;
    this.setState({
      sendEventType: selectEvent
    })
  }
  handleToggle = () => {
    let { checked } = this.state;
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    if (checked === false) {
      checked = true
    } else {
      checked = false
    }
    if (this.state.unmounted) return;

    this.setState({
      checked
    });
  };


  // check = () => {
  //   alert('kdfjkj')
  //   this.setState({
  //     see: false
  //   })
  // }
  // validationCheck = ()=>{
  //   let formFields = ["name","phNumber","email","address","eventType","leadSource","shootDetails"]
  //   let error = {};
  //   formFields.forEach(field=>{
  //     if(typeof this.state[field]==="string" && this.state[field].trim().length >0 || typeof this.state[field]==="object" && this.state[field].length>0){
  //       error[field] = false;
  //     }else{
  //       error[field] = true;

  //     }
  //   });
  //     this.setState({
  //         error
  //       })
  // }
  handleSubmit = async (query, contextValue, datasee) => {
    if (datasee) {
      this.setState({
        see: false
      })
    } else {
      let formFields = ["name", "phNumber", "email", "address", "eventType", "leadSource", "salesPerson"]
      let error = {};
      const changeValue = this.state;
      // changeValue.isLoading = true;
      formFields.forEach(field => {
        if ((typeof this.state[field] === "string" && this.state[field].trim().length > 0) || (typeof this.state[field] === "object" && this.state[field].length > 0)) {
          if (field === "email" && !this.state[field].match(this.state.regexEmail)) {
            error[field] = true;
            changeValue.errorMsg.email = "Email address is invalid";
          } else if (field === "phNumber" && this.state.phNumber.length < 10) {
            error[field] = true;
            changeValue.errorMsg.phNumber = "Phone number must be 10 digit";
          }
          else {
            error[field] = false;
          }

        } else {
          if (field === "email") {
            changeValue.errorMsg.email = "Enter your emailid";
          } else if (field === "phNumber") {
            changeValue.errorMsg.phNumber = "Enter your phone number";

          }
          error[field] = true;
        }
      });
      let eventTypeDateStatus = true;
      let sendEventType = this.state.sendEventType;

      sendEventType = sendEventType?.map(eventDatas => {
        let duplicateEventStartDate = eventDatas?.filter(dup_event => dup_event.key === "event_start_date")[0];
        // console.log(duplicateEventStartDate)
        return eventDatas?.map(eventData => {
          if (eventData.value === null || String(eventData?.value).trim().length === 0) {
            eventData.error = true;
            eventTypeDateStatus = false

          } else {
            if (eventData.key === 'event_end_date') {
              if (new Date(duplicateEventStartDate.value).getTime() > new Date(eventData.value).getTime()) {
                eventData.error = true;
                eventData.value = null;
                eventTypeDateStatus = false
              } else {
                eventData.error = false;
              }
            } else {
              eventData.error = false;
            }


          }
          return eventData;
        })
      })
      let errorValues = Object.values(error);
      let errorStatus = errorValues.some(error_data => error_data === true)
      if (!errorStatus) {
        if (this.state.unmounted) return;
        this.setState({
          isLoading: true
        })
        let customerVariable = {
          id: this.props.see ? this.props.match.params.id : uuidv4(),
          name: this.state.name,
          mobile: `${this.state.phNumber} ${this.state.phoneno_code}`,
          email: this.state.email,
          source: this.state.leadSource.toUpperCase(),
          profile_id: contextValue.user.profile_id,
          event_address: this.state.address,
          shoot_details: this.state.shootDetails,
          whatsapp_number: this.state.whatsappnumber.trim().length > 0 ? `${this.state.whatsappnumber} ${this.state.whatsapp_code}` : this.state.whatsappnumber,
          facebook_id: this.state.facebookId,
          insta_id: this.state.instaId,
          sales_person: this.state.salesPerson,
          created_at: new Date(),
          updated_at: new Date()
        }
        let projectVariable = {
          id: uuidv4(),
          customer_id: '',
          created_at: new Date(),
          updated_at: new Date(),
          profile_id: contextValue.user.profile_id,
          final_quote_id: null
        }
        if (this.props.see && eventTypeDateStatus) {
          delete customerVariable.created_at;
          delete customerVariable.updated_at;
          delete projectVariable.created_at;
          delete projectVariable.updated_at;
          delete projectVariable.customer_id;
          delete projectVariable.profile_id;
          delete projectVariable.final_quote_id;
          // let modify_master_event = this.state.master_event;
          // modify_master_event = modify_master_event.map(master_event=>{
          //   this.state.eventType.some(select_event_type=>select_event_type.id===master_event.id) ? master_event.is_active = true: master_event.is_active = false;
          //   return master_event;
          // })
          let dublicate_event = this.state.duplicateSentEventType;
          let mapeventtype = this.state.sendEventType?.map(type => {
            if (typeof type[0].project_event_id !== 'undefined') {
              dublicate_event = dublicate_event?.filter(fill => fill[0].project_event_id !== type[0].project_event_id);
            }
            return type;
          })
          // console.log(dublicate_event,this.state.sendEventType);
          // debugger;
          await query.mutate({ mutation: UPDATE_CUSTOMER, variables: customerVariable }).then(res => {
            if (res !== null) {
              // changeValue.see = true;
              // this.setState({
              //   isLoading: false
              // });
              axios.post(`${API_URL}/api/v1/event/update_event_type`, { event_types: this.state.sendEventType, customer_id: this.props.match.params.id, profile_id: contextValue.user.profile_id, delete_event: dublicate_event })
                .then(eventTypeRes => {
                  if (eventTypeRes !== null) {
                    if (this.state.unmounted) return;

                    // changeValue.see = true;
                    this.props.sendMsg({ text: `${contextValue.user.name} updated customer details on ${moment(new Date()).format('Do MMMM YYYY, h:mm a')}`, status: true })
                    this.props.snackBarOpen({ color: "success", message: "You have updated Customer details successfully." })
                    this.props.getCustomerData();
                    this.editLeadData();
                    this.props.getAllQuote(this.props.match.params.id);
                    this.setState({
                      isLoading: false,
                      see: true
                    });
                  }
                }).catch(console.error)
            }
          }).catch(console.error)

        } else if (eventTypeDateStatus) {
          let modify_event_type = this.state.sendEventType;
          // modify_event_type = modify_event_type.map(event_type=>{
          //    event_type.is_active = true;
          //    return event_type;
          // })
          await query.mutate({ mutation: CREATE_CUSTOMER, variables: customerVariable }).then(res => {
            projectVariable.customer_id = res.data.createCustomer.customer.id;
            if (res !== null) {
              query.mutate({ mutation: CREATE_PROJECT, variables: projectVariable }).then(res1 => {
                axios.post(`${API_URL}/api/v1/event/event_type`, { profile_id: contextValue.user.profile_id, customer_id: res.data.createCustomer.customer.id, event_types: modify_event_type })
                  .then(eventTypeRes => {
                    if (this.state.unmounted) return;

                    if (eventTypeRes) {
                      this.snackBarOpen({ color: "success", message: "You have captured New Lead details successfully." })
                      changeValue.isLoading = true;
                      setTimeout(() => { this.props.history.push("/app/all-leads"); }, 1000)

                    }
                  })
              }).catch((error) => { changeValue.isLoading = false; console.log(error) });
            }
          }).catch((error) => { changeValue.isLoading = false; console.log(error) })
        }
      }
      if (this.state.isLoading) {
        changeValue.isLoading = true;
      }
      if (this.state.unmounted) return;

      this.setState({
        ...changeValue,
        error,
        sendEventType
      })
    }
  }
  statusformat = (status) => {
    let backendStatus = ['CAPTURED', 'FOLLOWUP', "QUOTESENT", 'NEGOTIATION', 'QUOTEFINAL', 'QUOTECONFIRMED', 'ONHOLD', 'DELAYED', 'CANCELLED', 'QUOTECONFIRMED', 'ADVANCEDPAID'];
    let frontendStatus = ['Captured', 'Follow-Up', "Quote Sent", 'Negotiation', 'Quote Final', 'Quote Confirmed', 'On Hold', 'Delayed', 'Cancelled', 'Quote Confirmd', 'Advance Paid'];
    let send_value;
    let check = backendStatus.map((data, index) => {
      if (status === data) {
        send_value = frontendStatus[index];
      }
      return data;
    })
    return send_value;
  }
  snackBarOpen = (params) => {
    if (this.state.unmounted) return;

    this.setState({
      snackBarOpen: true,
      snackbarColor: params.color,
      snackbarMessage: params.message
    })
  }
  snackBarClose = () => {
    if (this.state.unmounted) return;

    let state = this.state;
    state.snackBarOpen = false
    this.setState({
      ...state

    })
  }
  handleFollowUpDate = (date) => {
    let contextValue = this.context;
    let state = this.state;
    state.follow_up_date = date;
    axios.post(GRAPHQL_URL, { query: FOLLOWUPDATE, variables: { id: this.props.match.params.id, follow_up_date: date } })
      .then(res => {
        if (this.state.unmounted) return;

        // alert('i am here')
        this.props.snackBarOpen({ color: "success", message: "You have updated Follow up date successfully." });
        this.props.sendMsg({ text: `${contextValue.user.name} updated customer Follow up date on ${moment(new Date()).format('Do MMMM YYYY, h:mm a')}`, status: true })


        this.setState({
          ...state
        });
      })
      .catch(error => { console.log(error) })

  }
  render() {
    const contextValue = this.context;
    let data = this.state;
    // console.log(contextValue)

    return (
      <ApolloConsumer>

        {
          query => <div>


            <CardBox
              styleName="col-lg-12 col-md-12 col-sm-12 p-0"

            >

              <div>
                <div>

                  <Grid item container justify="space-around"
                    alignItems="stretch" spacing={2} className="formHeader">
                    <Grid item container xs={12} lg={3} md={3}>
                      {this.props.see ?
                        <>
                          <Grid item xs={4} lg={4} md={4}>
                            <label>Id:</label>
                          </Grid>
                          <Grid item xs={8} lg={8} md={8}>
                            <label>{data.serialNo?.toUpperCase()}</label>
                          </Grid>
                          <Grid item xs={4} lg={4} md={4}>
                            <label>Created On:</label>
                          </Grid>
                          <Grid item xs={8} lg={8} md={8}>
                            <label>{moment(this.state.createdOn).format('Do MMMM YYYY')}</label>
                          </Grid>

                        </>
                        : ""
                      }

                    </Grid>
                    <Grid item xs={12} container lg={3} md={3}>
                      {
                        this.props.see ?
                          <>
                            <Grid item xs={6} lg={6} md={6} style={{ textAlign: "center" }}>
                              <label>Status:</label>
                            </Grid>
                            <Grid item xs={6} lg={6} md={6}>
                              <label>{this.statusformat(this.state.project_status)}</label>
                            </Grid>
                            {/* <Grid item xs={2} lg={2} md={2}></Grid> */}

                          </> : ""
                      }
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} style={{ marginTop: "-7px" }}>
                      {
                        this.props.see ?
                          <>
                            <Grid item xs={12} lg={12} md={12} >
                              <DateAndTimePickers className="disableDatePicker" style={{ width: '100%' }} error={""} errorMsg={""} minDate={new Date()} see={false} label={'Follow Up Date & Time'} selectedDate={this.state.follow_up_date} onChange={(e) => this.handleFollowUpDate(e._d)} />

                            </Grid>
                          </> : ""
                      }
                    </Grid>
                    <Grid item xs={12} lg={3} md={3}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '12px' }}>
                        <div>
                          {
                            contextValue?.user?.user_role === 5 ? " " : this.props.see ?
                              data.see ?
                                <Button type="submit" onClick={() => { this.handleSubmit(query, contextValue, data.see) }} variant="contained" style={{ backgroundColor: '#3f51b5' }} className="jr-btn  text-white btn-format"
                                >Edit</Button>
                                : <>
                                  <Button type="submit" variant="contained" disabled={this.state.isLoading} style={{ backgroundColor: '#3f51b5', marginRight: "5px" }} onClick={() => { this.handleSubmit(query, contextValue, data.see) }} className="jr-btn  text-white btn-format" >{this.state.isLoading ? "Saving..." : "Save"}</Button>
                                  <Button style={{ border: "1px solid #e4d9d9" }} className="jr-btn btn-format" onClick={() => {
                                    this.editLeadData();
                                    if (this.state.unmounted) return;
                                    this.setState({ see: true })
                                  }}>Cancel</Button>
                                </>

                              : <Button type="submit" variant="contained" disabled={this.state.isLoading} style={{ backgroundColor: '#3f51b5' }} onClick={() => { this.handleSubmit(query, contextValue, data.see) }} className="jr-btn  text-white btn-format" >{this.state.isLoading ? <>Creating...</> : "Create"}</Button>
                          }
                        </div>&nbsp;
                <div>
                          <Button variant="contained" style={{ backgroundColor: ' rgb(127, 128, 136)' }} onClick={() => { this.props.history.push("/app/all-leads") }} className="jr-btn  text-white btn-format" >Back</Button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>


                  <Grid container
                    direction="column"
                    justify="center"
                    alignItems="stretch"

                  >
                    <Grid item container justify="space-around"
                      alignItems="stretch" spacing={2} className="spaceAssignToForm">
                      <Grid item xs={12} lg={4} md={4}>
                        <TextField
                          // 
                          // pattern="[0-9]{2}"
                          // onInvalid={this.handleInvalid('customerName')}
                          helperText={this.state.error.name ? this.state.errorMsg.name : ''}
                          error={this.state.error.name ? true : false}
                          id="outlined-password-input"
                          label="Customer Name"
                          style={{ width: '100%' }}
                          type="text"
                          // title="text inputs only allowed"
                          disabled={data.see}
                          autoComplete="new-password"
                          margin="dense"
                          variant="outlined"
                          inputProps={{
                            maxLength: 60,
                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                          }}
                          // className={this.props.className}
                          value={data.name}
                          onChange={this.handleChange('name')}
                        />
                      </Grid>
                      <Grid container item xs={12} lg={4} md={4} spacing="1">
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Code"
                            // helperText={this.state.error.salesPerson ? this.state.errorMsg.salesPerson : ''}
                            // error={this.state.error.salesPerson ? true : false}
                            value={this.state.phoneno_code}
                            onChange={this.handleChange('phoneno_code')}
                            SelectProps={{
                              native: true,
                            }}
                            inputProps={{
                              style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                            }}
                            margin="dense"
                            variant="outlined"
                            disabled={data.see}

                          >
                            {this.state.master_country_code?.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                          <TextField
                            id="outlined-password-input"
                            // error={this.state.error}
                            helperText={this.state.error.phNumber ? this.state.errorMsg.phNumber : ''}
                            error={this.state.error.phNumber ? true : false}
                            label="Phone Number"
                            type="number"
                            // title="please enter only numbers in digits"
                            autoComplete="new-password"

                            margin="dense"
                            variant="outlined"
                            style={{ width: '100%' }}
                            // onKeyUp={ (evt) =>  evt.which === 38 && evt.preventDefault() }

                            onKeyDown={(evt) => (evt.which === 40 || evt.which === 38) && evt.preventDefault()}
                            onInput={(e) => {

                              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            inputProps={{
                              style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                            }}
                            disabled={data.see}
                            value={data.phNumber}
                            // className={this.props.className}
                            onChange={this.handleChange('phNumber')}



                          />
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} lg={4} md={4} spacing="1">
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Code"
                            // helperText={this.state.error.salesPerson ? this.state.errorMsg.salesPerson : ''}
                            // error={this.state.error.salesPerson ? true : false}
                            value={this.state.whatsapp_code}
                            onChange={this.handleChange('whatsapp_code')}
                            SelectProps={{
                              native: true,
                            }}
                            inputProps={{
                              style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                            }}
                            margin="dense"
                            variant="outlined"
                            disabled={data.see}

                          >
                            {this.state.master_country_code?.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                          <TextField
                            id="outlined-password-input"
                            // error={this.state.error}
                            // helperText={this.state.error.whatsappnumber ? this.state.errorMsg.whatsappnumber : ''}
                            // error={this.state.error.whatsappnumber ? true : false}
                            label="Whatsapp Number"
                            type="number"
                            // title="please enter only numbers in digits"
                            autoComplete="new-password"

                            margin="dense"
                            variant="outlined"
                            style={{ width: '100%' }}
                            onKeyDown={(evt) => (evt.which === 40 || evt.which === 38) && evt.preventDefault()}

                            onInput={(e) => {
                              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            inputProps={{
                              style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                            }}
                            disabled={data.see}
                            value={data.whatsappnumber}
                            // className={this.props.className}
                            onChange={this.handleChange('whatsappnumber')}



                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container justify="space-around"
                      alignItems="stretch" spacing={2} className="spaceAssignToForm" >
                      <Grid item xs={12} lg={4} md={4}>
                        <TextField
                          id="outlined-password-input"
                          helperText={this.state.error.email ? this.state.errorMsg.email : ''}
                          error={this.state.error.email ? true : false}
                          label="Email Id"
                          style={{ width: '100%' }}
                          type="email"
                          autoComplete="current-password"
                          margin="dense"
                          variant="outlined"
                          disabled={data.see}
                          inputProps={{
                            maxLength: 100,
                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                          }}

                          // className={this.props.className}
                          value={data.email}
                          onChange={this.handleChange('email')}

                        />
                      </Grid>
                      <Grid item xs={12} lg={4} md={4} style={{ paddingLeft: "15px" }}>
                        <TextField
                          // 
                          // pattern="[0-9]{2}"
                          // onInvalid={this.handleInvalid('customerName')}
                          // helperText={this.state.error.facebookId ? this.state.errorMsg.facebookId : ''}
                          // error={this.state.error.facebookId ? true : false}
                          id="outlined-password-input"
                          label="FB ID"
                          style={{ width: '100%' }}
                          type="text"
                          // title="text inputs only allowed"
                          disabled={data.see}
                          autoComplete="new-password"
                          margin="dense"
                          variant="outlined"
                          inputProps={{
                            maxLength: 60,
                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                          }}
                          // className={this.props.className}
                          value={data.facebookId}
                          onChange={this.handleChange('facebookId')}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4} md={4} style={{ paddingLeft: "15px" }}>
                        <TextField
                          // 
                          // pattern="[0-9]{2}"
                          // onInvalid={this.handleInvalid('customerName')}
                          // helperText={this.state.error.instaId ? this.state.errorMsg.instaId : ''}
                          // error={this.state.error.instaId ? true : false}
                          id="outlined-password-input"
                          label="Insta ID"
                          style={{ width: '100%' }}
                          type="text"
                          // title="text inputs only allowed"
                          disabled={data.see}
                          autoComplete="new-password"
                          margin="dense"
                          variant="outlined"
                          inputProps={{
                            maxLength: 60,
                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                          }}
                          // className={this.props.className}
                          value={data.instaId}
                          onChange={this.handleChange('instaId')}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container lg={12} md={12} className="textareafieldSpacing">
                      <TextField
                        id="outlined-multiline-static"
                        label="Shoot Details"
                        // helperText={this.state.error.shootDetails ? this.state.errorMsg.shootDetails : ''}
                        // error={this.state.error.shootDetails ? true : false}
                        multiline
                        rows="3"
                        style={{ width: '100%' }}
                        autoComplete="new-multiline-static"
                        inputProps={{
                          maxLength: 2000,
                          style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                        }}
                        value={data.shootDetails}
                        margin="dense"
                        variant="outlined"
                        disabled={data.see}
                        onChange={this.handleChange("shootDetails")}

                      />
                    </Grid>
                    <Grid item container lg={12} md={12} className="textareafieldSpacing">


                      <TextField
                        id="outlined-multiline-static"
                        label="Address of the Customer"
                        helperText={this.state.error.address ? this.state.errorMsg.address : ''}
                        error={this.state.error.address ? true : false}
                        multiline
                        rows="3"
                        style={{ width: '100%' }}
                        margin="dense"
                        variant="outlined"
                        disabled={data.see}
                        inputProps={{
                          maxLength: 1000,
                          style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                        }}
                        value={data.address}
                        onChange={this.handleChange('address')}

                      />

                    </Grid>
                    <Grid item container justify="space-around"
                      alignItems="stretch" spacing={2} className="textareafieldSpacing">

                      <Grid item xs={12} lg={6} md={6}>

                        <TextField
                          id="outlined-select-currency-native"
                          select
                          label="Lead Source"
                          helperText={this.state.error.leadSource ? this.state.errorMsg.leadSource : ''}
                          error={this.state.error.leadSource ? true : false}
                          value={this.state.leadSource}
                          onChange={this.handleChange('leadSource')}
                          SelectProps={{
                            native: true,
                          }}
                          inputProps={{
                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                          }}
                          margin="dense"
                          variant="outlined"
                          style={{ width: '100%' }}
                          disabled={data.see}

                        >
                          {LeadSource.map(option => (
                            <option key={option.value} value={option.value.toUpperCase()}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>


                      </Grid>
                      <Grid item xs={12} lg={6} md={6}>

                        <TextField
                          id="outlined-select-currency-native"
                          select
                          label="Sales Person"
                          helperText={this.state.error.salesPerson ? this.state.errorMsg.salesPerson : ''}
                          error={this.state.error.salesPerson ? true : false}
                          value={this.state.salesPerson}
                          onChange={this.handleChange('salesPerson')}
                          SelectProps={{
                            native: true,
                          }}
                          inputProps={{
                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                          }}
                          margin="dense"
                          variant="outlined"
                          style={{ width: '100%' }}
                          disabled={data.see}

                        >
                          {this.state.SalesPerson?.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>


                      </Grid>
                    </Grid>
                    <Grid item justify="space-around"
                      spacing={2} style={{ width: '100%' }} className="textareafieldSpacing">
                      {
                        // this.props.see ? '' :
                        <Grid item xs={12} lg={12} md={12}>
                          <Autocomplete
                            multiple
                            // freeSolo
                            filterSelectedOptions
                            id="tags-standard"
                            options={this.state.master_event?.length > 0 ? this.state.master_event : []}
                            getOptionLabel={option => option.eventName}
                            value={this.state.eventType?.length > 0 ? this.state.eventType : []}
                            // inputValue={this.state.eventType}
                            filterOptions={(options, value) => options}
                            getOptionSelected={(option, value) => option.eventName === value.eventName}
                            onInputChange={(event, value, reson) => {
                              console.log(value, 'onInputChange')
                            }}
                            onChange={this.AutohandleChange('eventType')}
                            // error={this.state.errors.eventType}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip variant="outlined" label={option.eventName} {...getTagProps({ index })} />
                              ))
                            }
                            // ref={this.myRef}
                            disabled={data.see}
                            renderInput={params => (
                              <TextField
                                {...params}
                                variant="outlined"
                                margin="dense"
                                label="Choose Event Type"
                                placeholder={this.state.eventType.length > 0 ? "" : "Choose Event Type"}
                                helperText={this.state.error.eventType ? this.state.errorMsg.eventType : ''}
                                error={this.state.error.eventType ? true : false}

                              />
                            )}
                          />
                        </Grid>
                      }
                    </Grid>
                  </Grid>
                </div>
                <div style={{ marginTop: "5px" }} >

                  <Grid container
                  // direction="column"
                  // justify="center"
                  // alignItems="stretch"
                  >
                    <Grid item container
                    >
                      {
                        this.state.sendEventType?.length > 0 ?
                          this.state.sendEventType?.map(eventDatas => <>
                            <Grid item container alignItems="stretch" spacing={1} className="eventTypeBorder" >


                              <Grid item xs={12} sm={12} md={12}>{eventDatas[0].event_name}</Grid>
                              {
                                eventDatas?.map(eventData => (
                                  <>

                                    {
                                      eventData?.type === 1 ? <Grid item xs={12} lg={eventData?.grid} md={eventData?.grid} >
                                        <TextField
                                          // 
                                          // pattern="[0-9]{2}"
                                          // onInvalid={this.handleInvalid('customerName')}
                                          helperText={eventData.error ? eventData?.errorMsg : ''}
                                          error={eventData?.error ? true : false}
                                          id="outlined-password-input"
                                          label={eventData?.placeholder}
                                          style={{ width: '100%' }}
                                          type="text"
                                          // title="text inputs only allowed"
                                          disabled={data.see}
                                          autoComplete="new-password"
                                          margin="dense"
                                          variant="outlined"
                                          inputProps={{
                                            maxLength: 60,
                                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                                          }}

                                          // className={this.props.className}
                                          value={eventData?.value}
                                          onChange={(e) => this.handleForEventTypeChange(eventDatas[0]?.id, e.target.value, eventData?.key)}
                                        />
                                      </Grid> : ""
                                    }
                                    {
                                      eventData?.type === 2 ? <Grid item xs={12} sm={12} md={eventData?.grid} className="disableDatePicker">
                                        <DateAndTimePickers style={{ width: '100%' }} error={eventData?.error} errorMsg={eventData?.errorMsg} minDate={eventData?.key === "event_start_date" ? new Date() : eventDatas.filter(findStartDate => findStartDate.key === "event_start_date")[0].value === null ? new Date() : eventDatas.filter(findStartDate => findStartDate.key === "event_start_date")[0].value} see={data.see} label={eventData?.placeholder} selectedDate={eventData?.value} onChange={(e) => this.handleForEventTypeChange(eventDatas[0]?.id, e._d, eventData?.key)} />
                                      </Grid> : ""
                                    }
                                    {
                                      eventData?.type === 3 ? <Grid item xs={12} lg={eventData?.grid} md={eventData?.grid}>

                                        <TextField
                                          id="outlined-select-currency-native"
                                          select
                                          label={eventData?.placeholder}
                                          helperText={eventData?.error ? eventData?.errorMsg : ''}
                                          error={eventData?.error ? true : false}
                                          value={eventData?.value}
                                          onChange={(e) => this.handleForEventTypeChange(eventDatas[0]?.id, e.target.value, eventData?.key)}
                                          SelectProps={{
                                            native: true,
                                          }}
                                          inputProps={{
                                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                                          }}
                                          margin="dense"
                                          variant="outlined"
                                          style={{ width: '100%' }}
                                          disabled={data.see}

                                        >
                                          {eventData?.options.map(option => (
                                            <option key={option.value} value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                                        </TextField>


                                      </Grid> : ''
                                    }
                                    {
                                      eventData?.type === 4 ? <Grid item container lg={eventData?.grid} md={eventData?.grid}>
                                        <TextField
                                          id="outlined-multiline-static"
                                          label={eventData?.placeholder}
                                          helperText={eventData?.error ? eventData?.errorMsg : ''}
                                          error={eventData?.error ? true : false}
                                          multiline
                                          rows="3"
                                          style={{ width: '100%' }}
                                          autoComplete="new-multiline-static"
                                          inputProps={{
                                            maxLength: 2000,
                                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                                          }}

                                          value={eventData?.value}
                                          margin="dense"
                                          variant="outlined"
                                          disabled={data.see}
                                          onChange={(e) => this.handleForEventTypeChange(eventDatas[0]?.id, e.target.value, eventData?.key)}

                                        />
                                      </Grid> : ""
                                    }
                                    {
                                      eventData?.type === 5 ? <Grid item xs={12} lg={eventData?.grid} md={eventData?.grid}>
                                        <TextField
                                          // 
                                          // pattern="[0-9]{2}"
                                          // onInvalid={this.handleInvalid('customerName')}
                                          helperText={eventData?.error ? eventData?.errorMsg : ''}
                                          error={eventData?.error ? true : false}
                                          id="outlined-password-input"
                                          label={eventData?.placeholder}
                                          style={{ width: '100%' }}
                                          type="number"
                                          // title="text inputs only allowed"
                                          disabled={data.see}
                                          autoComplete="new-password"
                                          margin="dense"
                                          variant="outlined"
                                          onKeyDown={(evt) => (evt.which === 40 || evt.which === 38) && evt.preventDefault()}

                                          onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                          }}
                                          inputProps={{
                                            style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }

                                          }}
                                          // className={this.props.className}
                                          value={eventData?.value}
                                          onChange={(e) => this.handleForEventTypeChange(eventDatas[0]?.id, e.target.value, eventData?.key)}
                                        />
                                      </Grid> : ""
                                    }
                                  </>))
                              }
                            </Grid>
                          </>)
                          : ""
                      }
                    </Grid>
                  </Grid>
                  {/* {
              this.state.sendEventType?.length>0 ? <>
                  <Table style={{border:"1px solid rgb(189, 189, 189)"}} justify="center"
                alignItems="stretch">
              <>
              {
                this.props.see ? <>  <TableHead  style={{fontSize:'18rem !important',backgroundColor:'white'}} >
                <TableRow >
                  <TableCell className="padspace" align="center" style={{height:"46px"}} >Event Type</TableCell>
                  <TableCell className="padspace" align="center" >Start Date&Time</TableCell>
                  <TableCell className="padspace" align="center" >End Date&Time</TableCell>
                </TableRow>
              </TableHead></> :""
              }
              </>
              <TableBody className="padspace" >
              {
                
                       this.state.sendEventType?.map((row, index) => (
                      <TableRow key={row.id} className="padspace" >
                        <TableCell align="center" className='padspace ' style={{height: "46px"}}>{row?.event_name}</TableCell>
                        <TableCell align="center" className="padspace">
                          {
                            this.props.see ? moment(row?.event_start_date).format('Do MMMM YYYY hh:mm a') : 
                            
                            <DateAndTimePickers style={{ width: '100%' }} error={row?.error?.event_start_date} errorMsg={row?.errorMsg?.event_start_date} minDate={new Date()}  see={data.see} label="Start Date&Time" selectedDate={row?.event_start_date}  onChange={(e)=>this.handleForEventTypeChange(row?.id,e._d,'event_start_date')} />

                          }
                        </TableCell>
                        <TableCell align="center" className="padspace">
                          {
                            this.props.see ?  moment( row?.event_end_date).format('Do MMMM YYYY hh:mm a')  :
                            <DateAndTimePickers style={{ width: '100%' }} error={row?.error?.event_end_date} errorMsg={row?.errorMsg?.event_end_date}  minDate={row?.event_start_date ? row?.event_start_date : new Date()  }  see={data.see} label="End Date&Time" selectedDate={row?.event_end_date} onChange={(e)=>this.handleForEventTypeChange(row?.id,e._d,'event_end_date')}/>

                          }
                        </TableCell>
                      </TableRow>
                          ))}
                       
              </TableBody>
            </Table>
              </>:''
            } */}
                </div>
              </div>
            </CardBox>
            {
              this.props.see ? '' :
                <CustomizedSnackbars open={this.state.snackBarOpen} color={this.state.snackbarColor} message={this.state.snackbarMessage} snackBarClose={this.snackBarClose} />

            }

          </div>
        }

      </ApolloConsumer>


    );
  }
}
ComposedTextField.contextType = AuthContext;
export default withRouter(ComposedTextField);