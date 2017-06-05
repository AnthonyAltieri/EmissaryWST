/**
 * @flow
 * @author Anthony Altieri on 6/4/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import * as OverlayActions from '../../actions/Overlay';
import Paper from 'material-ui/Paper';
import Buttons from './Buttons';
import Hamburger from './Hamburger';
import OverlayCard from '../Overlay/Card';
import RaisedButton from '../Buttons/RaisedButton';

const brandLogoSrc = require('../../img/logo-emissary.png');

class Header extends Component {
  render() {
    const {
      pathname,
      navigate,
      isOverlayVisible,
      overlayMode,
      hideOverlay,
      showOverlay,
    } = this.props;

    // Only show header if /visitor/ is not in the path (url)
    if (/\/visitor\//.test(pathname)) return null;


    let buttons = pathname === '/' ? null : <Buttons navigate={navigate} />

    return (
      <div>
        <Paper zDepth={2} className="header">
          <div className="container">
            <div className="r fullheight">
              <img
                src={brandLogoSrc}
                className="brandLogo"
              />
              <h1 className="brand">
                Emmisary
              </h1>
            </div>
            {buttons}
            <Hamburger
              onTouchTap={() => showOverlay('EMPLOYEE_NAV')}
            />
          </div>
        </Paper>
        <OverlayCard
          isVisible={isOverlayVisible && overlayMode === 'EMPLOYEE_NAV'}
          hideOverlay={hideOverlay}
        >
          <RaisedButton
            label="Metrics"
            className="headerOverlayButton"
            primary
          />
          <RaisedButton
            label="Visitors"
            className="headerOverlayButton"
            primary
          />
          <RaisedButton
            label="Employees"
            className="headerOverlayButton"
            primary
          />
          <RaisedButton
            label="Appointments"
            className="headerOverlayButton"
            primary
          />
          <RaisedButton
            label="Forms"
            className="headerOverlayButton"
            primary
          />
          <RaisedButton
            label="Settings"
            className="headerOverlayButton"
            primary
          />
        </OverlayCard>
      </div>
    );
  }
}

const stateToProps = (s) => ({
  pathname: s.router.location.pathname,
  overlayMode: s.overlay.mode,
  isOverlayVisible: s.overlay.isVisible,
});

const dispatchToProps = (d) => ({
  navigate: (url) => d(push(url)),
  showOverlay: (mode) => d(OverlayActions.showOverlay(mode)),
  hideOverlay: () => d(OverlayActions.hideOverlay()),
});

Header = connect(stateToProps, dispatchToProps)(Header);
export default Header;
 