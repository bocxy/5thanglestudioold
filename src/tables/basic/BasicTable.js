import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Buttons from 'Buttons/icon.js';
import StatusDropDown from 'app/routes/AllLeads/StatusDropDown';




let id = 0;

function createData(leadId,leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote) {
  id += 1;
  return {leadId, leadDate, leadName, leadNum, EventDate, EventType, Quote, FinalQuote};
}

const data = [
  createData( 1,'28/10/1998', 'JAYASOORYA M R', 9092893155, '28/10/1998',   'Birthday Party', 'Quote', '10000'),
  createData( 2,'28/10/1998', 'JAYASOORYA M R', 9092893155, '28/10/1998',   'Marriage', 'Quote', '10000'),
  createData( 3,'28/10/1998', 'JAYASOORYA M R', 9092893155, '28/10/1998',   'Engagement', 'Quote', '10000'),
  createData( 4,'28/10/1998', 'JAYASOORYA M R', 9092893155, '28/10/1998',   'Reception', 'Quote', '10000'),
  createData( 5,'28/10/1998', 'JAYASOORYA M R', 9092893155, '28/10/1998',   'Marriage', 'Quote', '10000'),
];

function BasicTable() {

  return (
    <div className="table-responsive-material">
      <Table >
        <TableHead >
          <TableRow >
            <TableCell  align="center" style={pad}>Lead Id</TableCell>
            <TableCell align="center" >Lead Date</TableCell>
            <TableCell align="center" >Customer</TableCell>
            <TableCell align="center" >Contact Number</TableCell>
            <TableCell align="center" >Event Date</TableCell>
            <TableCell align="center" >Event Type</TableCell>
            <TableCell align="center" >Status</TableCell>
            <TableCell align="center" >Quote</TableCell>
            <TableCell align="center" >Final Quote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell ><Buttons id={n.leadId} styles={{backgroundColor:'#3f51b5',color:'white'}}/></TableCell>
                <TableCell align="center" >{n.leadDate}</TableCell>
                <TableCell align="center" >{n.leadName}</TableCell>
                <TableCell align="center" >{n.leadNum}</TableCell>
                <TableCell align="center" >{n.EventDate}</TableCell>
                <TableCell align="center" >{n.EventType}</TableCell>
                <TableCell align="center"  ><StatusDropDown className='without-padding'/></TableCell>
                <TableCell align="center" ><Buttons id={n.Quote} styles={{backgroundColor:'red'}} /></TableCell>
                <TableCell align="right" ><i style={{fontSize:'20px'}} class={'fa'}>&#xf156;&nbsp;{n.FinalQuote}</i></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}


export default BasicTable;