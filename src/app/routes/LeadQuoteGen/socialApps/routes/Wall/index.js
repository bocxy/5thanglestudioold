import React, {Component} from "react";

import PostList from "components/wall/PostList/index";

import {communitiesList, friendList, interestList, photoList, postList, recentActivity, user, userInfo} from './data'

class Wall extends Component {

  render() {
    return (
      <div className="jr-main-content">
      
   
            
              <div className="jr-wall-postlist">
                <PostList postList={postList} user={user}/>
              </div>
         
        

        </div>
     
    )
  }
}

export default Wall
