import React, { cloneElement, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { numberFormat } from '../../priceformat/price'
import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import CardBox from 'components/CardBox/index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MASTER_SERVICES, GETEPROJECTEVENT } from '../../services/grapgql/query';
import { PDFGENERATER } from '../../services/grapgql/mutation';
import * as axios from 'axios';
import {  GRAPHQL_URL } from '../../config/index';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
// import DatePickers from 'pickers/date/DatePickers';
// import CheckboxList from '../checkbox/CheckboxList';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'index.css'
import Checkbox from '@material-ui/core/Checkbox';
// import CircularProgress from "../../components/CircularProgress/index";

import { Grid } from '@material-ui/core';
import moment from "moment";
function generate(element) {
  return [0].map(value =>
    cloneElement(element, {
      key: value,
    }),
  );
}
;
class InteractiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unmounted:false,
      discount: 0,
      baseAmt: 0,
      totalAmt: 0,
      tax: 0,
      netAmt: 0,
      type: 'current',
      dates: '',
      adjustmentAmt: 0,
      master_services: [],
      selected_master_service: [],
      final_event_service: [],
      project_event: []
    }
  }
  componentDidMount() {
    this.master_service_fun();
    this.get_project_event();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
    this.get_project_event();

    }
  }
  componentWillUnmount(){
    this.setState({
      unmounted : true
    });
    
  }
  get_project_event = () => {
    axios.post(GRAPHQL_URL, { query: GETEPROJECTEVENT, variables: { id: this.props.match.params.id } })
      .then(response => {
        if(this.state.unmounted) return;
        let project_event_value = response.data.data?.customerById?.projectEventsByCustomerId?.nodes;
        project_event_value = project_event_value?.map(map_data => {
          map_data[map_data.masterEventByEventId.eventName] = [];
          map_data.error = false;
          map_data.errorMsg = "please fill this field";
          return map_data;
        })
        this.setState({
          project_event: project_event_value
        })
      })
  }
  master_service_fun = async () => {
    await axios.post(GRAPHQL_URL, { query: MASTER_SERVICES })
      .then(response => {
        if(this.state.unmounted) return;

        this.setState({
          master_services: response.data.data?.allMasterServices?.nodes
        })
      })
  }
  handleCheked = (trueOrfalse, string, value, service) => {
    let { baseAmt } = this.state;
    let { totalAmt } = this.state;
    let { tax } = this.state;
    let { netAmt } = this.state;
    let { discount } = this.state;
    let selected_master_service = this.state.selected_master_service;
    if (trueOrfalse === true) {
      baseAmt = baseAmt + Number(value);
      totalAmt = baseAmt - discount;
      tax = (totalAmt) * 18 / 100
      netAmt = totalAmt + tax;
    } else {
      baseAmt = baseAmt - Number(value)
      totalAmt = baseAmt - discount;
      tax = (totalAmt) * 18 / 100
      netAmt = totalAmt + tax;
    }
    selected_master_service && selected_master_service.some((select_service, index) => select_service.id === service.id) ? selected_master_service = selected_master_service && selected_master_service.filter((selected_data_filter, index) => selected_data_filter.id !== service.id) : selected_master_service && selected_master_service.push(service);
    if(this.state.unmounted) return;
    
    this.setState({ [string]: trueOrfalse, baseAmt, netAmt, tax, totalAmt, selected_master_service });

  }

  discountChange = (e) => {

    let { baseAmt, totalAmt, tax, netAmt, adjustmentAmt } = this.state;
    let discount = e;

    totalAmt = (baseAmt + Number(adjustmentAmt)) - discount;
    if (totalAmt < 0) {
      this.props.alertOpenBox({ open: true, content: "Oops your discount amount is greater than the Base amount", status: "info" });
      return false;
    }
    else {
      if(this.state.unmounted) return;

      this.setState({ totalAmt });

    }

    tax = (totalAmt) * 18 / 100
    netAmt = totalAmt + tax;
    if(this.state.unmounted) return;

    this.setState({ discount, netAmt, tax });
  };
  splitAmountValue = (price)=>{
    let stringPrice = String(price);
    if(stringPrice.length>3){
      let count =0;
      let totalCount = 0;
      let dub_price = Number(price);
      let returnString = '';
      let enterFirstThree = false;
      while(dub_price!==0){
        returnString =Number(dub_price%10)+returnString;
        dub_price = Math.floor(dub_price/10);
        let convertPrice = String(dub_price).split(".")[0];
        dub_price = Number(convertPrice);
        // console.log(dub_price)
        count = count+1;
        totalCount = totalCount +1;
        if(count===3){
          returnString = ','+returnString;
          count=0;
          enterFirstThree= true;
        }
        if(count===2 && enterFirstThree && totalCount!==stringPrice.length){
          count=0;
          returnString = ','+returnString;

        }
        
      }
      return returnString;
    }
    else{
      return price;
    }
  }
  generate_pdf = async (quoteid,heading) => {
    this.props.circularProcess(true);
    var doc = new jsPDF();
    let count = 0;
    doc.internal.events.subscribe('addPage', function() { 
      count=count+1;
      if(count>2){
        doc.setFillColor(232, 225, 225);
        doc.rect(0, 0 , 210,300, "F");
      }
    }
      );
    // let pdfbasefont1;
    // await this.pdfImages("Italiana-Regular.ttf",(base64Data)=>{
    //   pdfbasefont1 =base64Data;
    //  });
    //  doc.addFileToVFS("MarkaziText-Regular", pdfbasefont1);
    //  doc.addFont('MarkaziText-Regular', 'courier', 'normal');
    // doc.addFont(`data:application/font-ttf;charset=utf-8;base64,${pdfbasefont1}`,'avenirfont','normal');

    // doc.setFont('avenirfont');
    // doc.setFontType('courier');

    doc.setFontSize(11);
    let strip;
    await this.pdfImages("Background.jpg", (base64Data) => {
      strip = base64Data;
    });
    let pdfbaseImage1;
    let pdfbaseImage2;
    let pdfbaseImage3;
    let pdfbaseImage4;
    let pdfbaseImage5;
    await this.pdfImages("Invoice+Images-01.jpg", (base64Data) => {
      pdfbaseImage1 = base64Data;
    });
    await this.pdfImages("Invoice+Images-02.jpg", (base64Data) => {
      pdfbaseImage2 = base64Data;
    });
    await this.pdfImages("fifthanglestudios.png", (base64Data) => {
      pdfbaseImage3 = base64Data;
    });
    await this.pdfImages("Invoice+Images-03.jpg", (base64Data) => {
      pdfbaseImage4 = base64Data;
    });
    await this.pdfImages("Invoice+Images-04.jpg", (base64Data) => {
      pdfbaseImage5 = base64Data;
    });
    doc.addImage(strip, "JPEG", 0, 150, 210, 30);
    doc.addImage(pdfbaseImage1, "JPEG", 10, 40, 100, 120);
    doc.addImage(pdfbaseImage4, "JPEG", 40, 165, 70, 95);
    doc.addImage(pdfbaseImage3, "JPEG", 130, 40, 40, 40);
    doc.addImage(pdfbaseImage2, "JPEG", 115, 90, 85, 100);
    // doc.addImage(pdfbaseImage5,"JPEG",115,165,85,115);
    doc.addPage();
    let pdfbaseImage6;
    let pdfbaseImage7;
    let pdfbaseImage8;
    let pdfbaseImage9;
    await this.pdfImages("Invoice+Images-12.png", (base64Data) => {
      pdfbaseImage6 = base64Data;
    });
    await this.pdfImages("Invoice+Images-05.jpg", (base64Data) => {
      pdfbaseImage7 = base64Data;
    });
    await this.pdfImages("Invoice+Images-06.jpg", (base64Data) => {
      pdfbaseImage8 = base64Data;
    });
    await this.pdfImages("Invoice+Images-08.png", (base64Data) => {
      pdfbaseImage9 = base64Data;
    });
    doc.addImage(strip, "JPEG", 10, 30, 20, 240);
    doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
    doc.addImage(pdfbaseImage5, "JPEG", 20, 40, 110, 100);
    doc.addImage(pdfbaseImage7, "JPEG", 135, 60, 65, 90);
    doc.addImage(pdfbaseImage9, "JPEG", 40, 150, 70, 30);

    doc.text(`Established in the year 2015 by Manoj Nagarajan, Fifth Angle Studios\n continues to be striving, for one thing, i.e., making sure that every\n single moment of a wedding is captured beautifully and delivered to\n you with the very soul of it.\n\n
We shoot and treat a lot of weddings a year, but for us, every single\n wedding is as significant as it is to you. Just because of that, we have\n been able to come where we are now and have a great record of client\n satisfaction. We cater to not just weddings but any event that asks for\n aesthetically captured memories. 
      `, 50, 180);
    doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
    doc.addPage();
    let pdfbaseImage10;
    // let pdfbaseImage11;
    await this.pdfImages("Invoice+Images-09.png", (base64Data) => {
      pdfbaseImage10 = base64Data;
    });
    // await this.pdfImages("Invoice+Images-07.jpg",(base64Data)=>{
    //   pdfbaseImage11 =base64Data;
    // });
    doc.addImage(strip, "JPEG", 0, 80, 60, 20);
    doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
    doc.addImage(pdfbaseImage10, "JPEG", 75, 40, 60, 30);
    doc.addImage(pdfbaseImage8, "JPEG", 20, 75, 170, 175);
    doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
    doc.text(`Engagement · Wedding · Birthday · Portfolio · Outdoor · Events`, 50, 70);
    doc.addPage();
    let pdfbaseImage14;
    await this.pdfImages("Invoice+Images-10.png", (base64Data) => {
      pdfbaseImage14 = base64Data;
    });
    doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
    doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
    doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
    let deliverables = [];
    // let totalAmount = 0;
    await axios.post(GRAPHQL_URL, { query: PDFGENERATER, variables: { projectQuoteId: quoteid } })
      .then(serviceData => {
        if (serviceData) {
          doc.fromHTML(`<b>Client Name: ${serviceData?.data?.data?.projectQuoteById?.projectByProjectId?.customerByCustomerId?.name}</b>`, 20, 30);
          doc.fromHTML(`<b>Quote Date: ${moment(new Date()).format('Do MMMM YYYY')}</b>`, 20, 40)
          let eventTypeData = serviceData?.data?.data?.projectQuoteById?.projectByProjectId?.customerByCustomerId?.projectEventsByCustomerId?.nodes?.filter(newEvent=>newEvent.eventServicesByProjectEventId.nodes.length!==0);
          eventTypeData.map(eventValue => {
            // doc.text(`${eventValue?.masterEventByEventId?.eventName} | Location: ${eventValue?.location} | Date: ${moment(eventValue?.eventStartDate).format('Do MMMM YYYY')}`,20,100);

            let serviceDatas = []; 
            eventValue.eventServicesByProjectEventId.nodes.map(serviceData => {
              if(serviceData?.isDeliverable){
                deliverables.push([serviceData.masterServiceByServiceId?.description,serviceData?.quantity,serviceData.masterServiceByServiceId?.duration]);
              }else{
                serviceDatas.push([serviceData.masterServiceByServiceId?.serviceName, serviceData?.quantity]);

              }
              // totalAmount = totalAmount + (Number(serviceData?.quantity)*Number(serviceData?.servicePrice));
              return serviceData;
            })
            doc.autoTable({
              head: [[`${eventValue?.masterEventByEventId?.eventName} | Location: ${eventValue?.location} | Event Date: ${moment(eventValue?.eventStartDate).format('Do MMMM YYYY')}`]],
              theme: "plain",
              headStyles: {
                valign: "middle", halign: "center",
                fillColor: [255, 255, 255],
                // font:"courier"

              },
              styles: {
                fontSize: 11
              },
              margin: { top: 55, right: 20, bottom: 40, left: 20 }
            })
            doc.autoTable({
              body: serviceDatas,
              head: [
                [`Time Slot: ${moment(eventValue?.eventStartDate).format('a') === "pm" ? "Evening" : "Morning"}`, "Crew"]
              ],
              headStyles: {
                valign: "middle", halign: "left",
                fontStyle:"bold",
                textColor:"black"
                // fillColor: [255, 255, 255],
                // font:"courier"


              },
              alternateRowStyles: {
                borderBottomStyle: "5px solid red",
              },
              styles: {
                fontSize: 11,
                // font:"courier"
              },
              columnStyles: {
                0: { cellWidth: 120, halign: "left" },
                1: { cellWidth: 50, halign: "left" },
              },
              theme: "plain",
              margin: { top: 55, right: 20, bottom: 40, left: 20 },
              didDrawPage: () => {
                // doc.setFillColor(232, 225, 225);
                // doc.rect(0, 0 , 210,300, "F");
                doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
                doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
                doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);

              },
              didDrawCell: data => {
                if (data.section === 'body') {

                  // doc.setFont('avenirfont');
                }
              },
              // willDrawCell: data => {
              //   doc.line(20, 25, 60, 25);
              // }
            });
            return eventValue;
          })
          if(deliverables?.length>0){
            doc.autoTable({
            head: [['Deliverables', "Qty", "Duration"]],
            // body: [
            //   [`Processed Candid Photos for sharing on social media`, "40-50", "7 - 10 days"],
            //   [`Soft Copy of Raw Photo jpegs`, "", "5 - 7 days"],
            //   ["Premium Albums with 200 - 220 photos in 40 sheets (each)", "2", "30 - 40 days after selection of photos"],
            //   [`A documentary HD video of the entire event edited in 20 - 45 minutes & delivered in pen-drive (length of the video depends on the duration of the event)`, "1", "60 - 70 days"]
            // ],
            body:deliverables,
            columnStyles: {
              0: { cellWidth: 80, halign: "left" },
              1: { cellWidth: 40, halign: "left" },
              2: { cellWidth: 50, halign: "left" },
              // etc
            },
            headStyles: {
              valign: "middle", halign: "left",
              fillColor: [255, 255, 255],
              // font:"courier"


            },
            styles: {
              fontSize: 11,
              // font:"courier"
            },
            didDrawPage: () => {
              doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
              doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
              doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
            },
            didDrawCell: data => {
              if (data.section === 'body') {

                // doc.setFont('avenirfont');
              }
            },
            theme: "plain",
            margin: { top: 55, right: 20, bottom: 40, left: 20 }
          })
          }
          // doc.setFontType("bold");
          // doc.setFontSize(13);
          // doc.text(`Price: Rs ${this.splitAmountValue(totalAmount)} + GST`, 140, 75);
          // let discount = serviceData?.data?.data?.projectQuoteById?.discount ? Number(serviceData?.data?.data?.projectQuoteById?.discount) : 0;
          // let adjestmentamt = serviceData?.data?.data?.projectQuoteById?.adjustmentAmt ? Number(serviceData?.data?.data?.projectQuoteById?.adjustmentAmt) : 0;
          // totalAmount = totalAmount - discount - adjestmentamt;
          doc.autoTable({
            head:[[`Price: Rs ${this.splitAmountValue(serviceData?.data?.data?.projectQuoteById?.totalAmt)} + GST`]],
            headStyles: {
              valign: "middle", halign: "center",
              fontStyle:"bold",
              fontSize:12,
              textColor:"black",

              fillColor: [255, 255, 255],
              // // font:"courier"


            },
            margin: { top: 55, right: 20, bottom: 40, left: 20 },

            didDrawPage: () => {
              doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
              doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
              doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
            },
            theme: "plain"
          })
          doc.addPage();
          doc.autoTable({
            head: [['Optionals', "Qty", "Price"]],
            body: [
              [`Candid Cinematography: Teaser & Film`, "2 Sessions", "Rs.1,00,000"],
              [`Live projection PlasmaTV Screens`, "1 Unit per session", "Rs.2,000 + Transport"],
              [`LED Wall 8 × 6 + Engineer`, "1 Session", "Rs.22,000 + Transport"],
              ["Online HD Mixer + Technicians", "1 Session", "Rs.15,000"],
              ["Helicam / Drone", "1 Session", "Rs.20,000"],
              ["Live Internet Webcasting: Per hour Ask for quote Domain Name + Designer + Server", "Per hour", "Ask for quote"]
            ],
            columnStyles: {
              0: { cellWidth: 70, halign: "left" },
              1: { cellWidth: 50, halign: "left" },
              2: { cellWidth: 50, halign: "left" },
              // etc
            },
            headStyles: {
              valign: "middle", halign: "left",
              fillColor: [255, 255, 255],
              // font:"courier"


            },
            styles: {
              fontSize: 11,
              // font:"courier"
            },
            theme: "plain",
            didDrawPage: () => {
              doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
              doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
              doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
            },
            didDrawCell: data => {
              if (data.section === 'body') {

                // doc.setFont('avenirfont');
              }
            },
            margin: { top: 55, right: 20, bottom: 40, left: 20 }
          })
        }
      })
    doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);

    doc.addPage();
    let pdfbaseImage12;
    await this.pdfImages("Invoice+Images-11.png", (base64Data) => {
      pdfbaseImage12 = base64Data;
    });
    doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
    doc.addImage(pdfbaseImage12, "JPEG", 20, 5, 60, 30);
    doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
    doc.text(`
1. Travel to and fro to the venue outside Chennai with Accommodation and Food for the crew should\n be provided/reimbursed by the client.\n
2. 50% of amount payable on confirmation, 40% due before the event and 10% due before the\n delivery of raw photographs.\n
3. Copyrights of all the images and video remains to Fifth Angle Studios and will be used for\n promotional purposes.\n
4. Pictures for the album should be selected within 3 months after receiving the raw files.\n
5. Additional copies of album will be charged extra. (approx 25,000/- for a 40 sheet album)\n
6. Additional sheets of the album will be charged extra.\n
7. Only on receipt of final payment, all original high res photos will be delivered.\n
8. One revision of album design is free, while no revision of album after printing. Customer shall\n request for additional changes in album design at an extra cost.\n
9. Booking to be confirmed by signing a Letter of Contract and payment of advance. No refund of \nadvance at any situation.\n
10. Services listed in the package above can be customized based upon client requirements.\n
11. Traditional video or documentary video of the event will be edited only in our format/style. No\n changes can be made by the client.\n
12. Preferences and song choices for the candid teaser and wedding film should be told at the\n initial stage by the client. Only one free revision is allowed after this and further more revisions\n can be made at an extra cost.\n
13. To include any optionals to the package, notification before 15 days from the date of event is\n mandatory.\n
14. Outstation travel cost to be covered by clients. Mode of travel will be our preference.\n
15. Candid pictures for the retouch to be selected only by our team.\n
16. After closing the pending payment, client should collect the raw files within 7 days in their own\n hard disk.
          `, 20, 40);
    doc.addPage();
    doc.setFillColor(255, 253, 252);
    doc.rect(0, 0, 210, 300, "F");
    let pdfbaseImage13;
    let icon1;
    let icon2;
    let icon3;
    await this.pdfImages("Thank+you.png", (base64Data) => {
      pdfbaseImage13 = base64Data;
    });
    await this.pdfImages("insta.png", (base64Data) => {
      icon1 = base64Data;
    });
    await this.pdfImages("fb.png", (base64Data) => {
      icon2 = base64Data;
    });
    await this.pdfImages("yt.png", (base64Data) => {
      icon3 = base64Data;
    });
    doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
    doc.addImage(strip, "JPEG", 0, 70, 125, 30);
    doc.addImage(pdfbaseImage13, "JPEG", 65, 70, 60, 30);
    doc.addImage(icon1, "JPEG", 40, 125, 8, 8);
    doc.addImage(icon2, "JPEG", 85, 125, 8, 8);
    doc.addImage(icon3, "JPEG", 130, 125, 8, 8);
    doc.text(`fifth_angle_studios`, 50, 130)
    doc.text(`FifthAngleStudios`, 95, 130)
    doc.text(`FifthAngleStudios`, 140, 130)

    doc.text(`info@fifthanglestudios.com | www.fifthanglestudios.com`, 50, 140)
    doc.text(`No. 49/13, Habibullah Road, T.Nagar, Chennai-17`, 55, 160);
    doc.text(`+91 8870042555, 9884789497`, 65, 170)
    doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);

    doc.save(`${heading}.pdf`);

    this.props.circularProcess(false);
    // this.props.clientCommunication({type:"email",msg:"quote details send success"});
    // await axios.post(`${API_URL}/api/v1/email/send_quote_email`,{to:[this.props.email],message:"send quote send via email"})
    // .then(email_res=>{
    //   if(email_res){
    //     this.props.alertOpenBox({open:true,content:"Email sent successful",status:"success"});
    //   }
    // })
    // .catch(err=>{
    //   this.props.alertOpenBox({open:true,content:"Network error",status:"warning"});
    // })
  }
  pdfImages = async (url, callback) => {
    if(this.state.unmounted) return;

    await axios.get(`https://fas-images-assets.s3.ap-south-1.amazonaws.com/pdfimages/${url}`,
      {
        responseType: 'arraybuffer'
      }).then(response => {
        callback(Buffer.from(response.data, 'binary').toString('base64'));
      })
      .catch(console.error)
  }
  AdjustmentAmtChanges = (value) => {
    let { baseAmt, discount, totalAmt, tax, netAmt } = this.state;
    let adjustmentAmt = value;

    totalAmt = baseAmt - discount ;
    if (totalAmt < 0) {
      this.props.alertOpenBox({ open: true, content: "Oops your adjustmentAmt amount is greater than the Base amount", status: "info" });
      return false;
    }
    else {
      totalAmt = (baseAmt - discount) + Number(adjustmentAmt);
      if(this.state.unmounted) return;

      this.setState({ totalAmt });

    }

    tax = (totalAmt) * 18 / 100
    netAmt = totalAmt + tax;
    if(this.state.unmounted) return;

    this.setState({ adjustmentAmt, netAmt, tax });
  }
  addQuote = () => {
    let status = false;
    let service_list_type = this.state.project_event;
    service_list_type = service_list_type.map((check_value, index) => {
      if (check_value[this.state.project_event[index].masterEventByEventId.eventName].length > 0) {
        check_value.error = false;
        check_value[this.state.project_event[index].masterEventByEventId.eventName].map(serviceValue => {
          if (serviceValue.is_deliverable || serviceValue.modifyprice.trim().length > 0) {
            if (serviceValue.is_deliverable || Number(serviceValue.modifyprice.trim()) > 0) {
              serviceValue.error = false
            } else {
              status = true;
              serviceValue.error = true;
            }

          } else {
            status = true;
            serviceValue.error = true;
          }
          return serviceValue;
        })
      } else {
        status = true;
        check_value.error = true;
      }
      return check_value;
    });
    if (status) {
      if(this.state.unmounted) return;

      this.setState({
        project_event: service_list_type
      })
      // this.props.alertOpenBox({open:true,content:"You must fill in all required fields.",status:"warning"});
      return;
    }
    if(this.state.unmounted) return;

    this.props.circularProcess(true);
    this.props.handleAddQuote({ ...this.state, customer_id: this.props.match.params.id });
    this.setState({
      discount: 0,
      baseAmt: 0,
      totalAmt: 0,
      tax: 0,
      netAmt: 0,
      type: 'current',
      dates: '',
      adjustmentAmt: 0,
      selected_master_service: [],
      project_event: []
    });
    this.master_service_fun();
    this.get_project_event();
  }
  renderButton = (type) => {

    if (type === "current") {
      return <div > <Button type="submit" variant="contained" style={{ backgroundColor: '#3f51b5' }} className="jr-btn bg- text-white btn-format" onClick={this.addQuote}>Add Quote</Button></div>
    } else if (this.props.quoteId === this.props.finalQuote_id) {
      return <Button type="submit" variant="outlined" disabled={typeof this.props.finace === "undefined" ? false : this.props.finace} style={{ border: '1px solid white' }} className="jr-btn bg-danger text-white btn-format" onClick={() => this.props.handleFinalized()} >Final Quote</Button>
    } else {
      return <Button type="submit" variant="outlined" style={{ backgroundColor: 'nsparent', border: '1px solid red' }} className="jr-btn  text-red btn-format" onClick={() => this.props.handleUnFinalized(this.props.quoteId)} >Not Final</Button>
    }
  }
  AutohandleChange = name => (event, value) => {
    const state = this.state;
    let autoValue = value;
    autoValue = autoValue?.map(change_obj => {
      if (typeof change_obj.quantity === "undefined") {
        change_obj.quantity = 1;
        change_obj.modifyprice = change_obj.price.trim();
        change_obj.is_deliverable = false;
        change_obj.error = false;
        change_obj.created_at= new Date();
        change_obj.errorMsg = "please fill this field";
      }
      return change_obj
    })
    state.project_event[name][state.project_event[name].masterEventByEventId.eventName] = JSON.parse(JSON.stringify(autoValue));
    if(this.state.unmounted) return;

    this.setState({
      ...state
    })
    this.netAmountCalc();
  };
  netAmountCalc = () => {
    let calc_amount = this.state.project_event;
    let state = this.state;
    let baseAmt = 0;
    let totalAmt = 0;
    let tax = 0;
    let netAmt = 0;
    calc_amount.map(obj_ex => {
      obj_ex.subTotal = 0;
      obj_ex[obj_ex.masterEventByEventId.eventName].map(data_ex => {
        let changePrice = data_ex.modifyprice.length > 0 ? Number(data_ex.modifyprice) : 0;
        baseAmt = baseAmt + (changePrice * data_ex.quantity);
        obj_ex.subTotal = obj_ex.subTotal + (changePrice * data_ex.quantity);
        return data_ex;
      })
      return obj_ex;
    })
    totalAmt = baseAmt+Number(state.adjustmentAmt) - state.discount;
    tax = (totalAmt) * 18 / 100
    netAmt = totalAmt + tax;
    if (baseAmt === 0) {
      state.discount = 0;
      state.adjustmentAmt = 0;
      baseAmt = 0;
      totalAmt = 0;
      tax = 0;
      netAmt = 0;
    }
    if(this.state.unmounted) return;

    this.setState({
      ...state,
      baseAmt,
      totalAmt,
      tax,
      netAmt
    })
  }
  handleDateChange = (date) => {
    if(this.state.unmounted) return;

    this.setState({ selectedDate: date._d })

  };
  // handleChange = (name, index, e) => {
  //   const state = this.state;
  //   state.project_event[index][name] = e.target.value;
  //   this.setState({

  //   })
  // }
  // handleQuantity = (data, name) => {

  // }
  subTotalAmount = (serviceValue) => { 
    let subAmount = 0;
    serviceValue.map(data => {
      subAmount = subAmount + (data?.quantity * Number(data?.servicePrice));
      return data;
    })
    return subAmount;
  }
  render() {
    const see = this.props.see;
    const see1 = this.props.see1;
    const headings = this.props.headings;
    let data = this.props.type !== "current" ? this.props.data : this.state;
    // const d = new Date();
    const date = moment(data?.createdAt).format('Do MMMM YYYY');
    const { dense } = this.state;
    return (
      <CardBox
        styleName="col-lg-12 col-md-12 col-sm-12 p-0 m-0" style={{ padding: '0 !important' }} className="cardsInteractiveList"

      >

        <div >

          <div className="row">
            {/* <div className="col-lg-12"> */}

            <div className="col-lg-1 p-0 " style={{ textAlign: "left", padding: '0px !important', position: 'relative' }}>
              {data.type === "finalized" ? <label class="label danger" style={{ margin: ' !important' }}>Finalized</label> : null}
            </div>
            <div className="col-lg-11" style={{ fontWeight: 'bold', textAlign: "center" }}>
              {(headings) ?


                <div className="row">
                  <div className="col-lg-7 col-6 text-lg-right text-sm-left " >
                    <span >{headings}</span>
                  </div>
                  <div className="col-lg-5 col-6  " style={{ textAlign: 'right' }} >
                    {/* <span style={{ fontWeight: 'normal' }}></span><br /> */}
                    <span style={{ fontWeight: '500', fontSize: "13px" }}>{date}</span>
                  </div>
                </div>
                :
                <>
                  <div className="row">
                    <div className="col-lg-7 col-6 text-lg-right text-sm-left " >
                      <span >Generate Quote</span>
                    </div>
                    <div className="col-lg-5 col-6  " style={{ textAlign: 'right' }} >
                      <span >{this.renderButton(data.type)}</span>
                    </div>
                  </div>


                </>
              }


            </div>
            {/* </div> */}
          </div>
          <FormGroup style={{ padding: '9px' }}>
            {
              data.type === "current" ?
                <>
                  {
                    data.project_event?.length === 0 ?
                      <TextField
                        id="outlined-password-input"
                        label="&#8377; &nbsp;Service Type"
                        disabled={this.props.see}
                        type="text"
                        // className="black"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        value=""
                        style={{ width: '100%' }}
                      // disabled={{ see }}

                      /> :
                      data.project_event && data.project_event?.map((project_event, index) => (
                        <>
                          <div style={{ margin: "10px 0px", fontWeight: "bold" }}>
                            <label>{`${project_event.masterEventByEventId.eventName}`}</label>&nbsp;&nbsp;
                    <label>{typeof project_event.subTotal === "undefined" ? "" : <label>{numberFormat(project_event?.subTotal)}</label>}</label>
                          </div>
                         <div style={{width:"100%"}}>
                         <Autocomplete
                            multiple
                            id="tags-standard"
                            options={this.state.master_services}
                            getOptionLabel={option => `${option.serviceName}`}
                            value={project_event[project_event.masterEventByEventId.eventName]}
                            onChange={this.AutohandleChange(index)}
                            // error={this.state.errors.eventType}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip variant="outlined" label={`${option.serviceName}`} {...getTagProps({ index })} />
                              ))
                            }
                            renderInput={params => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Choose Service Type"
                                placeholder={project_event[project_event.masterEventByEventId.eventName].length > 0 ? "" : "Choose Service Type"}
                                helperText={project_event?.error ? project_event?.errorMsg : ''}
                                error={project_event?.error ? true : false}
                                style={{ width: '100%' }}

                              />
                            )}
                          />
                         </div>
                          {
                            project_event[project_event.masterEventByEventId.eventName].length > 0 ? <div style={{ margin: "10px 0px" }}>
                              <Table  >
                                <TableBody className="padspace">
                                  {

                                    project_event[project_event.masterEventByEventId.eventName]?.map((row, index1) => (
                                      <TableRow key={row.id} className="padspace">
                                        <TableCell align="center" width="50px" className="padspace">
                                          <Grid style={{padding: "1px 4px", marginRight: "10px"}}>
                                            <div>
                                              <div>
                                              <Checkbox 
                                            checked={row?.is_deliverable}
                                            onChange={(e) => {
                                              let state = this.state;
                                              state.project_event[index][project_event.masterEventByEventId.eventName][index1].is_deliverable = e.target.checked;
                                              if(this.state.unmounted) return;
                                              
                                              this.setState({
                                                ...state
                                              })
                                            }}
                                            color="primary"
                                          />
                                              </div>
                                            </div>
                                         
                                          </Grid>
                                        </TableCell>
                                        <TableCell width="250px" className='padspace' style={{ height: "46px", textAlign: "left" }}><label>{`${row?.serviceName}`}</label></TableCell>
                                        <TableCell width="250px" align="center" className="padspace">
                                          <TextField
                                            id="price"
                                            label="&#8377; &nbsp;Price"
                                            type="number"
                                            // title="Enter in rupees"
                                            autoComplete="current-password"
                                            margin="dense"
                            onKeyDown={ (evt) => (evt.which === 40 || evt.which === 38) && evt.preventDefault() }

                                            onInput={(e) => {
                                              e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                                            }}
                                            variant="outlined"
                                            value={row?.modifyprice}
                                            helperText={row?.error ? row?.errorMsg : ''}
                                            error={row?.error ? true : false}
                                            // onChange={(e) => this.setState({ discount: e.target.value })}
                                            onChange={(e) => {
                                              let state = this.state;
                                              state.project_event[index][project_event.masterEventByEventId.eventName][index1].modifyprice = e.target.value;
                                              if(this.state.unmounted) return;
                                              
                                              this.setState({
                                                ...state
                                              })
                                              this.netAmountCalc();
                                            }}
                                          // disabled={data.type === "current" ? see1 : see}
                                          // style={{ width: '100%' }}
                                          />
                                        </TableCell>
                                        <TableCell width="200px" align="center" className="padspace">
                                          {
                                            <div style={{ display: "flex" }}><div style={{
                                              background: "#3e51b5",
                                              padding: "1px 4px",
                                              lineHeight: "0px",
                                              borderRadius: "3px",
                                              marginRight: "10px"
                                            }}><RemoveIcon style={{ color: "#fff" }} onClick={() => {
                                              let state = this.state;
                                              let assignValue = state.project_event[index][project_event.masterEventByEventId.eventName][index1].quantity;
                                              if (assignValue > 1) {
                                                state.project_event[index][project_event.masterEventByEventId.eventName][index1].quantity = assignValue - 1;
                                              }
    if(this.state.unmounted) return;

                                              this.setState({
                                                ...state
                                              })
                                              this.netAmountCalc()
                                            }} />
                                            </div><div style={{ fontWeight: "bold", lineHeight: "25px" }}>{row?.quantity}</div><div style={{
                                              background: "#3e51b5",
                                              padding: "1px 4px",
                                              lineHeight: "0px",
                                              borderRadius: "3px",
                                              marginLeft: "10px"
                                            }}><AddIcon style={{ color: "#fff" }} onClick={() => {
                                              let state = this.state;
                                              let assignValue = state.project_event[index][project_event.masterEventByEventId.eventName][index1].quantity;
                                              state.project_event[index][project_event.masterEventByEventId.eventName][index1].quantity = assignValue + 1;
    if(this.state.unmounted) return;
                                              
                                              this.setState({
                                                ...state
                                              })
                                              this.netAmountCalc()
                                            }} />
                                              </div>
                                            </div>
                                          }

                                        </TableCell>
                                        
                                        <TableCell width="200px" align="center" className="padspace">
                                          <label>{
                                            numberFormat(row?.quantity * row?.modifyprice)
                                          }</label>

                                        </TableCell>
                                        <TableCell width="250px"  className="padspace">
                                          <p>
                                            {row?.description}
                                          </p>
                                        </TableCell>
                                        <TableCell width="250px"  className="padspace">
                                          <p>
                                            {row?.duration}
                                          </p>
                                        </TableCell>
                                      </TableRow>
                                    ))}

                                </TableBody>
                              </Table>
                            </div> : ''

                          }
                        </>
                      ))
                  }
                </> :
                <>
                  {

                    data.project_event && data.project_event?.map((project_event, index) => (


                      <>
                        <div style={{ margin: "5px 0px", fontWeight: "bold" }}>
                          <label>{project_event?.masterEventByEventId.eventName}</label>&nbsp;&nbsp;
                      <label>{numberFormat(this.subTotalAmount(project_event?.event_services))}</label>
                        </div>
                        <Table style={{ filter: "opacity(0.5)" }}>
                          <TableBody className="padspace" >
                            {
                              project_event?.event_services?.map((row, index1) => (
                                <TableRow key={row.id} className="padspace" >
                                    <TableCell align="center" width="50px" className="padspace">
                                    <Checkbox
                                      disabled
                                      checked={row?.isDeliverable}
                                      // onChange={(e)=>{
                                      //   let state = this.state;
                                      //     state.project_event[index][project_event.masterEventByEventId.eventName][index1].is_deliverable = e.target.checked;
                                      //   this.setState({
                                      //     ...state
                                      //   })
                                      // }}
                                      color="primary"
                                    />
                                  </TableCell >
                                  <TableCell width="250px" className='padspace ' style={{ height: "40px",color:"black", textAlign: "left" }}>{`${row?.masterServiceByServiceId?.serviceName} (`}<label>{`${numberFormat(row?.servicePrice)})`}</label></TableCell>
                                  <TableCell align="center" width="50px" className="padspace" style={{color:"black"}}>
                                    {
                                      row?.quantity
                                    }
                                  </TableCell>
                                
                                  <TableCell align="center" width="200px" className="padspace">
                                    <label>{numberFormat(row?.quantity * Number(row?.servicePrice))}</label>

                                  </TableCell>
                                  <TableCell  width="300px" className="padspace">
                                    <label>{row?.masterServiceByServiceId?.description}</label>

                                  </TableCell>
                                  <TableCell  width="300px" className="padspace">
                                    <label>{row?.masterServiceByServiceId?.duration}</label>

                                  </TableCell>
                                </TableRow>
                              ))}

                          </TableBody>
                        </Table>
                      </>

                    ))
                  }
                </>
            }

          </FormGroup>


          <List disablePadding={true} dense={dense} style={{ padding: '2px' }}>
            {generate(

              <ListItem dense={dense} style={{ padding: '2px' }}>

                <Grid container
                  direction="column"
                  alignItems="stretch"

                >

                  <Grid container
                    direction="column"
                    justify="center"
                    alignItems="stretch"

                  >


                    <Grid item container justify="space-around"
                      alignItems="center" spacing={2} >
                      <Grid item xs={12} lg={3} md={3}>

                        <TextField
                          id="outlined-password-input"
                          label="&#8377; &nbsp;Base Amount"
                          disabled={this.props.see}
                          type="text"
                          // className="black"
                          autoComplete="current-password"
                          margin="normal"
                          variant="outlined"
                          inputProps={{
                            style:{color:"rgba(0, 0, 0, 0.7)",fontSize:"14px"}
                          }}
                          value={numberFormat(data.baseAmt)}
                          style={{ width: '100%' }}
                        // disabled={{ see }}

                        />

                      </Grid>
                      <Grid item xs={12} lg={3} md={3}>

                        <TextField
                          id="discount"
                          label="&#8377; &nbsp;Discount"
                          type="number"
                          // title="Enter in rupees"
                          autoComplete="current-password"
                          margin="normal"
                          onKeyDown={ (evt) => (evt.which === 40 || evt.which === 38) && evt.preventDefault() }

                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                          }}
                          inputProps={{
                            style:{color:"rgba(0, 0, 0, 0.7)",fontSize:"14px"}
                          }}
                          variant="outlined"
                          value={data.discount}
                          // onChange={(e) => this.setState({ discount: e.target.value })}
                          onChange={(e) => this.discountChange(e.target.value)}
                          disabled={data.type === "current" ? see1 : see}
                          style={{ width: '100%' }}
                        />

                      </Grid>
                      <Grid item xs={12} lg={3} md={3}>
                        <TextField
                          id="adjustmentAmt"
                          label="&#8377; &nbsp;Adjustment"
                          type="number"
                          // title="Enter in rupees"
                          autoComplete="current-password"
                          margin="normal"
                          onKeyDown={ (evt) => (evt.which === 40 || evt.which === 38) && evt.preventDefault() }

                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                          }}
                          inputProps={{
                            style:{color:"rgba(0, 0, 0, 0.7)",fontSize:"14px"}
                          }}
                          variant="outlined"
                          value={data.adjustmentAmt}
                          onChange={(e) => this.AdjustmentAmtChanges(e.target.value)}
                          disabled={data.type === "current" ? see1 : see}
                          style={{ width: '100%' }}


                        />

                      </Grid>
                      <Grid item xs={12} lg={3} md={3}>
                        <TextField
                          id="TotalAmount"
                          label="&#8377; &nbsp;Total Amount"
                          disabled
                          // className="black"
                          type="text"
                          autoComplete="current-password"
                          margin="normal"
                          variant="outlined"
                          inputProps={{
                            style:{color:"rgba(0, 0, 0, 0.7)",fontSize:"14px"}
                          }}
                          value={numberFormat(data.totalAmt)}
                          // disabled={see}
                          style={{ width: '100%' }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container alignItems="center">
                      <Grid xs={12} sm={12} md={12} lg={12} style={{ marginTop: "10px" }}>
                        <label style={{ color: "rgb(152, 148, 148)" }}>18% GST will be applied</label>
                      </Grid>
                    </Grid>
                    {/* <Grid item container 
                      alignItems="center" spacing={2} >
                      <Grid item xs={12} lg={4} md={4}>
                        <TextField
                          id="TotalAmount"
                          label="&#8377; &nbsp;Total Amount"
                          disabled
                          // className="black"
                          type="email"
                          autoComplete="current-password"
                          margin="normal"
                          variant="outlined"
                          value={data.totalAmt}
                          // disabled={see}
                          style={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4} md={4}>
                        <TextField
                          id="tax"
                          label="&#8377; &nbsp;Tax on Total (18%)"
                          disabled
                          // className="black"
                          type="email"
                          autoComplete="current-password"
                          margin="normal"
                          variant="outlined"
                          value={data.tax}
                          // disabled={see}
                          style={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4} md={4}>
                        <TextField
                          id="netAmt"
                          label="&#8377; &nbsp;Net Amount"
                          disabled
                          // className="black"
                          type="email"
                          autoComplete="current-password"
                          margin="normal"
                          variant="outlined"
                          value={data.netAmt}
                          onChange={(e) => this.setState({ netAmt: e.target.value })}
                          // disabled={see}
                          style={{ width: '100%' }}
                        />
                      </Grid>
                    </Grid> */}
                    {/* <Grid item container
                      alignItems="center" spacing={2} >
                  
                      
                    </Grid> */}


                    <Grid container item xs={12} lg={12} md={12} justify='flex-end' >

                      {/* <div style={{ padding: '15px' }} > */}
                      {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
                      {(data.type === 'current') ?
                        null
                        :
                        <div style={{ marginTop: '8px', marginLeft: '8px' }}>{this.renderButton(data.type)}</div>}



                      {
                        data.type !== 'current' ?
                          <div style={{ marginTop: '8px', marginLeft: '8px' }}>

                            <Button type="submit" variant="outlined" className="jr-btn bg-success text-white btn-format"  onClick={() => this.generate_pdf(this.props.quoteId,this.props.headings)} style={{ marginRight: '0' }}>{ typeof this.props.finace === "undefined" ? 'Generate Quote': 'View Quote'}</Button>
                            <div style={{ textAlign: 'center' }}>
                            </div>
                          </div> : ''
                      }

                      {/* </div> */}

                      {/* </div> */}

                    </Grid>
                  </Grid>




                </Grid>


              </ListItem>,
            )}
          </List>


        </div>
      </CardBox>
    );
  }
}

export default InteractiveList;