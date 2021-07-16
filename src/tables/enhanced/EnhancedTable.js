import React from 'react';

import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { numberFormat } from '../../priceformat/price'
// import ReactTableContainer from "react-table-container";
// import Buttons from 'Buttons/icon.js';
import Button from '@material-ui/core/Button';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { GRAPHQL_URL } from '../../config/index';
import * as axios from 'axios';
import { Grid, TableSortLabel } from '@material-ui/core';

// import StatusDropDown from 'app/routes/AllLeads/StatusDropDown';
// import Paper from "@material-ui/core/Paper";
import "index.css";
import { withRouter } from 'react-router-dom';
import { Query, withApollo } from 'react-apollo';
// import IntlMessages from '../../util/IntlMessages';
import { FINANCE_CUSTOMER_DATA, ADMINACCESSCUSTOMERDATA } from '../../services/grapgql/query';
import { STATUS_UPDATE_IN_PROJECT, STATUS_UPDATE_IN_PROJECT_AXIOS, CREATE_COMMUNICATION, PROJECTQUOTEUPDATE } from '../../services/grapgql/mutation';
import { AuthContext } from '../../context/auth'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
export class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unmounted: false,
      advance: "",
      description: "",
      totalAmount: "",
      advancePaid: "",
      id: "",
      advanceErrorMsg: "Enter your amount",
      descriptionErrorMsg: "Enter your description",
      advanceError: false,
      descriptionError: false
    }
  }
  componentWillReceiveProps(nextProps) {
    let advance = nextProps.paidDetails.advance;
    let description = nextProps.paidDetails.description;
    this.setState({
      advance,
      description
    })
  }
  componentWillUnmount() {
    this.setState({
      unmounted: true
    });

  }
  handleClose = () => {
    this.props.paidAlertClose();
  };
  handleSave = () => {
    let paidInfo = this.state;
    if (this.state.advance?.trim().length > 0) {
      paidInfo.advanceError = false;
    }
    else {
      paidInfo.advanceError = true;

    }
    if (this.state.description?.trim().length > 0) {
      paidInfo.descriptionError = false;
    } else {
      paidInfo.descriptionError = true;
    }
    if (this.state.unmounted) return;

    this.setState({
      ...paidInfo
    })
    if (!paidInfo.advanceError && !paidInfo.descriptionError) {
      // let advanceData = String(Number(this.state.advance)+(this.props.paidDetails?.advance ?Number(this.props.paidDetails?.advance):0));
      let params = {
        id: this.props.paidDetails.id,
        advance: this.state.advance,
        description: this.state.description,
        advanceReceiveDate: new Date()
      }
      axios.post(GRAPHQL_URL, { query: PROJECTQUOTEUPDATE, variables: params })
        .then(res => {
          if (res) {
            axios.post(GRAPHQL_URL, { query: STATUS_UPDATE_IN_PROJECT_AXIOS, variables: this.props.advance_paid_status_value })
              .then(res => {
                if (res) {
                  this.props.paidAlertClose();

                }
              })
              .catch(console.error)
          }
        })
        .catch(console.error)
    } else {
      return;
    }
  }
  advanceChange = (data) => {
    if (this.state.unmounted) return;

    if (Number(data) <= Number(this.props.paidDetails?.totalAmd)) {
      this.setState({
        advance: data
      })
    }
  }
  handleChange = (data) => {
    if (this.state.unmounted) return;

    this.setState({
      description: data
    })
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Advance Paid Details"}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
            <Grid container>
              <Grid item container lg={12} md={12}>
                <Grid md={4} > <label>Remaining balance</label></Grid>
                <Grid md={8}><label>&#8377;&nbsp;{this.props.paidDetails?.totalAmd}</label></Grid>
              </Grid>
              <Grid item container lg={12} md={12}>

                <TextField
                  id="Advance"
                  label="&#8377; &nbsp;Advance"
                  type="number"
                  // title="Enter in rupees"
                  helperText={this.state?.advanceError ? this.state?.advanceErrorMsg : ''}
                  error={this.state?.advanceError ? true : false}
                  autoComplete="current-password"
                  margin="normal"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                  }}
                  variant="outlined"
                  value={this.state.advance}
                  // onChange={(e) => setPaidDetail({ advance: e.target.value })}
                  onChange={(e) => this.advanceChange(e.target.value)}
                  // disabled={data.type === "current" ? see1 : see}
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item container lg={12} md={12}>
                {/* <Grid item xs={12} lg={12} md={12}> */}
                <TextField
                  id="outlined-multiline-static"
                  label="Advance Description"
                  helperText={this.state?.descriptionError ? this.state?.descriptionErrorMsg : ''}
                  error={this.state?.descriptionError ? true : false}
                  multiline
                  rows="3"
                  style={{ width: '100%' }}
                  autoComplete="new-multiline-static"
                  inputProps={{
                    maxLength: 2000,
                  }}
                  value={this.state.description}
                  margin="dense"
                  variant="outlined"
                  // disabled={data.see}
                  onChange={(e) => this.handleChange(e.target.value)}

                />

                {/* </Grid> */}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              Save
          </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}


