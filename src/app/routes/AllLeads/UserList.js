import React from 'react';
import UserCell from './UserCell';


const UserList = ({users}) => {
  return (
    <div className="pt-2">
      {users.map((user, index) => {
        return (
          <UserCell key={user.LeadId + index} user={user}/>
        );
      })}
    </div>
  );

};

export default UserList;