import React from 'react';
import TableIndex from './TableIndex';
import CardsTable from './../AllLeads/cardsTable/enhanced/CardsTable'
import { Grid } from '@material-ui/core';
import CardLayout from "./../AllLeads/CardLayout/index";


let counter = 0;

function createData(leadId,  leadName) {
  counter += 1;
  return { id: counter, leadId, leadName};
}

class MainDashBoardPhotographer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        
          data: [
            createData('1455', '909283151', 'JAYASOORYA M R'),
            createData('223423', '909283151', 'jayasoorya M R'),
            createData('323434', '909283151', 'sarath babu'),
            createData('4546', '909283151', 'JAYASOORYA M R'),
            createData('564645', '909283151', 'JAYASOORYA M R'),
            createData('4656', '909283151', 'JAYASOORYA M R'),
            createData('745645', '909283151', 'ASHWIN'),
            createData('45648', '909283151', 'JAYASOORYA M R'),
            createData('9456', '909283151', 'SARATH BABU'),
            createData('10456', '909283151', 'JAYASOORYA M R'),
            createData('11', '909283151', 'ASHWIN'),
            createData('12', '909283151', 'JAYASOORYA M R'),
            createData('13', '909283151', 'SARATH BABU'),
            createData('14', '909283151', 'JAYASOORYA M R'),
            createData('15', '909283151', 'SARATH BABU'),
            createData('16', '909283151', 'JAYASOORYA M R'),
            createData('17', '909283151', 'ASHWIN'),
            createData('18', '909283151', 'JAYASOORYA M R'),
            createData('19', '909283151', 'JAYASOORYA M R'),
            createData('20', '909283151', 'ASHWIN'),
          ].sort((a, b) => (a.LeadId < b.LeadId ? -1 : 1)),
      
          
         
      
          dataTwo: [
            createData('999999', '909283151', 'guna'),
            createData('8955', '909283151', 'balaji'),
            createData('323434', '909283151', 'sarath babu'),
            createData('56958', '909283151', 'JAYASOORYA M R'),
            // createData('564645', '909283151', 'JAYASOORYA M R'),
            // createData('4656', '909283151', 'JAYASOORYA M R'),
            // createData('745645', '909283151', 'ASHWIN'),
            // createData('45648', '909283151', 'JAYASOORYA M R'),
            // createData('9456', '909283151', 'SARATH BABU'),
            // createData('10456', '909283151', 'JAYASOORYA M R'),
            // createData('11', '909283151', 'ASHWIN'),
            // createData('12', '909283151', 'JAYASOORYA M R'),
            // createData('13', '909283151', 'SARATH BABU'),
            // createData('14', '909283151', 'CrayonD'),
            // createData('15', '909283151', 'SARATH BABU'),
            // createData('16', '909283151', 'JAYASOORYA M R'),
            // createData('17', '909283151', 'ASHWIN'),
            // createData('18', '909283151', 'JAYASOORYA M R'),
            // createData('19', '909283151', 'JAYASOORYA M R'),
            // createData('20', '909283151', 'ASHWIN'),
          ].sort((a, b) => (a.LeadId < b.LeadId ? -1 : 1)),
         
          // dataThree: [
          //   createData('8888888', '909283151', 'King'),
          //   createData('5555555', '909283151', 'balaji'),
          //   createData('323434', '909283151', 'sarath babu'),
          //   createData('56958', '909283151', 'JAYASOORYA M R'),
          //   createData('564645', '909283151', 'JAYASOORYA M R'),
          //   createData('4656', '909283151', 'JAYASOORYA M R'),
          //   createData('745645', '909283151', 'ASHWIN'),
          //   createData('45648', '909283151', 'JAYASOORYA M R'),
          //   createData('9456', '909283151', 'SARATH BABU'),
          //   createData('10456', '909283151', 'JAYASOORYA M R'),
          //   createData('11', '909283151', 'ASHWIN'),
          //   createData('12', '909283151', 'JAYASOORYA M R'),
          //   createData('13', '909283151', 'SARATH BABU'),
          //   createData('14', '909283151', 'CrayonD'),
          //   createData('15', '909283151', 'SARATH BABU'),
          //   createData('16', '909283151', 'JAYASOORYA M R'),
          //   createData('17', '909283151', 'ASHWIN'),
          //   createData('18', '909283151', 'JAYASOORYA M R'),
          //   createData('19', '909283151', 'JAYASOORYA M R'),
          //   createData('20', '909283151', 'ASHWIN'),
          // ].sort((a, b) => (a.LeadId < b.LeadId ? -1 : 1)),
          dataFour: [
            createData('777777', '909283151', 'Krish'),
            createData('22222222', '909283151', 'balaji'),
            // createData('323434', '909283151', 'sarath babu'),
            // createData('56958', '909283151', 'JAYASOORYA M R'),
            // createData('564645', '909283151', 'JAYASOORYA M R'),
            // createData('4656', '909283151', 'JAYASOORYA M R'),
            // createData('745645', '909283151', 'ASHWIN'),
            // createData('45648', '909283151', 'JAYASOORYA M R'),
            // createData('9456', '909283151', 'SARATH BABU'),
            // createData('10456', '909283151', 'JAYASOORYA M R'),
            // createData('11', '909283151', 'ASHWIN'),
            // createData('12', '909283151', 'JAYASOORYA M R'),
            // createData('13', '909283151', 'SARATH BABU'),
            // createData('14', '909283151', 'CrayonD'),
            // createData('15', '909283151', 'SARATH BABU'),
            // createData('16', '909283151', 'JAYASOORYA M R'),
            // createData('17', '909283151', 'ASHWIN'),
            // createData('18', '909283151', 'JAYASOORYA M R'),
            // createData('19', '909283151', 'JAYASOORYA M R'),
            // createData('20', '909283151', 'ASHWIN'),
          ].sort((a, b) => (a.LeadId < b.LeadId ? -1 : 1)),
          dataFive: [
            createData('22222222', '909283151', 'danny'),
            createData('00000000', '909283151', 'balaji'),
            createData('323434', '909283151', 'sarath babu'),
            // createData('56958', '909283151', 'JAYASOORYA M R'),
            // createData('564645', '909283151', 'JAYASOORYA M R'),
            // createData('4656', '909283151', 'JAYASOORYA M R'),
            // createData('745645', '909283151', 'ASHWIN'),
            // createData('45648', '909283151', 'JAYASOORYA M R'),
            // createData('9456', '909283151', 'SARATH BABU'),
            // createData('10456', '909283151', 'JAYASOORYA M R'),
            // createData('11', '909283151', 'ASHWIN'),
            // createData('12', '909283151', 'JAYASOORYA M R'),
            // createData('13', '909283151', 'SARATH BABU'),
            // createData('14', '909283151', 'CrayonD'),
            // createData('15', '909283151', 'SARATH BABU'),
            // createData('16', '909283151', 'JAYASOORYA M R'),
            // createData('17', '909283151', 'ASHWIN'),
            // createData('18', '909283151', 'JAYASOORYA M R'),
            // createData('19', '909283151', 'JAYASOORYA M R'),
            // createData('20', '909283151', 'ASHWIN'),
          ].sort((a, b) => (a.LeadId < b.LeadId ? -1 : 1)),
          LeadStatusOne: [
            {
              value: 'AssignPhotographers',
              label: 'Assign Photographers',
            },
            {
              value: 'PhotoshopOnly',
              label: 'Photoshop Only',
            },
           
          ],
          LeadStatusTwo: [
        
            {
              value: 'CustomerOk',
              label: 'Customer Okay',
            },
            {
              value: 'CustomerNotOk',
              label: 'Customer Not Okay',
            },
          ],
          LeadStatusThree:[
            {
              value: 'Select',
              label: 'Select',
            },
            {
                value: 'AssignToPhotoShopTeam',
                label: 'Assign to Photo Shop Team',
              },
      
          ],
          LeadStatusFour:[
            {
                value: 'AssignQcTeamMember',
                label: 'Assign QC Team Member',
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
          LeadStatusFive:[
            {
                value: 'ReAssignPhotoShopTeamMember',
                label: 'ReAssign Photo Shop Team Member',
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
render(){
    let {data} =this.state;
// let{dataTwo}=this.state;
// let{dataThree}=this.state;
let{dataFour}=this.state;
// let{dataFive}=this.state;
let {LeadStatusOne}=this.state;
let {LeadStatusTwo}=this.state;
// let {LeadStatusThree,LeadStatusFour,LeadStatusFive}=this.state;
    return(
        <div className="app-wrapper" >
<TableIndex />

<Grid item container justify="space-around"
                alignItems="center" >
          <Grid item container justify="space-around"
            alignItems="center" spacing={2}>
            <Grid item xs={12} lg={6} >
          

            
          <CardLayout styleName="col-lg-12" >

         <CardsTable stylesdropdown="none" stylesdropdown2="none" stylesdropdown3='none' LeadStatus={LeadStatusOne} cardsTableHeight='400px'   datas={data} tableHeading={'Remainders for Events'}  buttonName={'Follow-Up'}/>
        </CardLayout>
    
                  
               </Grid>             
            <Grid item xs={12} lg={6} >

              
            
          <CardLayout styleName="col-lg-12" >


         <CardsTable stylesdropdown="none" stylesdropdown2="none" stylesdropdown3='none' cardsTableHeight='400px' LeadStatus={LeadStatusTwo}  datas={dataFour} navlinks={'time-line-TL'} tableHeading={'Remainders for Photo Upload'} buttonName={'Album Selection'}/>
        </CardLayout>
      
              

            </Grid>

          </Grid>
         
   
{/*  */}

          </Grid>
</div>
    )
}
}
export default MainDashBoardPhotographer;