class EnhancedTable extends React.Component {

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };
  handleSelectAllClick = (event, checked) => {
    if (this.state.unmounted) return;

    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    if (this.state.unmounted) return;

    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    if (this.state.unmounted) return;

    let off_set = page * this.state.rowsPerPage
    this.setState({ page, offset: off_set });
    // setPage(newPage);
    // setOffsetValue(newPage*rowsPerPage)

  };

  handleChangeRowsPerPage = event => {
    if (this.state.unmounted) return;

    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);

  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleChange = async (id, refetch, e, leadData, payment_data) => {
    const authContext = this.context;
    let variables = {
      id,
      status: e
    }
    if (leadData?.projectQuoteByFinalQuoteId?.totalAmt === undefined && (e === "QUOTECONFIRMED" || e === "QUOTEFINAL" || e === "ADVANCEDPAID")) {
      this.props.alertOpenBox({ open: true, content: "Please update Final Quote details to make this change.", status: "info" })
      return;
    }
    if (e === "ADVANCEDPAID") {
      if (this.state.unmounted) return;

      this.setState({
        advance_paid_status_value: variables
      })
      this.paidAlertOpen(payment_data);

    }
    if (e !== "ADVANCEDPAID") {
      this.props.client.mutate({ mutation: STATUS_UPDATE_IN_PROJECT, variables })
        .then(res => {
          if (res !== null) {
            let statusData = this.state.AdminStatus;
            let prevStatus = "";
            let nextStatus = "";
            statusData.map(obj => {
              if (variables.status === obj.value) {
                nextStatus = obj.label;
              }
              if (leadData.status === obj.value) {
                prevStatus = obj.label;
              }
              return obj;
            })
            let msg_info = {
              id: uuidv4(),
              sender_id: authContext.user.profile_id,
              created_at: new Date(),
              updated_at: new Date(),
              project_id: id,
              mode: "status updated",
              message: `${authContext.user.name} changed status to "${nextStatus}" from "${leadData.status ? prevStatus : leadData}"`,
              is_internal: false
            }
            this.props.snackBarOpen({ color: "success", message: "You have updated Lead status successfully." });
            // if(e==="ADVANCEDPAID"){
            //   this.paidAlertOpen({id:leadData.projectQuoteByFinalQuoteId?.id,advance:leadData?.projectQuoteByFinalQuoteId?.advanceReceived ,total:leadData?.projectQuoteByFinalQuoteId?.totalAmt,status:leadData?.status})
            // }
            axios.post(GRAPHQL_URL, { query: CREATE_COMMUNICATION, variables: msg_info })
              .then(msg_res => {
                if (this.state.unmounted) return;

                if (msg_res) {
                  this.props.quoteFinalMethod();
                  this.props.followUpMethod();
                  this.props.onHoldMethod();
                  this.props.delayedMethod();
                  this.props.alertCancel();
                  refetch()
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    }

  }
  sendProjectId = (id) => {
    // alert('enhanced table')
    // contextValue.user.customer_id = id
    // contextValue.setAuth({
    //   ...contextValue.user
    // })
    this.props.history.push(`/app/lead-quote-gen/${id}`)
  }



  constructor(props, context) {
    super(props, context);

    this.state = {
      unmounted:false,
      paidAlertOpen: false,
      paidDetails: {},
      order: 'asc',
      orderBy: 'LeadId',
      orderByFilter: 'CREATED_AT_DESC',
      filterSearch: '',
      selected: [],
      FinanceLeadStatus: [
        {
          value: 'QUOTECONFIRMED',
          label: 'Quote Confirmed',
        },
        {
          value: 'ADVANCEDPAID',
          label: 'Advance Paid',
        },
      ],
      LeadStatus: [
        {
          value: 'CAPTURED',
          label: 'Captured',
        },
        {
          value: 'FOLLOWUP',
          label: 'Follow-Up',
        },
        {
          value: "QUOTESENT",
          label: "Quote Sent"
        },
        {
          value: 'NEGOTIATION',
          label: 'Negotiation',
        },
        {
          value: 'QUOTEFINAL',
          label: 'Quote Final',
        },
        {
          value: 'QUOTECONFIRMED',
          label: 'Quote Confirmed',
        },
        {
          value: 'ONHOLD',
          label: 'On Hold',
        },
        {
          value: 'DELAYED',
          label: 'Delayed',
        },
        {
          value: 'CANCELLED',
          label: 'Cancelled',
        },
      ],
      AdminStatus: [],
      page: 0,
      rowsPerPage: 5,
      offset: 0,
      totalCount: 0,
      customerStatus: 'CAPTURED'

    };
  }
  listEventType = (eventTypeValue) => {
    let setValue = '';
    eventTypeValue = eventTypeValue?.map((data, index) => {
      if (eventTypeValue.length - 1 === index) {
        setValue = setValue + data.masterEventByEventId?.eventName;
      } else {
        setValue = setValue + data.masterEventByEventId?.eventName + ", ";
      }
      return data;
    })
    return setValue;
  }
  statusCancel = (id, refetch, e, data) => {
    let btnAction = e
    let params = {
      id: JSON.parse(JSON.stringify(id))
      ,
      refetch,
      btnAction,
      data: JSON.parse(JSON.stringify(data))
    }
    if (e === "CANCELLED") {
      this.props.alertOpenBox({ open: true, content: "Are you sure you want to cancel this Lead?", status: "info", twoBtn: true })
    }
    if (this.state.unmounted) return;

    this.setState({
      cancelStatusData: params
    })
  }
  componentDidMount() {
    let state = this.state;
    if (this.state.unmounted === false) {
      this.setState({
        AdminStatus: [...state.LeadStatus, {
          value: 'ADVANCEDPAID',
          label: 'Advance Paid',
        }]
      })

    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   // if(this.props.alertAction)
  //     // if(nextProps.state.alertAction){
  //     //   this.handleChange(this.state.cancelStatusData.id,this.state.cancelStatusData.refetch,this.state.cancelStatusData.e,this.state.cancelStatusData.data)
  //     // }
  //     return false;
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.alertAction) {
      this.handleChange(this.state.cancelStatusData.id, this.state.cancelStatusData.refetch, this.state.cancelStatusData.btnAction, this.state.cancelStatusData.data)
    }
  }
  paidAlertOpen = (params) => {
    // if(params?.status==="ADVANCEDPAID") {
    if (this.state.unmounted) return;

    params.totalAmd = Number(params.total) - (params?.advance ? Number(params.advance) : 0)
    this.setState({
      paidAlertOpen: true,
      paidDetails: params
    })
    // }else{
    //   this.props.alertOpenBox({ open: true, content: "Please update Advance Paid details to make this change.", status: "info" })
    // }

  }
  paidAlertClose = () => {
    if (this.state.unmounted) return;

    this.setState({
      paidAlertOpen: false,
    })
    this.props.history.push(`/app/all-leads`)
  }
  // handleSearch = name => event => {
  //   this.setState({
  //     filterSearch:event.target.value
  //   });
  // }
  statusSort = () => {
    let orderByFilter = '';
    if(this.state.orderByFilter==='CREATED_AT_DESC'){
      orderByFilter = 'STATUS_ASC';
    } else if (this.state.orderByFilter === 'STATUS_ASC') {
      orderByFilter = 'STATUS_DESC';
    } else if(this.state.orderByFilter === 'STATUS_DESC') {
      orderByFilter = 'STATUS_ASC';
    }
    this.setState({
      orderByFilter
    });
  }
  render() {
    const contextValue = this.context;
    const { rowsPerPage, page, LeadStatus, FinanceLeadStatus } = this.state;



    return (
      <div>
        <AlertDialog open={this.state.paidAlertOpen} {...this.state} paidAlertClose={this.paidAlertClose} paidDetails={this.state.paidDetails} />
        <div className="flex-auto" >
          <div className="table-responsive-material">
            {/* <ReactTableContainer  height="460px" customHeader={[TableHead]} customFooter={[TableFooter]}      style={{
          // Removes `inline-block` space between <Paper> and <ReactTableContainer>
          marginBottom: "-4px"
        }} > */}
            {/* <Grid container item>
              <Grid item xs={6} md={8} lg={8}></Grid>
              <Grid item xs={6} md={4} lg={4} style={{    padding: "10px 20px 5px 10px"}}>
              <TextField
                // 
                // pattern="[0-9]{2}"
                // onInvalid={this.handleInvalid('customerName')}
                // helperText={this.state.error.name ? this.state.errorMsg.name : ''}
                // error={this.state.error.name ? true : false}
                id="outlined-password-input"
                label="Search by lead Id, contact name, phone number"
                style={{ width: '100%' }}
                type="text"
                // title="text inputs only allowed"
                autoComplete="new-password"
                margin="dense"
                variant="outlined"
                inputProps={{
                  maxLength: 60,
                  style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px" }
                }}
                // className={this.props.className}
                value={this.state.filterSearch}
                onChange={this.handleSearch('search')}
              />
              </Grid>
            </Grid> */}
            <Table >
              <TableHead style={{ fontSize: '18rem !important', backgroundColor: 'white' }} >
                <TableRow >
                  <TableCell className="padspace" align="center" style={{ height: "50px" }} >Lead Id</TableCell>
                  <TableCell className="padspace" align="center" style={{minWidth: 150}} >Lead Date</TableCell>
                  <TableCell className="padspace" align="center" style={{minWidth: 150}}>Customer</TableCell>
                  <TableCell className="padspace" align="center" style={{minWidth: 150}}>Contact Number</TableCell>
                  {/* <TableCell className="padspace" align="center" >Event Date</TableCell> */}
                  <TableCell className="padspace" align="center" style={{minWidth: 200}} >Event Type</TableCell>
                  <TableCell className="padspaceStatus" align="center"  ><TableSortLabel active="true" direction={this.state.orderByFilter==="CREATED_AT_DESC"?'desc':this.state.orderByFilter==="STATUS_DESC"?'desc':'asc'} onClick={()=>this.statusSort()}>Status</TableSortLabel></TableCell>
                  {/* <TableCell className="padspace" align="center" >Quote</TableCell> */}
                  <TableCell className="padspace" align="center" style={{minWidth: 150}}>Final Quote</TableCell>
                  {
                    contextValue.user.user_role === 5 || contextValue.user.user_role === 1 ?
                      <>
                        <TableCell className="padspace" align="center" style={{minWidth: 150}}>Advance payment</TableCell>
                        <TableCell className="padspace" align="center" style={{minWidth: 150}}>Remaining balance</TableCell>
                        <TableCell className="padspace" align="center" style={{minWidth: 200}} >Payment description</TableCell>


                        {/* <TableCell className="padspace" align="center" >Action</TableCell>  */}
                      </>
                      : ""
                  }
                  <TableCell className="padspace" align="center" style={{minWidth: 200}}>Follow up date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="padspace" >
                {
                  contextValue.user.user_role === 5 || contextValue.user.user_role === 1 ?
                    <Query
                      query={contextValue.user.user_role === 5 ? FINANCE_CUSTOMER_DATA : ADMINACCESSCUSTOMERDATA}
                      fetchPolicy="no-cache"
                      onCompleted={data => { if (this.state.unmounted) return; this.props.handleTotalCount(data.allProjects.totalCount) }}
                      variables={{ "first": this.props.rowsPerPage, "offset": this.props.offset, "search": this.props.filterSearch, "orderBy": this.state.orderByFilter }}>
                      {
                        ({ data, loading, error, refetch }) => {

                          if (loading) {
                            return <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell>{<CircularProgress />}</TableCell> </TableRow>
                          }
                          if (error) {
                            return <div>{error}</div>
                            // return false 
                          }
                          if (data) {
                            if (data?.allProjects?.nodes.length > 0) {
                              return <>
                                {data.allProjects && data.allProjects.nodes && data.allProjects.nodes.map((row, index) => (
                                  <TableRow key={row.id}  >
                                    <TableCell align="center" className='padspace btn-format' style={{ padding: "7px 13px 7px 16px !important" }}>
                                      <Button style={{ backgroundColor: '#3f51b5', color: 'white' }} onClick={() => this.sendProjectId(row && row.customerByCustomerId?.id)}>{row?.customerByCustomerId?.serialNo}</Button>
                                    </TableCell>
                                    <TableCell align="center" className="padspace">{moment(row && row.createdAt).format('Do MMMM YYYY')}</TableCell>
                                    <TableCell align="center" className="padspace">{row && row.customerByCustomerId?.name}</TableCell>
                                    <TableCell align="center" className="padspace">{row && row.customerByCustomerId?.mobile.split(" ")[0]}</TableCell>
                                    {/* <TableCell align="center" className="padspace">{moment(row.projectsByCustomerId.nodes[0]&&row.projectsByCustomerId.nodes[0].eventDate).format('MMMM Do YYYY')}</TableCell> */}
                                    <TableCell align="center" className="padspace">{this.listEventType(row?.customerByCustomerId?.projectEventsByCustomerId?.nodes)}</TableCell>
                                    <TableCell align="center" style={{ textAlign: "left", fontSize: '0.8125rem', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '400', padding: 0 }} className="statusBoxWidth selectBoxHeight">
                                      {
                                        contextValue.user.user_role === 5 && row?.status === "ADVANCEDPAID" ? <>Advanced Paid</> :
                                          <TextField
                                            id="outlined-select-currency-native"
                                            select
                                            label="Choose Status"

                                            value={row?.status}
                                            onChange={(e) => this.handleChange(row?.id, refetch, e.target.value, row, { id: row.projectQuoteByFinalQuoteId?.id, advance: row?.projectQuoteByFinalQuoteId?.advanceReceived, total: row?.projectQuoteByFinalQuoteId?.totalAmt, status: row?.status, description: row?.projectQuoteByFinalQuoteId?.description })}
                                            SelectProps={{
                                              native: true,
                                            }}
                                            inputProps={{
                                              style: { padding: "6px 15px 4px 10px", fontSize: "14px" }
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                            style={{ width: '100%', margin: "0px" }}
                                            disabled={data.see}
                                            required
                                          >
                                            {
                                              contextValue.user.user_role === 5 ? FinanceLeadStatus.map(option => (
                                                <option key={option.value} disabled={option.value === "CAPTURED" ? true : false} value={option.value}>
                                                  {option.label}
                                                </option>
                                              )) : this.state.AdminStatus.map(option => (
                                                <option key={option.value} value={option.value}>
                                                  {option.label}
                                                </option>
                                              ))
                                            }
                                          </TextField>
                                      }


                                    </TableCell>
                                    {/* <TableCell align="center" className="padspace2 btnPad">            
                
               
              <Button id="Send Quote" className={"btnSmall"} onClick={()=>this.sendProjectId(row&&row.id)} style={{ backgroundColor: '#3f51b5', color: 'white' }} >Send Quote </Button>
  
              </TableCell> */}
                                    <TableCell align="center" className="padspace">{row?.projectQuoteByFinalQuoteId?.totalAmt ? <span class="spanRupee">{numberFormat(row?.projectQuoteByFinalQuoteId?.totalAmt)}</span> : "---"}</TableCell>
                                    <TableCell align="center" className="padspace">{row?.projectQuoteByFinalQuoteId?.advanceReceived ? <span class="spanRupee">{numberFormat(row?.projectQuoteByFinalQuoteId?.advanceReceived)}</span> : "---"}</TableCell>
                                    <TableCell align="center" className="padspace">{row?.projectQuoteByFinalQuoteId?.totalAmt ? <span class="spanRupee">{numberFormat(Number(row?.projectQuoteByFinalQuoteId?.totalAmt) - (row?.projectQuoteByFinalQuoteId?.advanceReceived ? Number(row?.projectQuoteByFinalQuoteId?.advanceReceived) : 0))}</span> : "---"}</TableCell>
                                    <TableCell align="center" className="padspace">{row?.projectQuoteByFinalQuoteId?.description}</TableCell>
                                    <TableCell align="center" className="padspace">{row?.customerByCustomerId?.followUpDate === null ? '---' : moment(row?.customerByCustomerId?.followUpDate).format('Do MMMM YYYY, h:mm a')}</TableCell>


                                    {/* <TableCell align="center" className='padspace'>
            <Button style={{ backgroundColor: '#3f51b5', color: 'white' }} onClick={() => this.paidAlertOpen({id:row.projectQuoteByFinalQuoteId?.id,advance:row?.projectQuoteByFinalQuoteId?.advanceReceived ,total:row?.projectQuoteByFinalQuoteId?.totalAmt,status:row?.status,description:row?.projectQuoteByFinalQuoteId?.description})}>{"Edit"}</Button>
                                  </TableCell> */}
                                  </TableRow>
                                ))}
                              </>
                            } else {
                              return <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell style={{ width: "100%", textAlign: "center" }}>You don't have leads.</TableCell> </TableRow>
                            }
                          }
                          else {
                            return <div>data:{data}</div>
                          }
                        }}
                    </Query> : <Query
                      query={ADMINACCESSCUSTOMERDATA}
                      fetchPolicy="no-cache"
                      onCompleted={data => { if (this.state.unmounted) return; this.props.handleTotalCount(data.allProjects.totalCount) }}
                      variables={{ "first": this.props.rowsPerPage, "offset": this.props.offset, "search": this.props.filterSearch, "orderBy": this.state.orderByFilter }}>
                      {
                        ({ data, loading, error, refetch }) => {

                          if (loading) {
                            return <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell>{<CircularProgress />}</TableCell> </TableRow>
                          }
                          if (error) {
                            return <div>{error}</div>
                            // return false
                          }
                          if (data) {
                            if (data?.allProjects?.nodes.length > 0) {
                              return <>
                                {data.allProjects && data.allProjects.nodes && data.allProjects.nodes.map((row, index) => (
                                  <TableRow key={row.id} className="padspace" >
                                    <TableCell align="center" style={{ padding: "14px 0px !important" }}>
                                      <Button style={{ backgroundColor: '#3f51b5', color: 'white' }} onClick={() => this.sendProjectId(row && row.customerByCustomerId?.id)}>{row?.customerByCustomerId?.serialNo}</Button>
                                    </TableCell>
                                    <TableCell align="center" className="padspace">{moment(row && row.createdAt).format('Do MMMM YYYY')}</TableCell>
                                    <TableCell align="center" className="padspace">{row && row.customerByCustomerId?.name}</TableCell>
                                    <TableCell align="center" className="padspace">{row && row.customerByCustomerId?.mobile.split(" ")[0]}</TableCell>
                                    {/* <TableCell align="center" className="padspace">{moment(row.projectsByCustomerId.nodes[0]&&row.projectsByCustomerId.nodes[0].eventDate).format('MMMM Do YYYY')}</TableCell> */}
                                    <TableCell align="center" className="padspace">{this.listEventType(row?.customerByCustomerId?.projectEventsByCustomerId?.nodes)}</TableCell>
                                    <TableCell align="center" className="padspace" style={{ textAlign: "left", fontSize: '0.8125rem', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '400', paddingRight: "106px !important", paddingTop: "7px !important" }}>
                                      {
                                        row?.status === "ADVANCEDPAID" ? <>Advanced Paid</> :
                                          <>
                                            <Grid container className="statusBoxWidth">
                                              <Grid item className="selectBoxHeight">
                                                <TextField
                                                  id="outlined-select-currency-native"
                                                  select
                                                  label="Choose Status"

                                                  value={row?.status}
                                                  onChange={(e) => e.target.value === "CANCELLED" ? this.statusCancel(row?.id, refetch, e.target.value, row) : this.handleChange(row?.id, refetch, e.target.value, row)}
                                                  SelectProps={{
                                                    native: true,
                                                  }}
                                                  inputProps={{
                                                    style: { padding: "6px 15px 4px 10px", fontSize: "14px" }
                                                  }}
                                                  margin="normal"
                                                  variant="outlined"
                                                  // style={{ width: '100%' }}
                                                  // disabled={row.projectsByCustomerId.nodes[0] && row.projectsByCustomerId.nodes[0].status === "ADVANCEDPAID" ? true : false}
                                                  required
                                                >
                                                  {LeadStatus.map(option => (
                                                    <option key={option.value} disabled={option.value === "CAPTURED" ? true : false} value={option.value}>
                                                      {option.label}
                                                    </option>
                                                  ))}
                                                </TextField>
                                              </Grid>
                                            </Grid>

                                          </>
                                      }
                                    </TableCell>
                                    {/* <TableCell align="center" className="padspace2 btnPad">            
                
               
              <Button id="Send Quote" className={"btnSmall"} onClick={()=>this.sendProjectId(row&&row.id)} style={{ backgroundColor: '#3f51b5', color: 'white' }} >Send Quote </Button>
  
              </TableCell> */}
                                    <TableCell align="center" className="padspace">{row?.projectQuoteByFinalQuoteId?.totalAmt ? <span class="spanRupee">{numberFormat(row?.projectQuoteByFinalQuoteId?.totalAmt)}</span> : "---"}</TableCell>
                                    <TableCell align="center" className="padspace">{row?.customerByCustomerId?.followUpDate === null ? '---' : moment(row?.customerByCustomerId?.followUpDate).format('Do MMMM YYYY, h:mm a')}</TableCell>

                                  </TableRow>
                                ))}
                              </>
                            } else {
                              return <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell>You don't have leads.</TableCell> </TableRow>
                            }
                          }
                          else {
                            return <div>data:{data}</div>
                          }
                        }}
                    </Query>
                }
              </TableBody>
              {/* <TableFooter className="padspace">
                <TableRow className="padspace">
                  <TablePagination className="padspace"
                    count={this.state.totalCount}

                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]} //to remove rows per page pagination
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter> */}
            </Table>
            {/* </ReactTableContainer> */}
          </div>
        </div>
      </div>
    );
  }
}
EnhancedTable.contextType = AuthContext;
export default withApollo(withRouter(EnhancedTable));