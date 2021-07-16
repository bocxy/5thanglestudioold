import React from 'react';
import ComposedTextField from 'form/form'
import InteractiveList from 'list/interactive/InteractiveList';
import 'index.css';
// import { object } from 'prop-types';
// import Wall from './socialApps/routes/Wall/index' 
import LeftAligned from 'Timeline/leftAligned/index'
import PostList from "components/wall/PostList/index";
import moment from 'moment';
// import { postList, user} from "./socialApps/routes/Wall/data";
// import { NavHashLink as NavLink } from 'react-router-hash-link';
// import { withApollo } from '@apollo/react-hoc';
// import { ApolloConsumer } from 'react-apollo';
// import { useQuery } from "@apollo/react-hooks";
import { CUSTOMER_PROJECT_QUOTES, CUSTOMER_BY_PROJECT_ID, COMMUNICATION_BY_PROJECT, CUSTOMERDETAILONLY } from '../../../services/grapgql/query';
import { UPDATE_PROJECT_FINALQUOTE, CREATE_COMMUNICATION } from '../../../services/grapgql/mutation';

import { AuthContext } from '../../../context/auth';
import { GRAPHQL_URL, API_URL } from '../../../config/index';
import * as axios from 'axios';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AlertDialog from '../../../components/AlertBox/alertbox'
import CustomizedSnackbars from '../../../components/snackbar/index';
import CircularProgress from "../../../components/CircularProgress/index";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      unmounted:false,
      alertContent: "",
      alertStatus: "",
      alertOpen: false,
      snackBarOpen: false,
      snackbarMessage: "",
      snackbarColor: "",
      circularStatus:false
    }
  }
  handleFinalized = async () => {
    await axios.post(GRAPHQL_URL, { query: CUSTOMER_BY_PROJECT_ID, variables: { id: this.props.match.params.id } })
      .then(customer_by_project_id => {
        if (customer_by_project_id) {
          if(this.state.unmounted) return;
          const project_id = customer_by_project_id.data.data.customerById.projectsByCustomerId.nodes[0];
          axios.post(GRAPHQL_URL, { query: UPDATE_PROJECT_FINALQUOTE, variables: { id: project_id && project_id.id, final_quote_id: null, status: "FOLLOWUP" } })
            .then(projectData => {
              if (projectData) {
                if(this.state.unmounted) return;
                // console.log(projectData,'check the finaly')
                this.snackBarOpen({ color: "success", message: "Quote unfinalized successfully" });
                this.sendMsg({ text: `${this.state.profile_name} unfinalized quote on ${moment(new Date()).format('Do MMMM YYYY, h:mm a')}`, status: true, mode: "status updated" })
                this.getAllQuote(this.props.match.params.id);
              }
            })
        }
      })

  }

  handleUnFinalized = async (id) => {
    await axios.post(GRAPHQL_URL, { query: CUSTOMER_BY_PROJECT_ID, variables: { id: this.props.match.params.id } })
      .then(customer_by_project_id => {
        if (customer_by_project_id) {
          if(this.state.unmounted) return;
          const project_id = customer_by_project_id.data.data.customerById.projectsByCustomerId.nodes[0];
          axios.post(GRAPHQL_URL, { query: UPDATE_PROJECT_FINALQUOTE, variables: { id: project_id && project_id.id, final_quote_id: id, status: "QUOTEFINAL" } })
            .then(projectData => {
              if (projectData) {
                if(this.state.unmounted) return;
                this.snackBarOpen({ color: "success", message: "Quote finalized successfully" });
                this.sendMsg({ text: `${this.state.profile_name} finalized quote on ${moment(new Date()).format('Do MMMM YYYY, h:mm a')}`, status: true, mode: "status updated" })
                this.getAllQuote(this.props.match.params.id);
              }
            })
        }
      })
  }
  componentDidMount() {
    const authContext = this.context;
    if(this.state.unmounted===false){
      this.setState({
        profile_id: authContext.user.profile_id,
        profile_name: authContext.user.name,
        user_role: authContext.user.user_role
      })
    }

    this.getCustomerData();
    this.getAllQuote(this.props.match.params.id);
  }
  componentWillUnmount(){
    this.setState({
      unmounted : true
    });
    
  }
  getCustomerData = () => {
    axios.post(GRAPHQL_URL, { query: CUSTOMERDETAILONLY, variables: { id: this.props.match.params.id } })
      .then(cus_res => {
        if (cus_res) {
          if(this.state.unmounted) return;
          this.setState({
            email: cus_res.data?.data?.customerById?.email,
            mobileNo: cus_res.data?.data?.customerById?.mobile.split(" ")[0],
            serialNo: cus_res.data?.data?.customerById?.serialNo,
            projectStatus: cus_res.data?.data?.customerById?.projectsByCustomerId?.nodes[0]?.status

          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  getAllQuote = async (id) => {
    const state = this.state
    await axios.post(GRAPHQL_URL, { query: CUSTOMER_PROJECT_QUOTES, variables: { id } })
      .then(all_quotes => {
        if(this.state.unmounted) return;
        let store_all_quote = all_quotes.data.data.customerById && all_quotes.data.data.customerById.projectsByCustomerId.nodes[0] && all_quotes.data.data.customerById.projectsByCustomerId.nodes[0].projectQuotesByProjectId.nodes;
        store_all_quote = store_all_quote?.map(quote => {
          //add project_event add
          quote.project_event = [...quote.projectByProjectId?.customerByCustomerId?.projectEventsByCustomerId?.nodes];
          quote.project_event = quote.project_event?.map(file_name => {
            let service_data = JSON.parse(JSON.stringify(quote.eventServicesByProjectQuoteId?.nodes));
            //add event_services name
            file_name.event_services = service_data?.filter(fil_ser => fil_ser.projectEventId === file_name.id);
            return file_name;
          });
          quote.project_event = quote.project_event.filter(newEvent=>newEvent.event_services.length!==0);
          return quote;
        });
        state.data = store_all_quote;
        state.project_id = all_quotes.data?.data?.customerById?.projectsByCustomerId?.nodes[0]?.id;
        state.finalQuote_id = all_quotes.data.data.customerById && all_quotes.data.data.customerById.projectsByCustomerId.nodes[0] && all_quotes.data.data.customerById.projectsByCustomerId.nodes[0].finalQuoteId;
        this.setState({
          ...state
        });
        this.getAllMsg();
        //all_quotes.data.data.customerById.projectsByCustomerId.nodes[0].projectQuotesByProjectId.nodes.projectQuoteServicesByProjectQuoteId.nodes
      })
  }
  handleAddQuote = async (project_quote) => {
    let params = {
      customer_id: project_quote.customer_id,
      discountGiven: project_quote.discount,
      presentValue: project_quote.baseAmt,
      totalAmount: project_quote.totalAmt,
      TaxOnTotal: project_quote.tax,
      netAmount: project_quote.netAmt,
      adjustmentAmt: project_quote.adjustmentAmt,
      projectEvents: project_quote.project_event
    }
    // console.log(JSON.stringify(params));
    await axios.post(`${API_URL}/api/v1/project/project_quote`, params)
      .then(response => {
        if (response) {
          if(this.state.unmounted) return;
          this.snackBarOpen({ color: "success", message: "Quote added successfully" });
          this.circularProcess(false);
          this.getAllQuote(project_quote.customer_id);
        }
      })
      .catch(err => {
        console.log(err);
        this.circularProcess(false);
      })
  }

  sendMsg = (params) => {

    let msg_info = {
      id: uuidv4(),
      sender_id: this.state.profile_id,
      created_at: new Date(),
      updated_at: new Date(),
      message: params.text,
      project_id: this.state.project_id,
      mode: params?.mode ? params?.mode : "internal message",
      is_internal: params?.status ? false : true
    }
    axios.post(GRAPHQL_URL, { query: CREATE_COMMUNICATION, variables: msg_info })
      .then(msg_res => {
        if (msg_res) {
          if(this.state.unmounted) return;
          this.getAllMsg();
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  getAllMsg = () => {
    axios.post(GRAPHQL_URL, { query: COMMUNICATION_BY_PROJECT, variables: { id: this.state.project_id } })
      .then(msg_res => {
        if (msg_res) {
          if(this.state.unmounted) return;
          this.setState({
            all_messages: msg_res.data.data.projectById?.communicationsByProjectId.nodes
          })
        }
      })
      .catch(err => console.log(err))
  }
  clientCommunication = (params) => {
    if (params.type === 'sms') { 
      // http://sms.scube.media/api/v2/sms/send?access_token=b0470528098a9358515e29d01b25b050&message=${params.msg}&sender=SMEDIA&to=91${this.state.mobileNo}&service=T
      if(params.msg.trim().length>0){
        axios.post(`${API_URL}/api/v1/sms_send`,{
          "message":params.msg,
          "number":this.state.mobileNo})
            .then(sms_res => {
              if(this.state.unmounted) return;
              this.sendMsg({ text: `${this.state.profile_name} sent SMS to client on ${moment(new Date()).format('Do MMMM YYYY, h:mm a')}`, status: true, mode: "sms" })
              // this.alertOpenBox({ open: true, content: "SMS sent successful", status: "success" })
              this.snackBarOpen({ color: "success", message: "SMS sent successfully" });
            })
            .catch(err => {
              // this.alertOpenBox({ open: true, content: "Network error", status: "warning" });
              this.snackBarOpen({ color: "error", message: "Network error" });
    
            })
      }else{
        this.snackBarOpen({ color: "info", message: "Please enter the message" });

      }
      
    } else if (params.type === 'email') {
      if(params.document || params.msg.trim().length>0){
        let formData = new FormData();
        const config = {
          headers: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file",params.document);
        formData.append("to", this.state.email);
        formData.append("message", params.msg); 
        // axios.post(`${API_URL}/api/v1/email/send_quote_email`, { to: [this.state.email], message: params.msg,document:params.document })
        axios.post(`${API_URL}/api/v1/email/send_quote_email`, formData, config)
          .then(email_res => {
            if (email_res) {
              if(this.state.unmounted) return;
              this.sendMsg({ text: `${this.state.profile_name} sent Email to client on ${moment(new Date()).format('Do MMMM YYYY, h:mm a')}`, status: true, mode: "email" })
              // this.alertOpenBox({ open: true, content: "Email sent successful", status: "success" });
              this.snackBarOpen({ color: "success", message: "Email sent successfully" });
  
            }
          })
          .catch(err => {
            // this.alertOpenBox({ open: true, content: "Network error", status: "warning" });
            this.snackBarOpen({ color: "error", message: "Network error" });
          })
      }else{
        this.snackBarOpen({ color: "info", message: "Please enter the message" });
      }
      
    }
  }
  alertClose = () => {
    if(this.state.unmounted) return;
    this.setState({
      alertOpen: false
    })
  }
  alertOpenBox = (params) => {
    if(this.state.unmounted) return;
    this.setState({
      alertOpen: params.open,
      alertContent: params.content,
      alertStatus: params.status
    });
  }
  snackBarOpen = (params) => {
    if(this.state.unmounted) return;
    this.setState({
      snackBarOpen: true,
      snackbarColor: params.color,
      snackbarMessage: params.message
    })
  }
  snackBarClose = () => {
    if(this.state.unmounted) return;
    let state = this.state;
    state.snackBarOpen = false
    this.setState({
      ...state

    })
  }
  circularProcess =(status)=>{
    if(this.state.unmounted) return;
    this.setState({
      circularStatus:status
    })
  }
  render() {

    // var {userDetails} = this.state;


    return (
      <>
        <div className="app-wrapper">
          {
            this.state.circularStatus ?  
            <div className="loader-view"
                style={{height: 'calc(100vh - 200px)'}}>
            <CircularProgress/>
          </div> : 
          <>
          <CustomizedSnackbars open={this.state.snackBarOpen} color={this.state.snackbarColor} message={this.state.snackbarMessage} snackBarClose={this.snackBarClose} />
          <AlertDialog alertOpen={this.state.alertOpen} alertClose={this.alertClose} alertContent={this.state.alertContent} alertStatus={this.state.alertStatus} />
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <ComposedTextField see={true} see1={true} {...this} checked={false} className="black" /> {/* form */}
            </div>
            {
              this.state.user_role === 5 || this.state.projectStatus === "ADVANCEDPAID" ? <>
                {
                  this.state.data && this.state.data.map((quote, index) =>
                    quote.id === this.state.finalQuote_id ?
                      <div className="col-lg-12 col-md-12" >
                        <InteractiveList
                          mobileNo={this.state.mobileNo}
                          headings={this.state.mobileNo+'Quote' + (this.state.data?.length - index)}
                          className="cardsInteractiveList" see={true}
                          quoteId={quote.id}
                          data={quote}
                          finace={true}
                          handleUnFinalized={this.handleUnFinalized}
                          handleFinalized={this.handleFinalized}
                          finalQuote_id={this.state.finalQuote_id}
                          {...this.props}
                          {...this}
                        />

                      </div> : ""
                  )
                }

              </> :
                <>
                  <div className="col-lg-12 col-md-12" >
                    {/* quote entry field */}
                    <InteractiveList see={true} see1={false}
                      mobileNo={this.state.mobileNo}
                      className="cardsInteractiveList"
                      type="current"
                      handleAddQuote={this.handleAddQuote}
                      {...this.props}
                      {...this}
                    />
                  </div>
                  {
                    this.state.data && this.state.data.map((quote, index) =>

                      <div className="col-lg-12 col-md-12" >
                        <InteractiveList
                          mobileNo={this.state.mobileNo}
                          headings={this.state.mobileNo+'Quote' + (this.state.data?.length - index)}
                          className="cardsInteractiveList" see={true}
                          quoteId={quote.id}
                          data={quote}
                          handleUnFinalized={this.handleUnFinalized}
                          handleFinalized={this.handleFinalized}
                          finalQuote_id={this.state.finalQuote_id}
                          {...this.props}
                          {...this}
                        />

                      </div>


                    )

                  }
                </>

            }

          </div>
          <div className="row" id="commentBox">
            <div className="col-xl-6  col-lg-6 col-md-6 col-sm-6 col-12" >
              <LeftAligned {...this.props} allMessageData={this.state.all_messages} />
            </div>
            <div className="col-xl-6  col-lg-6 col-md-6 col-sm-6 col-12">
              <PostList {...this.props} sendMsg={this.sendMsg} addImage={false} chatHeading="Internal Communication" />
              <PostList {...this.props} clientCommunication={this.clientCommunication} addImage={true} chatHeading="Client Communication" />
            </div>






          </div>
          </>
          }
      
          





          {/* <Wall addImage={false} chatHeading="Internal Communication"/>
  <Wall addImage={true} chatHeading="Client Communication"/> */}




        </div>






      </>
    );
  }
}

InputForm.contextType = AuthContext;

export default withRouter(InputForm); 