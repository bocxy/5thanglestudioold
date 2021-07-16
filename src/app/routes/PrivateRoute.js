import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from '../../context/auth';

 const PrivateRoute = routeprops => {
  //  const { user } = React.useContext(AuthContext);
  let token=window.localStorage.getItem("accessToken" );
  // let role=localStorage.getItem('user_role');
  // let role=user.user_role;
//&& (Number(role) === routeprops.roles)
  let getAuthenticated = () => { 
    
    try {
      return (token ) || false;
      // console.log(window.localStorage.getItem('accessToken'));
    } catch (error) {
      return false;
    }
  };

  let { component: Component, ...rest } = routeprops;
  let [authenticated ] = React.useState(getAuthenticated()) ;  
// console.log(token && (role===this.props.roles))
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={'/Login'} />
        )
      }
    />
  );
};

export default PrivateRoute;