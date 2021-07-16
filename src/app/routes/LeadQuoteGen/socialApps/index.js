import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from 'util/asyncComponent';

const SocialApps = ({match}) => (
  <div className="app-wrapper">
    <Switch>
     
     
      <Route path={`${match.url}/wall`} component={asyncComponent(() => import('./routes/Wall'))}/>
   
    </Switch>
  </div>
);

export default SocialApps;
