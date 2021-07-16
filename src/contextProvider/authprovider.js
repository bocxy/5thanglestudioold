import React from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import { API_URL } from '../config/index';
import { LinearProgress } from '@material-ui/core';
// import { PrivateRoute } from '../../src/app/routes/PrivateRoute';
// import {  Redirect } from "react-router-dom";

const AppAuth = (props) => {

    // const [user, setAuth] = React.useState({});
    const [
        state,
        setState
    ] = React.useState({ isRefreshed: true });
    const { user, setAuth } = React.useContext(AuthContext);
    React.useEffect(() => {
        const fetchData = async () => {
            await axios.post(`${API_URL}/api/v1/user/refresh`, {
                    'token': localStorage.getItem("accessToken")
            }).then(async (response) => {
                if (response.data.success) {
                    localStorage.setItem('accessToken',  response.data.token);
                    user.user_role = response.data.result.role_id ;
                    user.user_id = response.data.result.user_id ;
                    user.profile_id = response.data.result.id ;
                    user.name = response.data.result.name ;
                    if(typeof response.data.result.role_id==="undefined"){
                        localStorage.clear();
                        window.location.reload();
                    }
                    setAuth({
                        user
                    })
                    // setAuth({ user: response.data.data });
                    setState({ isRefreshed: true });
                } else {
                    localStorage.clear();
                    window.location.reload();
                }
            }).catch((err) => {
                localStorage.clear();
                window.location.reload();
            })
        }
        if(localStorage.getItem("accessToken")){
           fetchData();
        }
    },[])

    return (
        <>
            {
                state.isRefreshed ?
                    <AuthContext.Provider value={{ user, setAuth }}>
                        {props.children}
                     </AuthContext.Provider>
                    : <LinearProgress />
            }
        </>

    )
}

export default AppAuth;
