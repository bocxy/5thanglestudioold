import React from 'react';
// import RemindersToFollowUp from './RemindersToFollowUp';
// import RemindersForQuoteGen from './RemindersForQuoteGen';
import Tables from 'tables'
// import {
//   announcementsNotification,
//   appNotification,
//   announcements,
//   remindersToFollowUp,
//   remindersForQuoteGen,
//   remindersForAlbumSelection,
//   remindersForCustomerReview,
//   remindersForAlbumComplete,
// } from './data';
import AlertDialog from '../../../components/AlertBox/alertbox';
import CustomizedSnackbars from '../../../components/snackbar/index';
import { Grid } from '@material-ui/core';
import CardsTable from './cardsTable/enhanced/CardsTable'
import CardLayout from "./CardLayout/index";
import * as axios from 'axios';
import { API_URL } from '../../../config/index';
// import { USERPROFILEFOLLOWUPSTATUS, USERPROFILEFINALQUOTESTATUS, USERPROFILEONHOLDSTATUS,USERPROFILEDELAYEDSTATUS } from '../../../services/grapgql/mutation';
import { AuthContext } from '../../../context/auth';
// let counter = 0;

// function createData(leadId, leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote) {
//   counter += 1;
//   return { id: counter, leadId, leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote };
// }
class AllLeads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unmounted: false,
      snackBarOpen: false,
      snackbarMessage: "",
      snackbarColor: "",
      alertTwoBtn: false,
      alertContent: "",
      alertStatus: "",
      alertAction: false,
      alertOpen: false,
      followUpData: [],
      quoteFinal: [],
      onHoldData: [],
      delayedData: [],
      dataFour: [],
      dataFive: [],
      LeadStatusOne: [
        {
          value: 'AlbumSelection',
          label: 'Album Selection',
        },
        {
          value: 'PhotoshopOnly',
          label: 'Photoshop Only',
        },

      ],
      LeadStatusTwo: [
        {
          value: 'CustomerReview',
          label: 'Customer Review',
        },
        {
          value: 'CustomerOk',
          label: 'Customer Okay',
        },
        {
          value: 'CustomerNotOk',
          label: 'Customer Not Okay',
        },
      ],

    };
  }
  componentDidMount() {
    // let authContext = this.context;
    // let followUpData = [];
    // let quoteFinal = [];
    // axios.post(GRAPHQL_URL, { query: USERPROFILEFOLLOWUPSTATUS, variables: { id: authContext?.user?.profile_id } })
    //   .then(follow_res => {
    //     followUpData = follow_res.data?.data?.userProfileById?.customersByCreatedBy?.nodes;
    //     this.setState({
    //       followUpData
    //     })
    //   })
    // axios.post(GRAPHQL_URL, { query: USERPROFILEFINALQUOTESTATUS, variables: { id: authContext?.user?.profile_id } })
    //   .then(quotefinal_res => {
    //     quoteFinal = quotefinal_res.data?.data?.userProfileById?.customersByCreatedBy?.nodes;
    //     this.setState({
    //       quoteFinal
    //     })
    //   })
    this.followUpMethod();
    this.quoteFinalMethod();
    this.onHoldMethod();
    this.delayedMethod();
  }
  componentWillUnmount() {
    this.setState({
      unmounted: true
    });

  }
  quoteFinalMethod = async () => {
    // let authContext = this.context;

    let quoteFinal = [];
    await axios.post(`${API_URL}/api/v1/sort/remaindersort`, { status: "QUOTEFINAL" })
      .then(quotefinal_res => {
        if (this.state.unmounted) return;
        quoteFinal = quotefinal_res?.data?.info;
        this.setState({
          quoteFinal
        })
      })
  }
  followUpMethod = async () => {
    // let authContext = this.context;
    let followUpData = [];
    await axios.get(`${API_URL}/api/v1/sort/followup`)
      .then(follow_res => {
        if (this.state.unmounted) return;

        followUpData = follow_res?.data?.info;
        this.setState({
          followUpData
        })
      })
  }
  onHoldMethod = async () => {
    // let authContext = this.context;
    let onHoldData = [];
    await axios.post(`${API_URL}/api/v1/sort/remaindersort`, { status: "ONHOLD" })
      .then(onhold_res => {
        if (this.state.unmounted) return;

        onHoldData = onhold_res?.data?.info;
        this.setState({
          onHoldData
        })
      })
  }
  delayedMethod = async () => {
    // let authContext = this.context; 
    let delayedData = [];
    await axios.get(`${API_URL}/api/v1/sort/delaysortwithexpirefollowupstatus`)
      .then(delay_res => {
        if (this.state.unmounted) return;

        delayedData = delay_res?.data?.info;
        this.setState({
          delayedData
        })
      })
  }
  alertClose = () => {
    if (this.state.unmounted) return;

    this.setState({
      alertOpen: false
    })
  }
  alertOpenBox = (params) => {
    let state = this.state;
    state.alertOpen = params.open;
    state.alertContent = params.content;
    state.alertStatus = params.status;
    if (typeof params?.twoBtn !== "undefined") {
      state.alertTwoBtn = true;
    }
    if (this.state.unmounted) return;

    this.setState({
      ...state
    });
  }
  alertSure = () => {
    if (this.state.unmounted) return;

    this.setState({
      alertAction: true,
      alertOpen: false
    });
  }
  alertCancel = () => {
    if (this.state.unmounted) return;

    this.setState({
      alertAction: false,
      alertOpen: false
    });
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
    let state = this.state;
    state.snackBarOpen = false;
    if (this.state.unmounted) return;

    this.setState({
      ...state

    })
  }
  render() {
    let { followUpData } = this.state;
    let { quoteFinal } = this.state;
    let { onHoldData } = this.state;
    let { delayedData } = this.state;
    let authContext = this.context;

    // let { dataFive } = this.state;
    // let { LeadStatusOne } = this.state;
    // let { LeadStatusTwo } = this.state;

    return (
      <div>


        <div className="app-wrapper" >
          <CustomizedSnackbars open={this.state.snackBarOpen} color={this.state.snackbarColor} message={this.state.snackbarMessage} snackBarClose={this.snackBarClose} />
          <AlertDialog alertOpen={this.state.alertOpen} alertSure={this.alertSure} alertCancel={this.alertCancel} alertClose={this.alertClose} alertContent={this.state.alertContent} alertStatus={this.state.alertStatus} twoBtn={this.state.alertTwoBtn} />
          <Tables {...this} />
          {
            authContext?.user?.user_role === 5 ? "" :
              <Grid item container justify="space-around"
                alignItems="center" >
                <Grid item container justify="space-around"
                  alignItems="center" spacing={1}>
                  <Grid item xs={12} lg={6} >



                    <CardLayout styleName="col-lg-12" >

                      <CardsTable stylesdropdown="none" stylesdropdown2="none" cardsTableHeight='525px' {...this.props} datas={followUpData} tableHeading={'Reminders for Follow-Up'} navlinks={'lead-quote-gen#commentBox'} buttonName={'Follow-Up'} />
                    </CardLayout>


                  </Grid>
                  <Grid item xs={12} lg={6} >


                    <CardLayout styleName="col-lg-12">

                      <CardsTable stylesdropdown="none" stylesdropdown2="none" cardsTableHeight='525px' {...this.props} datas={delayedData} tableHeading={'Reminders for Delayed'} buttonName={'View'} />
                    </CardLayout>


                  </Grid>
                </Grid>
                <Grid item container justify="space-around"
                  alignItems="center" spacing={1}>
                  <Grid item xs={12} lg={6} >



                    <CardLayout styleName="col-lg-12" >

                      <CardsTable stylesdropdown="none" stylesdropdown2="none" cardsTableHeight='525px' {...this.props} datas={quoteFinal} tableHeading={'Reminders for Quote Final'} navlinks={'send-quote'} buttonName={'View'} />
                    </CardLayout>



                  </Grid>
                  <Grid item xs={12} lg={6}>


                    <CardLayout styleName="col-lg-12" >

                      <CardsTable stylesdropdown="none" stylesdropdown2="none" cardsTableHeight='525px' {...this.props} datas={onHoldData} tableHeading={'Reminders for On Hold'} buttonName={'View'} />
                    </CardLayout>


                  </Grid>


                </Grid>
                {/* <Grid item container justify="flex-start"
              alignItems="center" spacing={1}>
              <Grid item xs={12} lg={6}>


                <CardLayout styleName="col-lg-12">

                  <CardsTable stylesdropdown="none" stylesdropdown2="none" cardsTableHeight='525px' datas={dataFive} tableHeading={'Remainders for Album Complete'} navlinks={'lead-quote-gen#commentBox'} buttonName={'Album Ready'} />
                </CardLayout>


              </Grid>

            </Grid> */}
              </Grid>


          }



        </div>

      </div>
    );
  }
}
AllLeads.contextType = AuthContext;
export default AllLeads;





