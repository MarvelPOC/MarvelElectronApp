import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { activePageActions } from "../../action";
import { activePageConstants } from "../../constants";
import "./LandingScreen.css";

class LandingScreen extends Component {
  componentDidMount() {
    this.props.setPage(activePageConstants.LANDING_PAGE);
  }

  render() {
    return (
      <div className="landing-screen">
        <div className="container">
          <div className="card">
            <div className="landing-section">
              <div className="landing-header">{this.renderHeader()}</div>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderHeader = () => {
    return (
      <div>
        <div className="landing-title">
          <div className="header-lbl">
            <label></label>
          </div>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (pageId) => dispatch(activePageActions.setPage(pageId)),
  };
};

export default withTranslation()(
  connect(null, mapDispatchToProps)(LandingScreen)
);
