import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import "index.css";



const UserCell = ({user}) => {
  const {LeadId, CustomerName, image, PhoneNumber,Status} = user;
  return (

<div >
 <div className={"row"} style={{margin: '0', height: '100%', overflowX: 'hidden', }} >
 <div className={"col-12 col-md-6  col-lg-6"} >
 <div key={LeadId} className="user-profile d-flex flex-row align-items-center col-sm-6 " >
      <Avatar
        alt={CustomerName}
        src={'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-512.png'}
        className="user-avatar-lg"
      />
      
      <div className="user-detail col-6" style={{textAlign:'left'}}>
        <span className="jr-fs-11 text-light text-uppercase">{LeadId}</span>
        <p className="mb-0 ">{CustomerName}</p>
        <p className="mb-0">{PhoneNumber}</p>
      </div>
      
    
    </div>
  </div>
  <div className={"col-12 col-sm-6 col-md-6 col-lg-6 user-profile mt-md-3 mt-lg-3 " } style={{textAlign:'center'}} >
  <Button variant="contained" className="jr-btn bg-primary text-white btnSmall" >{Status}</Button>
  </div>
 </div>
  
    

</div>
 
  );
};

export default UserCell;
