import React,{useEffect,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { ALLCUSTOMERCOUNT,ADVANCEPAIDPROJECTCOUNT } from '../../../services/grapgql/query';
import * as axios from 'axios';
import { GRAPHQL_URL} from '../../../config/index';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';
const useStyles = makeStyles(theme => ({
    root: {
        width: "90%",
        height: "120px",
        padding: "10px",
        boxShadow: "rgba(136, 136, 136, 0.4) 0px 0px 6px",
        marginBottom: 20
    },
    number: {
        fontSize: 55,
        fontWeight: "bold",
        padding: "0px 20px"
    },
    status: {
        height: "120px",
        width: "6px",
        borderRadius: 10
    },
    title: {
        color: theme.palette.text.disabled,
        fontWeight: 600,
        padding: "0px 20px"
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    // const statuscolorcode = (dash) => {
    //     if (dash === 1) {
    //         return "green"
    //     } if (dash === 2) {
    //         return "red"
    //     } if (dash === 3) {
    //         return "#c38550"
    //     } if (dash === 4) {
    //         return "#5b74e3"
    //     } if (dash === 5) {
    //         return "#65a3d8"
    //     }
    // }
    const [dashCount,setDashCount]  = useState({
      lead:0,
      project:0
    })
   const allCustomerCount = async()=>{
     let leadCount = dashCount;
      await axios.post(GRAPHQL_URL,{query:ALLCUSTOMERCOUNT})
      .then(dashData=>{
        if(dashData){
          leadCount.lead = dashData.data?.data?.allCustomers?.totalCount
          setDashCount({
            ...leadCount
          });
        }
      })
      .catch(err=>{
        console.log(err);
      });
    }
    const allAdvancePaidCount = async()=>{
     let advancePaidCount = dashCount;

      await  axios.post(GRAPHQL_URL,{query:ADVANCEPAIDPROJECTCOUNT})
      .then(dashData=>{
        if(dashData){
          advancePaidCount.project =dashData.data?.data?.allProjects?.totalCount
          setDashCount({
            ...advancePaidCount
          })
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
    useEffect(()=>{
      allAdvancePaidCount();
      allCustomerCount();

    },[]);
    return (
        <div style={{ padding: "32px 37px" }}>
            <Grid container>
                    <Grid item lg={4} xs={12} sm={6}>
                        <Card className={classes.root}>
                            <Grid container>
                                <Grid item lg={3}>
                                    {/* <button onClick={()=>pdf()}>click</button> */}
                                    {/* <div style={{ background: statuscolorcode(2) }} className={classes.status} /> */}
                                </Grid>
                                <Grid item lg={9} md={9} style={{ margin: "auto" }}>
                                    <Typography className={classes.number} variant="h5" component="h2">
                                        {JSON.stringify(dashCount?.lead).length>1 ? dashCount?.lead : dashCount?.lead===0 ? dashCount?.lead: `0${dashCount?.lead}`}
                                        {/* {dashCount?.lead} */}
                                    </Typography>
                                    <Typography className={classes.title} variant="subtitle2">Lead</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item lg={4} xs={12} sm={6}>
                        <Card className={classes.root}>
                            <Grid container>
                                <Grid item lg={3}>
                                    {/* <div style={{ background: statuscolorcode(1) }} className={classes.status} /> */}
                                </Grid>
                                <Grid item lg={9} md={9} style={{ margin: "auto" }}>
                                    <Typography className={classes.number} variant="h5" component="h2">
                                    {JSON.stringify(dashCount?.project).length>1 ? dashCount?.project : dashCount?.project===0 ? dashCount?.project: `0${dashCount?.project}`}
                                    {/* {dashCount?.project} */}
                                    </Typography>
                                    <Typography className={classes.title} variant="subtitle2">Project</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
            </Grid>
​
        </div>
    );
}
export default Dashboard;
