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
import Badge from '@material-ui/core/Badge';
import Buttons from 'Buttons/icon.js';
import StatusDropDown from 'app/routes/AllLeads/StatusDropDown';
// import Paper from "@material-ui/core/Paper";
import "index.css";
import {NavLink} from 'react-router-dom';
// import MultipleSelect from '../../../components/selects/multi/MultipleSelect'
// import IntlMessages from '../../../util/IntlMessages';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';




let counter = 0;

function createData(leadId,leadName,leadNum,  EventDate, EventType, Photographers) {
  counter += 1;
  return { id: counter, leadId,leadName,leadNum,  EventDate, EventType, Photographers };
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
    this.setState({ page });
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
      open:false,
      clickId:'',
      
      selected: [],
      LeadStatus: [
        {
          value: 'EventPending',
          label: 'Event Pending',
        },
        {
          value: 'EventCompleted',
          label: 'Event Completed',
        },
        {
          value: 'PhotoUploaded',
          label: 'Photo Uploaded',
        }
      ],
      data: [
        createData('1', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Birthday Party',  ['Ashwin','chandran','balaji','chandran','chandran','chandran']),
        createData('2', 'jayasoorya M R', 9092893155, '28/10/1998', 'Marriage',  ['Ashwin','chandran','balaji']),
        createData('3', 'sarath babu', 9092893155, '28/10/1998', 'Engagement',  ['Ashwin','chandran','balaji']),
        createData('4', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Reception', ['Ashwin','chandran','balaji']),
        createData('5', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Marriage',  ['Ashwin','chandran','balaji']),
        createData('6', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Birthday Party',  ['Ashwin','chandran','balaji']),
        createData('7', 'ASHWIN', 9092893155, '28/10/1998', 'Marriage', ['Ashwin','chandran','balaji']),
        createData('8', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Engagement',  ['Ashwin','chandran','balaji']),
        createData('9', 'SARATH BABU', 9092893155, '28/10/1998', 'Reception',  ['Ashwin','chandran','balaji']),
        createData('10', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Marriage',  ['Ashwin','chandran','balaji']),
        createData('11', 'ASHWIN', 9092893155, '28/10/1998', 'Birthday Party',  ['Ashwin','chandran','balaji']),
        createData('12', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Marriage', ['Ashwin','chandran','balaji']),
        createData('13', 'SARATH BABU', 9092893155, '28/10/1998', 'Engagement',  ['Ashwin','chandran','balaji']),
        createData('14', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Reception',  ['Ashwin','chandran','balaji']),
        createData('15', 'SARATH BABU', 9092893155, '28/10/1998', 'Marriage',  ['Ashwin','chandran','balaji']),
        createData('16', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Birthday Party',  ['Ashwin','chandran','balaji']),
        createData('17', 'ASHWIN', 9092893155, '28/10/1998', 'Marriage',  ['Ashwin','chandran','balaji']),
        createData('18', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Engagement',  ['Ashwin','chandran','balaji']),
        createData('19', 'JAYASOORYA M R', 9092893155, '28/10/1998', 'Reception',  ['Ashwin','chandran','balaji']),
        createData('20', 'ASHWIN', 9092893155, '28/10/1998', 'Marriage',  ['Ashwin','chandran','balaji']),
      ].sort((a, b) => (a.LeadId < b.LeadId ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,

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
  handleBlur = (value) => {
    // document.getElementById('selects').blur(); 
    
    // console.log('Closed')
    this.setState({clickId:value})
    // console.log(this.state.clickId)
    this.setState({open: true});
    
  };
  handleClose=()=> {
    // document.getElementById('selects').blur(); 
    // document.getElementsById('selects').blur();
    this.setState({open:false});
    
 
  }
  render() {
//  console.log(data);
    const { data, rowsPerPage, page, LeadStatus,open } = this.state;
    // console.log(data);
    
let clicked = this.state.clickId;
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
                  <TableCell className="padspaceStatus" align="center"  >Status</TableCell>
                  {/* <TableCell className="padspace3" align="center" >Quote</TableCell> */}
                  <TableCell className="padspace3" align="center" >Photographers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="padspace3" >
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  // const isSelected = this.isSelected(n.id);
                  // console.log(n)
                  return (
                    <TableRow key={n.id} className="padspace3" >
                      <TableCell align="center" className='padspace3 btnPad'>
                      <NavLink to="/app/time-line-TL" >
            
            
            
                        <Buttons id={'#'+n.leadId} styles={{ backgroundColor: '#3f51b5', color: 'white' }} />
                        </NavLink>
                        </TableCell>
                      {/* <TableCell align="center" className="padspace3">{n.leadDate}</TableCell> */}
                      <TableCell align="Left" className="padspace3">{n.leadName}</TableCell>
                      <TableCell align="Left" className="padspace3">{n.leadNum}</TableCell>
                      <TableCell align="Left" className="padspace3">{n.EventDate}</TableCell>
                      <TableCell align="Left" className="padspace3">{n.EventType}</TableCell>
                      <TableCell align="Left" className="padspace3" style={{ fontSize: '0.8125rem', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '400' }}>
                        
                        <StatusDropDown disabled={false} LeadStatus={LeadStatus} style={{height:'10px !important '}}/>
                        
                        </TableCell>
                      {/* <TableCell align="center" className="padspace32 btnPad">            
                      <NavLink to="/app/send-quote" >
              
             
            <Buttons id={n.Quote} className={"btnSmall"} styles={{ backgroundColor: '#3f51b5', color: 'white' }} />
            </NavLink>
            </TableCell> */}
                      <TableCell align="center" className="padspace3"  onClick={()=>this.handleBlur(n.id)} >
                      {n.Photographers.length>1?
                      <Badge  badgeContent={'+'+n.Photographers.length} color="primary">
                     
                     <span style={{  whiteSpace: 'nowrap',width:'100px', overflow: 'hidden',textOverflow: 'ellipsis'}}> {n.Photographers.join(", ")}</span>
        </Badge>
        :
        <span style={{  whiteSpace: 'wrap',width:'150px', overflow: 'hidden',textOverflow: 'ellipsis'}}> {n.Photographers}</span>
}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter className="padspace3">
                <TableRow className="padspace3">
                  <TablePagination className="padspace3"
                    count={data.length}

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

  {open===true?
  
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation <i className="fa fa-check-circle" style={{fontSize:'24px'}}></i></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        
          <>
         <div style={{fontWeight:'bold'}}>These are the photographers who is working for the event.</div>
      
         {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => { */}
          <span style={{fontWeight:'italic'}}> {data[Number(clicked-1)].Photographers.map(
            n=>
            (
              
             
              
             
             <div>{n}</div>
             
          
            
            )

            
          )}
           </span>
</>
         

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

:
''
    }
      </div>
    );
  }
}

export default EnhancedTable;