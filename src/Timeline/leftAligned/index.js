import React from 'react';
// import timeLineData from '../timeLineData';
import DefaultTimeLineItem from 'components/timeline/DefaultTimeLineItem'; 
// import ContainerHeader from 'components/ContainerHeader/index';
// import IntlMessages from 'util/IntlMessages';

const LeftAligned = (props) => {  
  return (
    <div>
      {/* <ContainerHeader title={<IntlMessages id="sidebar.timeLine.leftAligned"/>} match={match}/> */}
      <div >
        {props.allMessageData?.map((timeLine, index) => <DefaultTimeLineItem key={index} timeLine={timeLine}/>)}
      </div>
    </div>
  )
};

export default LeftAligned;

