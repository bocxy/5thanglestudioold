import React from 'react';
import { Link } from 'react-router-dom'
// import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import IntlMessages from 'util/IntlMessages';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { API_URL} from '../../config/index';
import { AuthContext }  from '../../context/auth';

const axios = require('axios');

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword:'',
            tokenValidation:true,
            passwordErrorMsg: 'atlest one [A-Z] && [a-z] && [0-9] && one special char and minimum 8 character',
            confirmPasswordErrorMsg:"password mismatch",
            regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/gm,
            regexerror:false,
            passwordChange:false
        }
    }
    componentDidMount() {
        axios.post(`${API_URL}/api/v1/password/token_varification`,{token:this.props.location.search.slice(1,)})
        .then(tokenValid=>{
            if(tokenValid.data.success){
                this.setState({
                    tokenValidation:true
                })
            }
            else{
                this.setState({
                    tokenValidation:false
                })
            }
        })
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }
    changePassword = async(userContext) => {
       if(!this.state.password.match(this.state.regex)){
        
        return;
       }
       if(this.state.password!==this.state.confirmPassword){
        return;
       }
        await axios.post(`${API_URL}/api/v1/password/change_password`,{password:this.state.password,token:this.props.location.search.slice(1,)})
        .then(res=>{
            if(res.data.success) {
                this.setState({
                    passwordChange:true,
                    password:'',
                    confirmPassword:''
                })  
            }else{
                this.setState({
                    passwordChange:false
                })
            }
      
        })
        .catch((error)=>{
            alert(error)
            console.log(error)
        })
    }

    render() {
        const {
            password,confirmPassword
        } = this.state;
        const userContext = this.context;
        return (
            // <AuthContext.Consumer>
            //     {({user,setAuth})=>(
                    <div className="app-main-container" >
                        {
                            this.state.tokenValidation ?
                            <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            {
                                this.state.passwordChange ? <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3" style={{marginTop:"20px"}}><div style={{    
                                    background: "#c9ea86",
                                    width: "400px",
                                    margin: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "50px",
                                    color: "#7f745d"
                                }}>your password is changed</div></div>:""
                            }
                            <div
                                className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                                <div className="login-content">
                                    <div className="login-header mb-4">
                                        <Link className="app-logo" to="/" title="Jambo">
                                            <img src={require("assets/images/5thanglestudios.png")} alt="Fifth Angle Studios" title="Capturing your life remembering" />
                                        </Link>
                                    </div>
    
                                    <div className="login-form">
                                        <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>{this.state.message}</div>
                                        {/* <form> */}
                                        <fieldset>
                                            <ValidatorForm
                                                ref="form"
                                                onSubmit={()=>this.changePassword(userContext)}
                                                onError={errors => console.log(errors)}
                                            >
                                            <TextValidator
                                                    type="password"
                                                    id="password1"
                                                    label={<IntlMessages id="newPassword" />}
                                                    fullWidth
                                                    onChange={(event) => {
                                                        let validation = true;
                                                        if(event.target.value.match(this.state.regex)){
                                                            validation =false
                                                        }
                                                        this.setState({ password: event.target.value,regexerror:validation })
                                                    }}
                                                    // defaultValue={password}
                                                    value={password}
                                                    margin="normal"
                                                    className="mt-1"
                                                    error={this.state.regexerror?true:false}
                                                    helperText={this.state.regexerror?this.state.passwordErrorMsg:''}
                                                    validators={['required']}
                                                    errorMessages={['this field is required,']}
                                                />
                                                <TextValidator
                                                    type="password"
                                                    id="password1"
                                                    label={<IntlMessages id="confirmPassword" />}
                                                    fullWidth
                                                    onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                                                    // defaultValue={password}
                                                    value={confirmPassword}
                                                    margin="normal"
                                                    className="mt-1"
                                                    validators={['isPasswordMatch','required']}
                                                    errorMessages={['password mismatch','this field is required']}
                                                />
                                                <div className="mt-1 mb-2" style={{display: "flex",justifyContent: "flex-end"}}>
                                                    {/* <FormControlLabel
                                                        control={
                                                            <Checkbox color="primary"
                                                                value="gilad"
                                                            />
                                                        }
                                                        label={<IntlMessages id="appModule.rememberMe" />}
                                                    /> */}
    
                                                    <div >
                                                        <Link to="/Login"
                                                            title="Reset Password"><IntlMessages
                                                                id="login" /></Link>
                                                    </div>  {/* /app/app-module/forgot-password-2 */}
    
                                                </div>
    
                                                <Button type="submit" color="primary" variant="contained" className="text-white">
                                                    <IntlMessages id="submit" />
                                                </Button>
                                            </ValidatorForm>
                                        </fieldset>
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>:<div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3" style={{marginTop:"20px"}}><div style={{    
                                    background: "#ea5a5a",
                                    width: "400px",
                                    margin: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "50px",
                                    color: "#7f745d"}}>The token expired,please reset again</div></div>
    
                        }
                    
                </div>
        //         )}
        //    </AuthContext.Consumer>
        );
    }
}
ChangePassword.contextType = AuthContext;
export default ChangePassword;


