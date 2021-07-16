import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import IntlMessages from '../../util/IntlMessages';
import CustomScrollbars from '../../util/CustomScrollbars';
import { AuthContext } from '../../context/auth';
import DashboardIcon from '@material-ui/icons/Dashboard';
class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, 'li');
          if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
            menuLi[j].classList.remove('open')
          } 
        }
        this.classList.toggle('open');
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {

    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {

    }

    return null;
  }
  // const SideNavBDE =[{url:'/app/new-lead',urlText:'New Lead'},{url:'/app/all-leads',urlText:'Leads'}]
  // const SideNavTL =[{url:'/app/dash-board-TL',urlText:'Projects '},{url:'#',urlText:'Agenda'},{url:'#',urlText:'Photoshop'}]
  render() {
    const authContext = this.context;
    let role=authContext.user.user_role; 
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu ">

           {/* <li className="nav-header">
             <IntlMessages id="sidebar.tabs"/>
            </li> */}
         {/* {this.props.SideNavBDE.map(SideNavBDE =>  */}
          { (role===1)&& 
          <>
          {/* className="menu no-arrow" is remove here the all list*/}
            <li >
              <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/dash-board'}  > 
                <DashboardIcon/>&nbsp;&nbsp;
                <span className="nav-text"><IntlMessages id={'Dashboard'}/> </span>
              </NavLink>
            </li>
            <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/new-lead'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'New Lead'}/> </span>
            </NavLink>
          </li>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/all-leads'} > 
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Leads'}  /> </span>
            </NavLink>
          </li>
          </>
          }
          { (role===2)&&
          <>
            <li >
              <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/dash-board'}  > 
                <DashboardIcon/>&nbsp;&nbsp;
                <span className="nav-text"><IntlMessages id={'Dashboard'}/> </span>
              </NavLink>
            </li>
            <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/new-lead'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'New Lead'}/> </span>
            </NavLink>
          </li>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/all-leads'} > 
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Leads'}  /> </span>
            </NavLink>
          </li>
          </>
          }
          {
            (role===3)&&
            <>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/dash-board-TL'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Projects'}/> </span>
            </NavLink>
          </li>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'#'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Agenda'}/> </span>
            </NavLink>
          </li>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'#'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Photoshop'}/> </span>
            </NavLink>
          </li>
          </>
          }
                    {
            (role===4)&&
            <>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/dash-board-photographer'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Projects'}/> </span>
            </NavLink>
          </li>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'#'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Agenda'}/> </span>
            </NavLink>
          </li>
          <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'#'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Availability'}/> </span>
            </NavLink>
          </li>
          </>
          }
           { (role===5)&&
          <> 
            <li >
            <NavLink style={{display:"flex",alignItems:"center"}} to={'/app/quote_confirm_lead'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Quote Confirmed Lead'}/> </span>
            </NavLink>
          </li>
          {/* <li > 
            <NavLink to={'/app/all-leads'} >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id={'Leads'}/> </span>
            </NavLink>
          </li> */}
          </>
          }
          {/* )
         } */}
          {/* <li  > 
            <NavLink to="/app/all-leads" >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages i
              d="Leads"/> </span>
            </NavLink>
            </li> */}
            {/* <li  > 
            <NavLink to="/app/lead-quote-gen" >
              <DashboardIcon/>&nbsp;&nbsp;
              <span className="nav-text"><IntlMessages id="Quote Gen"/> </span> 
            </NavLink>
            </li> */}
        </ul>
      </CustomScrollbars>
    );
  }
}
SidenavContent.contextType =AuthContext;
export default withRouter(SidenavContent);
