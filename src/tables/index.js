import React,{ useState } from 'react';

import EnhancedTable from './enhanced/EnhancedTable';
// import ContainerHeader from 'components/ContainerHeader/index';
import CardBox from 'components/CardBox/index';
import IntlMessages from 'util/IntlMessages';
import "index.css";
import { Grid, TextField } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const Tables = (props) => {
  const [ search,setSearch ] = useState("");
  const [ page,setPage ] = useState(0);
  const [rowsPerPage,setRowsPerPage ]= useState(5);
  const [offset,setOffset ] = useState(0);
  const [totalCount, setTotalCount ] = useState(0);
  let handleSearch = name => event =>{
    setSearch(event.target.value);
    setPage(0);
    setOffset(0);
  }
  let handleChangePage =(event, pages) => {
    // if (this.state.unmounted) return;

    let off_set = pages * rowsPerPage
    setPage(pages);
    setOffset(off_set)

  };
  let handleTotalCount = (count) =>{
    setTotalCount(count)
  };
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      

      {/* <div className="row mb-md-3">
        <CardBox styleName="col-12" cardStyle="p-0" heading={<IntlMessages id="Leads"/>}
                 headerOutside>
          <BasicTable/>
        </CardBox>
      </div> */}

      <div className="row searchBoxPadding" >
        <CardBox styleName="col-12"     cardStyle="p-0"
                 headerOutside>
          <Grid container item >
              <Grid item xs={6} md={8} lg={8} style={{fontSize:"17px"}}>
              <div className="trest"><IntlMessages id="Leads"/></div>
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
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
                  style: { color: "rgba(0, 0, 0, 0.7)", fontSize: "14px",background:"white" }
                }}
                // className={this.props.className}
                value={search}
                onChange={handleSearch('search')}
              />
              </Grid>
              {/* <Grid item xs={12} md={12} lg={12}>
              <EnhancedTable filterSearch={search} {...props}/>
              </Grid> */}
            </Grid>
      
            <Grid item>
               <EnhancedTable handleTotalCount={handleTotalCount} offset={offset} rowsPerPage={rowsPerPage} filterSearch={search} {...props}/>

            </Grid>
            <TablePagination 
                    count={totalCount}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]} //to remove rows per page pagination
                    page={page}
                    onChangePage={handleChangePage}
                    // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
        </CardBox> 
      </div>
    </div>
  );
};

export default Tables;

