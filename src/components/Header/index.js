import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import {
  BELOW_THE_HEADER,
  HORIZONTAL_NAVIGATION
} from '../../constants/ActionTypes';
// import SearchBox from '../../components/SearchBox';
// import MailNotification from '../MailNotification/index';
// import AppNotification from '../AppNotification/index';
// import CardHeader from '../../components/dashboard/Common/CardHeader/index';
import { switchLanguage, toggleCollapsedNav } from '../../actions/Setting';
import IntlMessages from '../../util/IntlMessages';
// import LanguageSwitcher from '../../components/LanguageSwitcher/index';
// import Menu from '../../components/TopNav/Menu';
import UserInfoPopup from '../../components/UserInfo/UserInfoPopup';

class Header extends React.Component {

  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    })
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    })
  };
  onLangSwitcherSelect = (event) => {
    this.setState({
      langSwitcher: !this.state.langSwitcher, anchorEl: event.currentTarget
    })
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    })
  };
  onAppsSelect = () => {
    this.setState({
      apps: !this.state.apps
    })
  };
  onUserInfoSelect = () => {
    this.setState({
      userInfo: !this.state.userInfo
    })
  };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      userInfo: false,
      mailNotification: false,
      appNotification: false,
      searchBox: false,
      apps: false
    });
  };
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: '',
      mailNotification: false,
      userInfo: false,
      langSwitcher: false,
      appNotification: false,
    }
  }

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value,
    });
  }
  sessionDelete = () => {

    localStorage.clear('name');
    this.props.history.push('/login')


  }
  Apps = () => {
    return (
      <ul className="jr-list jr-list-half">
        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/calendar/basic">
            <i className="zmdi zmdi-calendar zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.calendar.basic" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/to-do">
            <i className="zmdi zmdi-check-square zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.toDo" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/mail">
            <i className="zmdi zmdi-email zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.mail" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/chat">
            <i className="zmdi zmdi-comment zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.chat" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/contact">
            <i className="zmdi zmdi-account-box zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.contact" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/">
            <i className="zmdi zmdi-plus-circle-o zmdi-hc-fw" />
            <span className="jr-list-text">Add New</span>
          </Link>
        </li>
      </ul>)
  };

  render() {
    const { navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle ='d-none';

    return (
      <AppBar
        className={`app-main-header ${(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) ? 'app-main-header-top' : ''}`}>
        <Toolbar className="app-toolbar" disableGutters={false}>
          {'' === HORIZONTAL_NAVIGATION ?
            <div className="d-block d-md-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
              <span className="jr-menu-icon">
                <span className="menu-icon" />
              </span>
            </div>
            :
            <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
              onClick={this.onToggleCollapsedNav}>
              <span className="menu-icon" />
            </IconButton>
          }

          {/* this is junbo react logo */}
          <div>
            <div className="col-lg-4  col-xl-6">
              <div className="app-logo mr-2 d-none d-sm-block" >
                <img src={require("../../assets/images/5thanglestudios.png")} alt="fifthangleStudios" title="Fifth Angle Studios" />
              </div>

            </div>
          </div>
          {/* fifth angel studio */}
          <div className="col-lg-4  col-xl-4 d-none d-sm-block">
            <span style={{
              fontWeight: 'bold',
              fontSize: '20px',
              fontStyle: 'normal',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              Fifth Angle Studio
          </span>

          </div>
          {/* <div>
            Business Development Executive
            </div>
{/*  */}

          {/* SEARCH BAR */}
          {/* <SearchBox styleName="d-none d-lg-block" placeholder=""
                     onChange={this.updateSearchText.bind(this)}
                     value={this.state.searchText}/>
          {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER) &&
          <Menu/>} */}
          {/*  */} <div className=" col-lg-2  col-md-3   offset-6 col-4 " style={{ cursor: 'pointer' }} onClick={this.sessionDelete}>

            Log Out&nbsp;<i style={{ fontSize: '12px', color: 'white' }} className="fa">&#xf08b;</i>

          </div>
          <ul className="header-notifications list-inline ml-auto">
            {/* Apps */}
            {/* <li className="list-inline-item">
              <Dropdown
                className="quick-menu app-notification"
                isOpen={this.state.apps}
                toggle={this.onAppsSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <span className="app-notification-menu">
                    <i className="zmdi zmdi-apps zmdi-hc-fw zmdi-hc-lg"/>
                    <span>Apps</span>
                  </span>
                </DropdownToggle>

                <DropdownMenu>
                  {this.Apps()}
                </DropdownMenu>
              </Dropdown>
            </li> */}
            {/*  */}
            {/* <li className="d-inline-block d-lg-none list-inline-item">
              <Dropdown
                className="quick-menu nav-searchbox"
                isOpen={this.state.searchBox}
                toggle={this.onSearchBoxSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton className="icon-btn">
                    <i className="zmdi zmdi-search zmdi-hc-fw"/>
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="p-0">
                  <SearchBox styleName="search-dropdown" placeholder=""
                             onChange={this.updateSearchText.bind(this)}
                             value={this.state.searchText}/>
                </DropdownMenu>
              </Dropdown>
            </li> */}
            {/* Flag */}
            {/* <li className="list-inline-item">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.langSwitcher}
                toggle={this.onLangSwitcherSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton className="icon-btn">
                    <i className={`flag flag-24 flag-.icon}`}/>
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="w-50">
                  <LanguageSwitcher switchLanguage={this.props.switchLanguage}
                                    handleRequestClose={this.handleRequestClose}/>
                </DropdownMenu>
              </Dropdown>


            </li> */}
            {/*  */}

            {/* Notification */}
            {/* <li className="list-inline-item app-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.appNotification}
                toggle={this.onAppNotificationSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton className="icon-btn">
                    <i className="zmdi zmdi-notifications-none icon-alert animated infinite wobble"/>
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right>
                  <CardHeader styleName="align-items-center"
                              heading={<IntlMessages id="appNotification.title"/>}/>
                  <AppNotification/>
                </DropdownMenu>
              </Dropdown>
            </li> */}
            {/*  */}

            {/* Chat icon */}
            {/* <li className="list-inline-item mail-tour">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.mailNotification}
                toggle={this.onMailNotificationSelect.bind(this)}
              >
                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">

                  <IconButton className="icon-btn">
                    <i className="zmdi zmdi-comment-alt-text zmdi-hc-fw"/>
                  </IconButton>
                </DropdownToggle>


                <DropdownMenu right>
                  <CardHeader styleName="align-items-center"
                              heading={<IntlMessages id="mailNotification.title"/>}/>
                  <MailNotification/>
                </DropdownMenu>
              </Dropdown>
            </li> */}
            {/*  */}
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              <li className="list-inline-item user-nav">
                <Dropdown
                  className="quick-menu"
                  isOpen={this.state.userInfo}
                  toggle={this.onUserInfoSelect.bind(this)}>

                  <DropdownToggle
                    className="d-inline-block"
                    tag="span"
                    data-toggle="dropdown">
                    <IconButton className="icon-btn size-30">
                      <Avatar
                        alt='...'
                        src={'https://via.placeholder.com/150x150'}
                        className="size-30"
                      />
                    </IconButton>
                  </DropdownToggle>

                  <DropdownMenu right>
                    <UserInfoPopup />
                  </DropdownMenu>
                </Dropdown>
              </li>}
          </ul>

          <div className="ellipse-shape"></div>
        </Toolbar>
      </AppBar>
    );
  }

}


const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition }
};

export default withRouter(connect(mapStateToProps, { toggleCollapsedNav, switchLanguage })(Header));