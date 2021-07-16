import React from 'react';
// import Avatar from '@material-ui/core/Avatar'
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import IntlMessages from '../../util/IntlMessages';
import { AuthContext } from '../../context/auth';
class UserInfo extends React.Component {

  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {
    const authContext = this.context;
    let role=authContext.user.user_role; 
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        {/* <Avatar
          alt='...'
          src={'https://via.placeholder.com/150x150'}
          className="user-avatar "
        /> */}
        {
              (role===1)&&
               <label style={{    borderRadius: "50%",fontWeight: 600,color: "black",fontSize: "1.5rem",background: "white",padding: "6px",height: "45px",width: "45px",textAlign: "center" }}>A </label>
            }
            {
              (role===2)&&
               <label style={{    borderRadius: "50%",fontWeight: 600,color: "black",fontSize: "1.5rem",background: "white",padding: "6px",height: "45px",width: "45px",textAlign: "center"}}>B</label>
            }
            {
              (role===3)&& 
              <label style={{    borderRadius: "50%",fontWeight: 600,color: "black",fontSize: "1.5rem",background: "white",padding: "6px",height: "45px",width: "45px",textAlign: "center"}}>T</label>
            }
            {
              (role===4)&&
              <label style={{    borderRadius: "50%",fontWeight: 600,color: "black",fontSize: "1.5rem",background: "white",padding: "6px",height: "45px",width: "45px",textAlign: "center"}}>P</label>
            }
            {
              (role===5)&&
              <label style={{    borderRadius: "50%",fontWeight: 600,color: "black",fontSize: "1.5rem",background: "white",padding: "6px",height: "45px",width: "45px",textAlign: "center"}}>F</label>
              
            }
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}> &nbsp;&nbsp;
          {
              (role===1)&&
              'Admin' 
            }
            {
              (role===2)&&
              'BDE' 
            }
            {
              (role===3)&& 
              'Team Lead'
            }
            {
              (role===4)&&
              'Photographer'
            }
            {
              (role===5)&&
              'Finance'
            }
          {/* <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/> */}
          </h4> 
          
        </div>
        {/* <Menu className="user-info"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0
                }
              }}>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.profile"/>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.setting"/>
          </MenuItem>
          <MenuItem onClick={() => {
            this.handleRequestClose();
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

            <IntlMessages id="popup.logout"/>
          </MenuItem>
        </Menu> */}
      </div>
    );
  }
}
UserInfo.contextType =  AuthContext;
export default UserInfo;


