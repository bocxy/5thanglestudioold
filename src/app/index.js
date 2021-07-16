import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header/index';
import Sidebar from '../containers/SideNav/index';
// import Footer from '../components/Footer';
// import Tour from '../components/Tour/index';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from '../constants/ActionTypes';
import { isIOS, isMobile } from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';
import PrivateRoute from './routes/PrivateRoute';
// setTimeout(function(){ localStorage.getItem('user_role'); }, 100);


// const SideNavBDE =[{url:'/app/new-lead',urlText:'New Lead'},{url:'/app/all-leads',urlText:'Leads'}]
// const SideNavTL =[{url:'/app/dash-board-TL',urlText:'Projects '},{url:'#',urlText:'Agenda'},{url:'#',urlText:'Photoshop'}]
class App extends React.Component {

  render() {
    // let role=localStorage.getItem('user_role'); 
    const { match, drawerType, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    //set default height and overflow for iOS mobile Safari 10+ support.

    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        {/* <Tour /> */}
        {/* // { */}
        {/* role==2?
        <Sidebar SideNavBDE={SideNavBDE} user="BDE"/>
        :
        <Sidebar SideNavBDE={SideNavTL} user="Team Lead"/>
} */}
        <Sidebar />

        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
              <TopNav styleName="app-top-header" />}

            <Header />


            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
              <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
 
                <PrivateRoute path={`${match.url}/dash-board`} roles={2} component={asyncComponent(() => import('./routes/dashboard'))} />
                <PrivateRoute path={`${match.url}/all-leads`}
                  roles={2} component={asyncComponent(() => import('./routes/AllLeads'))} />
                {/* <PrivateRoute path={`${match.url}/dash-board`}
                  roles={2} component={asyncComponent(() => import('./routes/dash-board'))} /> */}
                <PrivateRoute path={`${match.url}/new-lead`}
                  roles={2} component={asyncComponent(() => import('./routes/NewLead'))} />
                <PrivateRoute path={`${match.url}/lead-quote-gen/:id`}
                  roles={2} component={asyncComponent(() => import('./routes/LeadQuoteGen'))} />
                <PrivateRoute path={`${match.url}/lead-quote-gen#commentBox`}
                  roles={2} component={asyncComponent(() => import('./routes/LeadQuoteGen'))} />
                <PrivateRoute path={`${match.url}/send-quote`}
                  roles={2} component={asyncComponent(() => import('./routes/SendQuote'))} />
                <PrivateRoute path={`${match.url}/dash-board-TL`}
                  roles={3} component={asyncComponent(() => import('./routes/TL/MainDashBoardTL'))} />
                <PrivateRoute path={`${match.url}/time-line-TL`}
                  roles={3} component={asyncComponent(() => import('./routes/TL/TimeLineTL'))} />

                <PrivateRoute path={`${match.url}/dash-board-photographer`}
                  roles={4} component={asyncComponent(() => import('./routes/Photographer/MainDashBoardPhotographer'))} />
                <PrivateRoute path={`${match.url}/quote_confirm_lead`}
                  roles={5} component={asyncComponent(() => import('./routes/AllLeads'))} />
                <PrivateRoute component={asyncComponent(() => import('../components/Error404'))} />
              </Switch>
            </div>
            {/* <Footer/> */}
          </main>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition }
};
export default withRouter(connect(mapStateToProps)(App));