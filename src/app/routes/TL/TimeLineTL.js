import React from 'react';
// import ComposedTextField from 'form/form'
// import InteractiveList from 'list/interactive/InteractiveList';
import 'index.css';
// import { object } from 'prop-types';
// import Wall from './socialApps/routes/Wall/index'
import LeftAligned from 'Timeline/leftAligned/index'
import PostList from "components/wall/PostList/index";
import { postList, user } from "../../routes/LeadQuoteGen/socialApps/routes/Wall/data";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import * as axios from 'axios';
import { PROJECTEVENTSERVICE } from '../../../services/grapgql/mutation';
import { GRAPHQL_URL } from '../../../config/index';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

// ./socialApps/routes/Wall/data




export default class InputForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            project_event_service:[]
        }
    }
    componentDidMount(){
        let projectId = localStorage.getItem('project_id');
        let finalQuoteId = localStorage.getItem('final_quote_id');
        axios.post(GRAPHQL_URL,{query:PROJECTEVENTSERVICE,variables:{Id:projectId,FinalQuoteId:finalQuoteId}})
        .then(project_event=>{
            if(project_event) {
                // console.log(project_event)
                this.setState({
                    project_event_service:project_event?.data?.data?.projectById?.customerByCustomerId?.projectEventsByCustomerId?.nodes
                })
            }
        })
    }

    AutohandleChange= (index) => {

    }
    render() {

        // var {userDetails} = this.state;


        return (
            <>
                <div className="app-wrapper">
                    <div className="col-lg-12 col-md-12" style={{background:"white"}}>
                    {
                     
                     this.state.project_event_service?.map((project_event, index) => ( 
                     
                 
                       <>
                       <div style={{margin:"5px 0px",fontWeight: "bold"}}>
                        <label style={{marginTop:"10px"}}>{`Event Type: ${project_event?.masterEventByEventId.eventName}`}</label>&nbsp;&nbsp;
                     {/* <label>(&#8377;{this.subTotalAmount(project_event?.event_services)})</label> */}
                       </div>
                        <Table style={{    filter: "opacity(0.5)"}}>
                              <TableBody className="padspace" >
                                {
                                  project_event?.eventServicesByProjectEventId?.nodes?.map((row, index1) => (
                                    <TableRow key={row.id} className="padspace" >
                                      <TableCell width="450px" className='padspace ' style={{height: "40px",textAlign: "left"}}>{row?.masterServiceByServiceId?.serviceName}</TableCell>
                                      <TableCell align="center" className="padspace">
                                        {
                                          row?.quantity
                                        }
                                      </TableCell>
                                      <TableCell align="center" className="padspace" >
                                    {/* <label>&#8377;{row?.quantity * Number(row?.servicePrice)}</label>  */}
                                    <Autocomplete
                          multiple
                          id="tags-standard"
                          options={[]}
                        //   getOptionLabel={option => `${option.serviceName}`}
                          value={''}
                          onChange={this.AutohandleChange(index)}
                          // error={this.state.errors.eventType}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={`${option?.serviceName}`} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={params => (
                            <TextField
                            style={{margin:"10px 0px"}}
                              {...params}
                              variant="outlined"
                              label="Choose Service Type"
                              placeholder={'Photo grapher'}
                            //   helperText={project_event?.error ? project_event?.errorMsg: ''}
                            //   error = {project_event?.error?true:false}
                            />
                          )}
                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}

                              </TableBody>
                            </Table>
                       </>
                      
                    ))
                  }
                    </div>
                    <div className="row" id="commentBox" style={{marginTop:"10px"}}>
                        <div className="col-xl-6  col-lg-6 col-md-6 col-sm-6 col-12" >
                            <LeftAligned />
                        </div>
                        <div className="col-xl-6  col-lg-6 col-md-6 col-sm-6 col-12">
                            <PostList postList={postList} user={user} addImage={false} chatHeading="Internal Communication" />

                        </div>






                    </div>





                    {/* <Wall addImage={false} chatHeading="Internal Communication"/>
  <Wall addImage={true} chatHeading="Client Communication"/> */}




                </div>






            </>
        );
    }
}