import React from 'react';
import moment from 'moment';

const DefaultTimeLineItem = ({ styleName, timeLine }) => {
  // console.log(timeLine, 'timeline msges')
  const { createdAt, to, message } = timeLine;
  return (
    <div className={`timeline-item ${styleName}`}>
      <div className="timeline-badge timeline-img">
        <img src={require("assets/images/pentagon.png")} alt="Pentagon" title="Pentagon" />
      </div>

      <div className="timeline-panel ">
        <div className="timeline-panel-header">
          {/* {(to!=null)?
            <h3 className="timeline-title"><span style={{fontSize:'12px'}}>To:</span>&nbsp;{to}</h3>: */}
         {
           timeLine.isInternal ? 
           <>
           <div className="timeline-left">
              <h5>From</h5>
            </div> 
            <div className="timeline-heading">
              <h5>{timeLine.userProfileByCreatedBy?.name}</h5>
            </div>
          <div className="timeline-header-img timeline-left">
            {/* <img className="size-60 rounded-circle" src={image} alt="Pentagon" title="Pentagon"/> */}
            <h5>Date</h5>
          </div>
          <div className="timeline-heading">
            <h5>{moment(createdAt).format('Do MMMM YYYY, h:mm a')}</h5>
          </div>
           </> : ""
         }
        </div>
        <div className="timeline-body">
          <p>{message} </p>
        </div>
      </div>
    </div>
  )
};
export default DefaultTimeLineItem;