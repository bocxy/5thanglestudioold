import React from 'react';

import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import ReactTableContainer from "react-table-container";
// import Buttons from 'Buttons/icon.js';
import Button from '@material-ui/core/Button';

// import StatusDropDown from 'app/routes/AllLeads/StatusDropDown';
// import Paper from "@material-ui/core/Paper";
import "index.css";
import { withRouter} from 'react-router-dom';
// import MultipleSelect from '../../../components/selects/multi/MultipleSelect'
// import { withRouter } from 'react-router-dom';
import { Query, withApollo } from 'react-apollo';
import { CONVERTPROJECT } from '../../../services/grapgql/query';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";



let counter = 0;

function createData(leadId, leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote) {
  counter += 1;
  return { id: counter, leadId, leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote };
}

// const columnData = [
//   { id: 'LeadId', align: false, disablePadding: true, label: 'Lead Id' },
//   { id: 'LeadDate', align: true, disablePadding: false, label: 'Lead Date' },
//   { id: 'Customer', align: true, disablePadding: false, label: 'Customer' },
//   { id: 'ContactNumber', align: true, disablePadding: false, label: 'Contact Number' },
//   { id: 'EventDate', align: true, disablePadding: false, label: 'Event Date' },
//   { id: 'EventType', align: true, disablePadding: false, label: 'Event Type' },
//   { id: 'Status', align: true, disablePadding: false, label: 'Status' },
//   { id: 'Quote', align: true, disablePadding: false, label: 'Quote' },
//   { id: 'FinalQuote', align: true, disablePadding: false, label: 'Final Quote' },
// ];

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

    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    let offset = page*this.state.rowsPerPage;
    this.setState({ page,offset });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;






  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'LeadId',
      
      selected: [],
      LeadStatus: [
        {
          value: 'PhotographerPending',
          label: 'Photographer Pending',
        },
        {
          value: 'photographerAssigned',
          label: 'photographer Assigned',
        }
      ],
      data: [],
      page: 0,
      rowsPerPage: 5,
      offset:0,
      totalCount:0

    };
  }

  // componentDidMount() {
  //   fetch("http://www.json-generator.com/api/json/get/catBSNpuIy?indent=2")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
           
  //           data: result.data
            
  //         });
  //         console.log(this.state.data);
  //       },
        
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
            
  //           error
  //         });
  //       }
  //     )
      
  // }
  handleChangeSelect = event => {
    this.setState({name: event.target.value});
  };
  eventDates = (eventDate)=>{
    let eventDateValue='';
    eventDate.map((startDate,index)=>{
      if(index===0){
        eventDateValue = moment(startDate?.eventStartDate).format('Do MMMM YYYY')
      }else{
        eventDateValue = `${eventDateValue}, ${moment(startDate?.eventStartDate).format('Do MMMM YYYY')}`;
      }
      return startDate;
    })
    return eventDateValue;
  }
  eventTypes = (eventType)=>{
    let eventTypeValue = '';
    eventType.map((ent_type,index)=>{
      if(index===0){
        eventTypeValue = ent_type?.masterEventByEventId?.eventName;
      }
      else {
        eventTypeValue = `${eventTypeValue}, ${ent_type?.masterEventByEventId?.eventName}`;
      }
      return ent_type;
    })
    return eventTypeValue;
  }
  handleAssignService = (project_id,final_quote_id)=>{
     localStorage.setItem('project_id',project_id);
     localStorage.setItem('final_quote_id',final_quote_id);
     this.props.history.push('/app/time-line-TL');
  }
  render() {
 
    const { data,  rowsPerPage, page, LeadStatus } = this.state;

    

    return (
      <div>
        <div className="flex-auto " >
          <div className="table-responsive-material ">
          {/* <ReactTableContainer  height="460px" customHeader={[TableHead]} customFooter={[TableFooter]}      style={{
          // Removes `inline-block` space between <Paper> and <ReactTableContainer>
          marginBottom: "-4px"
        }} > */} 
        
            <Table >
              <TableHead  style={{fontSize:'18rem !important',backgroundColor:'white'}} >
                <TableRow >
                  <TableCell className="padspace3" align="center" >Project Id</TableCell>
                  {/* <TableCell className="padspace3" align="center" >Lead Date</TableCell> */}
                  <TableCell className="padspace3" align="center" >Customer</TableCell>
                  <TableCell className="padspace3" align="center" >Contact Number</TableCell>
                  <TableCell className="padspace3" align="center" >Event Date</TableCell>
                  <TableCell className="padspace3" align="center" >Event Type</TableCell>
                  <TableCell className="padspace3" align="center" >Action</TableCell>

                  {/* <TableCell className="padspaceStatus" align="center"  >Status</TableCell> */}
                  {/* <TableCell className="padspace3" align="center" >Quote</TableCell> */}
                  {/* <TableCell className="padspace3" align="center" >Photographers</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody className="padspace3" >
              <Query
                      query={CONVERTPROJECT}
                      fetchPolicy="no-cache"
                      onCompleted={data => this.setState({ totalCount: data.allProjects.totalCount })}
                      variables={{ "first": this.state.rowsPerPage, "offset": this.state.offset }}>
                        {
                          ({data,loading,error,refetch}) => {
                            if (loading) {
                              return <TableRow><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell>{<CircularProgress />}</TableCell> </TableRow> 
                            }
                            if (error) {
                              return <div>{error}</div>
                              // return false 
                            }
                            if(data) {
                              return <>
                              {
                                data?.allProjects?.nodes.map((project,index)=>(
                                  <TableRow key={project?.index} className="padspace3" >
                                  <TableCell align="center" className='padspace3 '>
                                  {/* <NavLink to="/app/time-line-TL" > */}
                        
                        
                        
                                    <Button id={'#'+index+1} style={{     background: "#3f51b5",color: "white",margin: "10px 0px" }} onClick={()=>this.handleAssignService(project.id,project.finalQuoteId)} >{'#'+(index+1)}</Button>
                                    {/* </NavLink> */}
                                    </TableCell>
                                  {/* <TableCell align="center" className="padspace3">{n.leadDate}</TableCell> */}
                                  <TableCell align="center" className="padspace3" >{project?.customerByCustomerId?.name}</TableCell>
                                  <TableCell align="center" className="padspace3">{project?.customerByCustomerId?.mobile}</TableCell>
                                  <TableCell align="center" className="padspace3">{this.eventDates(project?.customerByCustomerId?.projectEventsByCustomerId?.nodes)}</TableCell>
                                  <TableCell align="center" className="padspace3">{this.eventTypes(project?.customerByCustomerId?.projectEventsByCustomerId?.nodes)}</TableCell>
                                  <TableCell align="center" className='padspace3'>
                                  {/* <NavLink to="/app/time-line-TL" > */}
                        
                        
                        
                                    <Button id={'assign'} style={{     background: "#3f51b5",color: "white" }} onClick={()=>this.handleAssignService(project.id,project.finalQuoteId)} >assign</Button>
                                    {/* </NavLink> */}
                                    </TableCell>
                                  {/* <TableCell align="Left" className="padspace3" style={{ fontSize: '0.8125rem', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '400' }}><StatusDropDown disabled={true} LeadStatus={LeadStatus} style={{height:'10px !important '}}/></TableCell> */}
                                  {/* <TableCell align="center" className="padspace32 btnPad">            
                                  <NavLink to="/app/send-quote" >
                          
                         
                        <Buttons id={n.Quote} className={"btnSmall"} styles={{ backgroundColor: '#3f51b5', color: 'white' }} />
                        </NavLink>
                        </TableCell> */}
                                  {/* <TableCell align="center" className="padspace3"><MultipleSelect keys={JSON.parse(n.leadId)} onChange={this.handleChangeSelect}/></TableCell> */}
                                </TableRow>
                                ))
                              }
                               
                              </>
                            }
                          }
                        }
              </Query>
                 
              </TableBody>
              <TableFooter className="padspace3">
                <TableRow className="padspace3">
                  <TablePagination className="padspace3"
                    count={this.state.totalCount}

                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]} //to remove rows per page pagination
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
            {/* </ReactTableContainer> */}
          </div>
  </div>
      </div>
    );
  }
}

export default withRouter(EnhancedTable);
