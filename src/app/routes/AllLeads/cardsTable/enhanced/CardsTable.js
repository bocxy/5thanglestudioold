import React from 'react';

import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import {NavLink, withRouter} from 'react-router-dom';
// import { NavHashLink as NavLink } from 'react-router-hash-link';
import MultipleSelect from '../../../../../components/selects/multi'
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import StatusDropDown from 'app/routes/AllLeads/StatusDropDown'; 
import "index.css";
// let counter = 0;

// function createData(leadId, leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote) {
//   counter += 1;
//   return { id: counter, leadId, leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote };
// }

// const columnData = [
//   { id: 'LeadId', align: false, disablePadding: true, label: 'Lead Id' },
//   { id: 'LeadDate', align: true, disablePadding: false, label: 'Lead Date' },
//   { id: 'Customer', align: true, disablePadding: false, label: 'Customer' },

// ];


class CardsTable extends React.Component {
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
    // 
    // {
    //   LeadId: '#1',
    //   PhoneNumber: "909283151",
    //   CustomerName: <span className="jr-link" style ={{fontWeight:"bold"}} key={1}>Rajaaa</span>, 
    //   image: 'https://via.placeholder.com/150x150'
    // },

    // 
    this.state = {
      order: 'asc',
      orderBy: 'LeadId',
      selected: [],
      page: 0,
  
      rowsPerPage: 5,

    };
  }

  render() {
    const {  rowsPerPage, page } = this.state;
    const {datas} = this.props;
    let data = datas?.length>0 ?datas :[];
    // let stylesbtn =this.props.stylesbtn;
    let stylesdropdown=this.props.stylesdropdown;
    let LeadStatus=this.props.LeadStatus;
  
    return (
     
      <div>
        {/* <EnhancedTableToolbar numSelected={selected.length}/> */}
        <div className="flex-auto cardsTableHeight"  style={{overflowY:'hidden !important',height: this.props.cardsTableHeight}}>
          <div className="table-responsive-material borderNoneSmallScreen" >
          {/* {rows.length==undefined? */}
          {data?.length!==0?
            <Table  >
              <TableHead className="padspacetbl padspace1">
                <TableRow className="padspacetbl padspace1">
                  <TableCell className="padspacetbl padspace1" colSpan={3} align="left" >
                    
                    {/* <h3><i class="fa fa-bell" style={{ color: '#252525', fontWeight: '400' , }}><span style={{fontFamily: '-apple-system,BlinkMacSystemFont, "Segoe UI","Roboto", "Oxygen","Ubuntu", "Cantarell", "FiraSans", "Droid Sans", "HelveticaNeue",sans-serif !important'}}>{this.props.tableHeading}</span></i></h3> */}
<div className="jr-card-header mb-3">
                    <h3 className="card-heading mb-0 headCard" style={{ display: "flex",alignItems: "center"}}>
              <NotificationsActiveIcon />&nbsp;&nbsp;
              {/* Latest Notifications */}<span style={{fontWeight:'bold'}}>{this.props.tableHeading}</span>
            </h3>
            </div>            
                  </TableCell>


                </TableRow>
              </TableHead>
              <TableBody className="padspacetbl padspace1" >
                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n,index) => {
                  // const isSelected = this.isSelected(n.id);
                  return (
                    
                    <TableRow key={n?.id} className="padspacetbl padspace1" >
                      <TableCell className='padspacetbl  btnPad cellIcon padspace1'>
                        <NotificationsIcon style={{ fontSize: '30px' }} /></TableCell>
                      <TableCell align="left" className="padspacetbl padspace1"><div>{n?.serial_no?.toUpperCase()}</div>
                      {/* <span> */}
                      <div style={{ color: '#3f51b5', fontWeight: 'bold', fontFamily: '-apple-system,BlinkMacSystemFont, "Segoe UI","Roboto", "Oxygen","Ubuntu", "Cantarell", "FiraSans", "Droid Sans", "HelveticaNeue",sans-serif !important' }}>
                        {(this.props.navlinks)   ? 
                      // <NavLink to={"/app/"+this.props.navlinks}>
                      n?.name
                      // </NavLink>
                    
                      :
                      n?.name
                      }
                      {/* </span> */}
                      </div>
              
                   {n?.mobile.split(" ")[0]}
                      
                       </TableCell>
                     
                        {( stylesdropdown === "none" && this.props.stylesdropdown2==="none" ) ?
                         <TableCell align="right" className="padspacetbl padspace1" > <div style={{ textAlign: 'right' }} >

{(this.props.navlinks)   ? 
                          // <NavLink to={"/app/"+this.props.navlinks}
                          // // to={url+'/'}
                          // >
                          <Button variant="contained"  className="jr-btn bg-primary text-white btnSmall padspace1 btn-format" onClick={()=>this.props.history.push(`/app/lead-quote-gen/${n?.id}`)} >{this.props.buttonName}</Button>
                          // </NavLink>
                          :
                          <Button variant="contained"  className="jr-btn bg-primary text-white btnSmall padspace1 btn-format" onClick={()=>this.props.history.push(`/app/lead-quote-gen/${n?.id}`)} >{this.props.buttonName}</Button>

}
                         </div></TableCell>
                         :
                         (stylesdropdown === "block" && this.props.stylesdropdown2 === "none")?
                         <TableCell align="center" className="padspace" style={{ fontSize: '0.8125rem', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '400', overflow:'hidden' }}>
                           
                           
                           <StatusDropDown disabled={false} LeadStatus={LeadStatus} stylesdropdown={stylesdropdown}/></TableCell>
                           :
                           <TableCell align="center" className="padspace" style={{ fontSize: '0.8125rem', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: '400', overflow:'hidden' }}>
                           
                           
                           <MultipleSelect keys={JSON.parse(n.leadId)} onChange={this.handleChangeSelect}/></TableCell>
                        }
                       
                        
                      

                    </TableRow>
                  );
                })}
               
      
           
              </TableBody>
              {
                data?.length>5?
              <TableFooter className="padspacetbl padspace1" >
                <TableRow className="padspacetbl padspace1">
                  <TablePagination className="padspacetbl stepList padspace1"
                    count={data?.length}

                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    rows={[]}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                   
                  />
                </TableRow>
              </TableFooter>
              :
              ''
              }
            </Table>
   :
   <div className = 'cardsTableHeight' style={{height: this.props.cardsTableHeight}}>
  {/* <div style={{color:'black',fontSize:'25px',fontWeight:'bold',display:'flex',justifyContent:'center'}}> {this.props.tableHeading}</div> */}
  <div className="jr-card-header mb-3">
                    <h3 className="card-heading mb-0 headCard" style={{ display: "flex",alignItems: "center"}}>
              <NotificationsActiveIcon />&nbsp;&nbsp;
              {/* Latest Notifications */}<span style={{fontWeight:'bold'}}>{this.props.tableHeading}</span>
            </h3>
            </div> 
<div style={{top:'45%',right:'45%',position:'sticky'}}>
<div >
 <div style={{display:'flex',justifyContent:'center',fontSize:'16px'}}>
   You don't have reminders to followUp... 
 </div>
<br />

  <br />
<div style={{ display:'flex',justifyContent:'center' }}>
{/* <i class="fa fa-bell" style={{ fontSize: '60px',color:'black',
fontWeight:'bold',display:'flex',justifyContent:'center' }}></i> */}
<NotificationsOffIcon style={{ fontSize: '60px',
fontWeight:'bold' }} />
{/* <i style={{ fontSize: '40px',
fontWeight:'bold',display:'flex',justifyContent:'center' }} class="fa">&#xf1f6; */}
</div>
  </div>

   </div> </div> 
   }



      



{/* :
<div>sdfsdf</div>
} */}
          </div>
        </div>
      </div>
    );
  }
}

export default CardsTable;