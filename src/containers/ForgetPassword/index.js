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

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            signUp:false,
            verifyEmail:false
        }
    }

    forgetPasswordValidation = async(userContext) => {
        this.setState({
            signUp:false,
            verifyEmail:false
        })
        await axios.post(`${API_URL}/api/v1/password/forget_password`,{email:this.state.email})
        .then(res=>{
            if(res.data.status===200) {
                this.setState({
                    signUp:false,
                    verifyEmail:true
                })
            }else{
                this.setState({
                    signUp:true
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
            email
        } = this.state;
        const userContext = this.context;
        return (
                    <div className="app-main-container" >
                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            {
                                this.state.verifyEmail ? <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3" style={{marginTop:"20px"}}><div
                                style={{  
                                background: "#c9ea86",
                                width: "400px",
                                margin: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "50px",
                                color: "#7f745d"}}
                                >verify your email address</div></div>:""
                            }
                            <div
                                className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                                <div className="login-content">
                                    <div className="login-header mb-4">
                                        <Link className="app-logo" to="/" title="Jambo">
                                            <img src={require("assets/images/5thanglestudios.png")} alt="Fifth Angle Studios" title="Capturing your life remembering" />
                                        </Link>
                                        {
                                            this.state.signUp ? <>&nbsp;&nbsp;<small style={{color:"red"}}>Invalid Email ID </small></> : ""
                                        }
                                        <div></div>
                                    </div>
    
                                    <div className="login-form">
                                        <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>{this.state.message}</div>
                                        {/* <form> */}
                                        <fieldset>
                                            <ValidatorForm
                                                ref="form"
                                                onSubmit={()=>this.forgetPasswordValidation(userContext)}
                                                onError={errors => console.log(errors)}
                                            >
                                                <TextValidator
                                                    id="email1"
                                                    label={<IntlMessages id="appModule.email" />}
                                                    fullWidth
                                                    onChange={(event) => this.setState({ email: event.target.value })}
                                                    // defaultValue={email}
                                                    value={email}
                                                    margin="normal"
                                                    className="mt-1"
                                                    validators={['required', 'isEmail']}
                                                    errorMessages={['this field is required', 'Email is not valid']}
    
                                                />
                                                <div className="mt-1 mb-2" style={{display: "flex",justifyContent: "flex-end"}}>
    
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
                    </main>
                </div>
        //         )}
        //    </AuthContext.Consumer>
        );
    }
}
ForgetPassword.contextType = AuthContext;
export default ForgetPassword;


