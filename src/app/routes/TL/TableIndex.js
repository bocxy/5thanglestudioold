import React from 'react';

import TableTL from './TableTL';
// import ContainerHeader from 'components/ContainerHeader';
import CardBox from 'components/CardBox';
import IntlMessages from 'util/IntlMessages';
import "index.css";
const Tables = ({match}) => {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      

      {/* <div className="row mb-md-3">
        <CardBox styleName="col-12" cardStyle="p-0" heading={<IntlMessages id="Leads"/>}
                 headerOutside>
          <BasicTable/>
        </CardBox>
      </div> */}

      <div className="row " >
        <CardBox styleName="col-12"   cardStyle="p-0" heading={<div className="trest"><IntlMessages id="Projects"/></div>}
                 headerOutside>
          <TableTL/>
        </CardBox>
      </div>
    </div>
  );
};

export default Tables;