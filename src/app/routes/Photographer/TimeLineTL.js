import React, { Component } from 'react';
import ComposedTextField from 'form/form'
import InteractiveList from 'list/interactive/InteractiveList';
import 'index.css';
import { object } from 'prop-types';
// import Wall from './socialApps/routes/Wall/index'
import LeftAligned from 'Timeline/leftAligned/index'
import PostList from "components/wall/PostList/index";
import { postList,  user} from "./../routes/LeadQuoteGen/socialApps/routes/Wall/data";
// ./socialApps/routes/Wall/data



export default class InputForm extends React.Component {



  
    render() {
        
        // var {userDetails} = this.state;
        

        return (
            <>
            <div className="app-wrapper">

        <div className="row" id="commentBox">        
              <div className="col-xl-6  col-lg-6 col-md-6 col-sm-6 col-12" >
          <LeftAligned/>
        </div>
                  <div className="col-xl-6  col-lg-6 col-md-6 col-sm-6 col-12">
                    <PostList postList={postList} user={user} addImage={false} chatHeading="Internal Communication"/>
        
                  </div>
                
             
     


    
        </div>





  {/* <Wall addImage={false} chatHeading="Internal Communication"/>
  <Wall addImage={true} chatHeading="Client Communication"/> */}
    
                
  
  
            </div>
           

           

            
            
            </>
        );
    }
}