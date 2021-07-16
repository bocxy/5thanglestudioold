import React, { cloneElement, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardBox from 'components/CardBox/index';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'index.css'

function generate(element) {
  return [0].map(value =>
    cloneElement(element, {
      key: value,
    }),
  );
}

class InteractiveList extends Component {

  initialState = {

    service1: false,
    service2: false,
    service3: false,
    service4: false,
    discountGiven: 0,
    presentValue: 0,
    totalAmount: 0,
    TaxOnTotal: 0,
    netAmount: 0,
    type: 'current',
    finalcheck : "unfinalized",
    quoteNo:3
    // currentValue:this.state.previousValue + this.state.presentValue,

  }

  state = this.initialState;

  handleCheked = (trueOrfalse, string, value) => {

    let { presentValue } = this.state;
    let { totalAmount } = this.state;
    let { TaxOnTotal } = this.state;
    let { netAmount } = this.state;
    let { discountGiven } = this.state;

    if (trueOrfalse === true) {
      presentValue = presentValue + value;
      this.setState({ [string]: trueOrfalse, presentValue });
      totalAmount = presentValue - discountGiven;
      this.setState({ totalAmount });
      TaxOnTotal = (totalAmount) * 18 / 100
      this.setState({ TaxOnTotal });
      netAmount = totalAmount + TaxOnTotal;
      this.setState({ netAmount });

      document.getElementById('TotalAmount').value = totalAmount;
      document.getElementById('TaxOnTotal').value = TaxOnTotal;
      document.getElementById('netAmount').value = netAmount;

    } else {
      presentValue = presentValue - value
      this.setState({ [string]: trueOrfalse, presentValue })
      totalAmount = presentValue - discountGiven;
      this.setState({ totalAmount });
      TaxOnTotal = (totalAmount) * 18 / 100
      this.setState({ TaxOnTotal });
      netAmount = totalAmount + TaxOnTotal;
      this.setState({ netAmount });

      document.getElementById('TotalAmount').value = totalAmount;
      document.getElementById('TaxOnTotal').value = TaxOnTotal;
      document.getElementById('netAmount').value = netAmount;
    }
    // presentValue = b === true ? presentValue+d : presentValue-d;

  }
  componentDidMount(){
    let name  = this.props.data !== undefined ? this.props.data.type : "unfinalized"
    this.setState({finalcheck : name })
  }
  componentWillReceiveProps(props){
    let name  = props.data !== undefined ? props.data.type : "unfinalized";
    this.setState({finalcheck : name });
  }
  discountChange = (e) => {

    let { presentValue } = this.state;
    let { totalAmount } = this.state;
    let { TaxOnTotal } = this.state;
    let { netAmount } = this.state;
    let discountGiven = e;
    this.setState({ discountGiven: e });
    document.getElementById('discount').value = discountGiven;
    totalAmount = presentValue - discountGiven;
    if (totalAmount < 0) {

      alert("Oops your discount amount is greater than the Base amount");
      return false;
    }
    else {
      this.setState({ totalAmount });

    }

    TaxOnTotal = (totalAmount) * 18 / 100
    this.setState({ TaxOnTotal });
    netAmount = totalAmount + TaxOnTotal;
    this.setState({ netAmount });

    document.getElementById('TotalAmount').value = totalAmount;
    document.getElementById('TaxOnTotal').value = TaxOnTotal;
    document.getElementById('netAmount').value = netAmount;
  }

  renderButton = (data) => {
    
  }
  checkFunction =(checkData) =>{
    const name = this.state.finalcheck === "unfinalized" ? 'finalized' : "unfinalized";
    this.setState({
      finalcheck : name
    })
  }

  render() {
    const see = this.props.see;
    const see1 = this.props.see1;
    const headings=this.props.headings;
    // console.log(headings);
    const { dense, secondary, finalcheck } = this.state;
    let data = this.props.type !== "current" ? this.props.data : this.state;
    return (
      <CardBox
        styleName="col-lg-12 col-md-12 col-sm-12" className="cardsInteractiveList"

      >
        
        <div >
        <div style={{display:'flex',justifyContent:'center'}}>{headings}</div>
          <label>Pricing</label>
          <FormGroup row >
            <FormControlLabel
              control={
                <Checkbox color="primary"
                  checked={data.service1}
                  onChange={(event, checked) => this.handleCheked(checked, 'service1', 1000)}
                  disabled={data.type == "current" ? see1 : see}
                // onChange={(event, checked) => this.setState({service1: checked,presentValue:'1000'})}
                />

              }

              label="Service 1"
            />

            <FormControlLabel
              control={
                <Checkbox color="primary"
                  checked={data.service2}
                  onChange={(event, checked) => this.handleCheked(checked, 'service2', 1500)}
                  // onChange={(event, checked) => this.setState({service2: checked})}
                  value="1500"
                  disabled={data.type == "current" ? see1 : see}
                />
              }
              label="Service 2"
            />
            <FormControlLabel
              control={
                <Checkbox color="primary"
                  checked={data.service3}
                  onChange={(event, checked) => this.handleCheked(checked, 'service3', 2000)}
                  value="2000"
                  disabled={data.type == "current" ? see1 : see}
                />
              }
              label="Service 3"
            />
            <FormControlLabel
              control={
                <Checkbox color="primary"
                  checked={data.service4}
                  onChange={(event, checked) => this.handleCheked(checked, 'service4', 2500)}
                  value="2500"
                  disabled={data.type == "current" ? see1 : see}
                />
              }
              label="Service 4"
            />
          </FormGroup>
          <Grid className="row">
            <Grid item className="col-xs-12 ">

              <div className=" p-0">
                <List dense={dense}>
                  {generate(

                    <ListItem textfield>
                      <Grid item container justify="space-around"
                        alignItems="center" spacing={8} >
                        <Grid item xs={12} lg={2}>
                          <TextField
                            id="outlined-password-input"
                            label="&#8377; &nbsp;Base Amount"
                            disabled={this.props.see}
                            type="text"
                            className="black"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={data.presentValue}

                            disabled={{ see }}




                          />
                        </Grid>
                        <Grid item xs={12} lg={2} >

                          <TextField
                            id="discount"
                            label="&#8377; &nbsp;Discount"
                            type="text"
                            title="Enter in rupees"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={data.discountGiven}
                            // onChange={(e) => this.setState({ discountGiven: e.target.value })}
                            onChange={(e) => this.discountChange(e.target.value)}
                            disabled={data.type == "current" ? see1 : see}


                          />
                        </Grid>
                        <Grid item xs={12} lg={2}>

                          <TextField
                            id="TotalAmount"
                            label="&#8377; &nbsp;Total Amount"
                            disabled
                            className="black"
                            type="email"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={data.totalAmount}
                            disabled={see}
                          />
                        </Grid>
                        <Grid item xs={12} lg={2}>

                          <TextField
                            id="TaxOnTotal"
                            label="&#8377; &nbsp;Tax on Total"
                            disabled
                            className="black"
                            type="email"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={data.TaxOnTotal}
                            disabled={see}
                          />
                        </Grid>

                        {/*  */}
                        <Grid item xs={12} lg={2}>

                          <TextField
                            id="netAmount"
                            label="&#8377; &nbsp;Net Amount"
                            disabled
                            className="black"
                            type="email"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={data.netAmount}
                            onChange={(e) => this.setState({ netAmount: e.target.value })}
                            disabled={see}

                          />
                        </Grid>
                        {/*  */}
                        <Grid item xs={12} lg={2}>

                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {this.props.type === "current" ?
                              <Button type="submit" variant="contained" style={{ backgroundColor: '#3f51b5' }} className="jr-btn bg- text-white" onClick={() => {
                                this.props.handleAddQuote({ ...this.state, type: 'unfinalized' }, Math.round(Math.random() * (+999 - +100) + +100));
                                this.setState(this.initialState);
                              }}>Add Quote</Button>
                            :
                              <div >
                              <Button type="submit" variant="contained"  style={{ backgroundColor: '#3f51b5', }} className="jr-btn bg- text-white"
                              onClick ={() => this.checkFunction(data)}>
                              {finalcheck}
                              </Button>
                              <br/><br/><br/>
                              <Button type="submit" variant="contained"  className="jr-btn bg-success text-white" onClick={this.props.data}>Send Quote</Button>
                              </div>
                            }
                          </div>
                        </Grid>
                      </Grid>
                    </ListItem>
                  )}
                </List>
              </div>
            </Grid>

          </Grid>

        </div>
      </CardBox>
    );
  }
}

export default InteractiveList;