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

class Login2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            message: '',
            signUp:false,
            signIn:false
        }
    }
    componentDidMount() {
        if(localStorage.getItem('accessToken')){
            window.location.href='/app/all-leads';
            // window.location.href='dashboard';
        }
    }
    loginValidation = async(userContext) => {
        this.setState({
            signIn:false,
            signUp:false
        })
        // var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkJERUBmYXMuY29tIiwiaWF0IjoxNTYxNzA5Mjc2LCJleHAiOjE1NjE3OTU2NzZ9.Q9AOr1jorWomWn_L33Chh8ldoceWSfRaQ87yl9F6f9Y";
        // axios({
        //     method: 'get',
        // url: 'http://www.json-generator.com/api/json/get/bTyERUqEzm?indent=2',//BDE

        // url: 'https://www.json-generator.com/api/json/get/cqzghEznUy?indent=2',//Second Team Lead
        // url:'https://www.json-generator.com/api/json/get/cfHfDXXUte?indent=2', //Third Photographer
        // url:'http://www.json-generator.com/api/json/get/bTRKtoMUQy?indent=2',

        //     responseType: 'json'
        //   })
        // var userInput=this.state.email;
        // var passwordInput=this.state.password;
        //   axios.post('http://192.168.0.103:4001/api/auth/signin', {
        //     username: userInput,
        //     password: passwordInput,
        //     responseType: 'json'
        //   })
        // .then((response)=>{
        //     const userInfo = response.data;
        //     console.log(userInfo)
        //       if(response.status==200){
        //         localStorage.setItem('accessToken', userInfo.accessToken);
        //         localStorage.setItem('user_role',userInfo.user_role);
        //       }

        //    var token =localStorage.getItem('accessToken');
        //    var role =localStorage.getItem('user_role');
        //        if(token){

        //              if(role==2){


        //                 this.props.history.push("/app/all-leads");


        //                 // window.location.href="/app/all-leads";

        //              }
        //              else if(token&&role==3){

        //                 this.props.history.push("/app/dash-board-TL");

        //              }
        //              else if(token&&role==4){
        //                 this.props.history.push("/app/dash-board-photographer");
        //              }
        //             }

        // })
        // .catch(error => {
        //     const userInfo = error.response.data;
        //     console.log(error.response)
        //     this.setState({message:userInfo.message})
        // });
        await axios.post(`${API_URL}/api/v1/user/login`,{email:this.state.email,password:this.state.password})
        .then(res=>{
            if(res.data.status===200) {
                localStorage.setItem('accessToken', res.data.token);
                // localStorage.setItem('user_role', res.data.result.role_id);
                // localStorage.setItem('user_id', res.data.result.user_id);
                // localStorage.setItem('profile_id', res.data.result.id);
                userContext.user.user_role = res.data.result.role_id ;
                userContext.user.user_id = res.data.result.user_id ;
                userContext.user.profile_id = res.data.result.id ;
                userContext.user.name = res.data.result.name ;
                userContext.setAuth({
                    ...userContext.user
                })
            }else{
                // console.log(res)
             typeof res.data.errors.signUp==="undefined" ? this.setState({signIn:true}):this.setState({signUp:true})
            }
      
        })
        .catch((error)=>{
            alert(error)
            console.log(error)
        })
        // alert(JSON.stringify(userContext.user))
        // console.log(userContext.user);
        var token = localStorage.getItem('accessToken');
        // var role = localStorage.getItem('user_role');
        let role = userContext.user.user_role;
        // alert(userContext.user.user_role)
        if (token) {

            if (role === 2 || role===1 || 1==1) {

                // this.props.history.push("/app/dashboard");
                this.props.history.push("/app/all-leads");

            }
            else if (token && role === 3) {

                this.props.history.push("/app/dash-board-TL"); 

            }
            else if (token && role === 4) {
                this.props.history.push("/app/dash-board-photographer");
            }
            else if (token && role === 5){
                this.props.history.push('/app/quote_confirm_lead')
            }
        }
    }

    render() {
        const {
            email,
            password
        } = this.state;
        const userContext = this.context;
        // console.log(userContext,'login');
        return (
            // <AuthContext.Consumer>
            //     {({user,setAuth})=>(
                    <div className="app-main-container" >
                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <div
                                className="login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                                <div className="login-content">
                                    <div className="login-header mb-4">
                                        <Link className="app-logo" to="/" title="Jambo">
                                            <img src={require("assets/images/5thanglestudios.png")} alt="Fifth Angle Studios" title="Capturing your life remembering" />
                                        </Link>
                                        {this.state.signIn ?<>&nbsp;&nbsp; <small style={{color:"red"}}>Password is invalid </small></>: ""}
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
                                                onSubmit={()=>this.loginValidation(userContext)}
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
                                                <TextValidator
                                                    type="password"
                                                    id="password1"
                                                    label={<IntlMessages id="appModule.password" />}
                                                    fullWidth
                                                    onChange={(event) => this.setState({ password: event.target.value })}
                                                    // defaultValue={password}
                                                    value={password}
                                                    margin="normal"
                                                    className="mt-1"
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
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
                                                        <Link to="/forget_password"
                                                            title="Reset Password"><IntlMessages
                                                                id="appModule.forgotPassword" /></Link>
                                                    </div>  {/* /app/app-module/forgot-password-2 */}
    
                                                </div>
    
                                                <Button type="submit" color="primary" variant="contained" className="text-white">
                                                    <IntlMessages id="appModule.signIn" />
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
Login2.contextType = AuthContext;
export default Login2;


