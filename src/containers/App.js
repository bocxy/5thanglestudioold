import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl'
import "../assets/vendors/style"
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import ChangePassword from './ChangePassword';
import MainApp from '../app/index';
import RTL from '../util/RTL';
import asyncComponent from 'util/asyncComponent';
import { AuthContext } from '../context/auth';

class App extends Component {

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

  render() {
    const authContext = this.context;
    const {match, location, locale, isDirectionRTL} = this.props;
    if (location.pathname === '/') { // location.pathname === '/'
      if (authContext.user.user_role!==2)
      return ( <Redirect to={'/app/all-leads'}/> ) 
       
      else
      return ( <Redirect to={'/app/dash-board-TL'}/> )
    }
    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <RTL >
              <div className="app-main" > 
                <Switch>
                  <Route path={`${match.url}app`} component={MainApp}/>
                  <Route path='/login' component={Login}/>
                  <Route path='/forget_password' component={ForgetPassword} />
                  <Route path='/change_password' component={ChangePassword} />
                  <Route
                    component={asyncComponent(() => import('../components/Error404'))}/>
                    {/* <Route path={`/:id`} component={MainApp}/> */}
                </Switch>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}
App.contextType = AuthContext;
const mapStateToProps = ({settings}) => {
  const {sideNavColor, locale, isDirectionRTL} = settings;
  return {sideNavColor, locale, isDirectionRTL}
};

export default connect(mapStateToProps)(App); 

