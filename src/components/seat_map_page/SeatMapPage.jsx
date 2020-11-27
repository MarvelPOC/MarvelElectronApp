import React, { Component } from "react";
import { connect } from "react-redux";
import { activePageActions } from "../../action";
import { activePageConstants } from "../../constants";
import BottomSeatMapPanel from "./BottomSeatMapPanel";
import "./css/seatMapLayout.css";
import LeftSideSeatMapPanel from "./LeftSideSeatMapPanel";
import SeatMap from "./seat_map/SeatMap";
import TopSeatMapPanel from "./TopSeatMapPanel";

class SeatMapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusEconomy: false,
    };

    this.onEconomyClick = this.onEconomyClick.bind(this);
    this.onPremiumClick = this.onPremiumClick.bind(this);
  }

  componentDidMount() {
    this.props.setPage(activePageConstants.SEAT_MAP);
  }

  componentWillUnmount() {
    this.props.setPage(activePageConstants.LANDING_PAGE);
  }
  onCancelClick = () => {
    this.props.onHide(false);
    this.props.setPage(activePageConstants.LANDING_PAGE);
    /* window.location.reload(false); */
  };

  onEconomyClick(isdisabled) {
    if (!isdisabled) {
      this.setState({ focusEconomy: true });
    } else return;
  }

  onPremiumClick(isdisabled) {
    if (!isdisabled) {
      this.setState({ focusEconomy: false });
    } else return;
  }

  render() {
    return (
      <div className="seat-map-screen">
        <div className="app-row u-no-gutters">
          <TopSeatMapPanel
            myKey={this.props.match.params.myKey}
            focusEconomy={this.state.focusEconomy}
            onEconomyClick={this.onEconomyClick}
            onPremiumClick={this.onPremiumClick}
          />
        </div>
        <div className="app-row u-no-gutters  main-body">
          <div className="col-1-of-6">
            <LeftSideSeatMapPanel />
          </div>
          <div className="col-5-of-6 u-gray-border">
            <div
              className={
                !this.state.focusEconomy
                  ? "seat-map-screen__seat-map-area seat-map-screen__seat-map-area--focus-premium"
                  : " seat-map-screen__seat-map-area"
              }
            >
              <div className="seat-map-content">
                <SeatMap
                  focusEconomy={this.state.focusEconomy}
                  myKey={this.props.match.params.myKey}
                />
              </div>
            </div>
          </div>
        </div>
        <BottomSeatMapPanel
          isEconomySelected={this.state.focusEconomy}
          myKey={this.props.match.params.myKey}
          cancel={this.onCancelClick}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (pageId) => dispatch(activePageActions.setPage(pageId)),
  };
};

export default connect(null, mapDispatchToProps)(SeatMapPage);
