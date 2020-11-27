import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoginActions } from "../../../action/index";

const Header = (props) => {
  const onLogout = () => {
    props.logout();
    props.history.push("");
  };
  return (
    <div className="app-row u-no-gutters header-bar">
      <div className="col-2-of-3">
        <ul className="header-bar__list">
          <li
            className="header-bar__item"
            tabIndex="1"
            onClick={onLogout}
            onKeyPress={(event) => (event.key === "Enter" ? onLogout() : null)}
          >
            SignIn/Out
          </li>
          <li className="header-bar__item u-disable" tabIndex="2">
            Settings
          </li>
          <li className="header-bar__item u-disable" tabIndex="3">
            Tools
          </li>
          <li className="header-bar__item u-disable" tabIndex="4">
            Links
          </li>
          <li className="header-bar__item u-disable" tabIndex="5">
            Help
          </li>
        </ul>
      </div>
    </div>
  );
};
Header.propTypes = {
  logOut: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(LoginActions.logout());
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
