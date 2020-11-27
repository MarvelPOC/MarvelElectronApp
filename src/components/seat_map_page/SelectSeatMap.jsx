import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { hotkeys } from "react-keyboard-shortcuts";
import { connect } from "react-redux";
import { activePageActions } from "../../action";
import { activePageConstants } from "../../constants";

class SelectSeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airCraftsize: null,
      showErrorMsg: false,
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setPage(activePageConstants.SEAT_MAP_SELECT);
  }

  componentWillUnmount() {
    this.props.setPage(activePageConstants.LANDING_PAGE);
  }

  onValueChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      showErrorMsg: false,
    });
  }

  formSubmit(event) {
    event.preventDefault();
    if (this.state.airCraftsize) {
      this.props.history.push(`/seat-map/${this.state.airCraftsize}`);
    } else {
      this.setState({ showErrorMsg: true });
    }
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hot_keys = {
    "alt+s": {
      priority: 1,
      handler: (event) => this.formSubmit(event),
    },
  };

  render() {
    const { displayLanguage, t } = this.props;

    return (
      <div className="app-row">
        <div className="sm-select__page">
          <section className="sm-select__section">
            <form onSubmit={this.formSubmit}>
              <div className="app-row app-error">
                &nbsp;{" "}
                {this.state.showErrorMsg && (
                  <>Please select an option to proceed further</>
                )}{" "}
              </div>

              <div onChange={this.onValueChange}>
                <div className="app-row u-margin-bottom--md">
                  <input
                    type="radio"
                    name="airCraftsize"
                    id="smallPlane"
                    value="sm"
                    className="sm-select__radio-input"
                  />
                  <label
                    htmlFor="smallPlane"
                    className="sm-select__radio-label"
                  >
                    <span className="sm-select__radio-button"></span>
                    {t("seatMapDisplay.narrow")}
                  </label>
                </div>
                <div className="app-row u-margin-bottom--md">
                  <input
                    type="radio"
                    name="airCraftsize"
                    id="mediumPlane"
                    value="md"
                    className="sm-select__radio-input"
                  />
                  <label
                    htmlFor="mediumPlane"
                    className="sm-select__radio-label"
                  >
                    <span className="sm-select__radio-button"></span>
                    {t("seatMapDisplay.wide")}
                  </label>
                </div>
                <div className="app-row u-margin-bottom--md">
                  <input
                    type="radio"
                    name="airCraftsize"
                    id="largePlane"
                    value="lg"
                    className="sm-select__radio-input"
                  />
                  <label for="largePlane" className="sm-select__radio-label">
                    <span className="sm-select__radio-button"></span>
                    {t("seatMapDisplay.jumbo")}
                  </label>
                </div>
              </div>
              {/* <button className="app-btn app-btn--secondary sm-select__btn" type="submit">
          {t('seatMapDisplay.search')}
          </button> */}

              <button
                className="app-btn app-btn--secondary sm-select__btn"
                onClick={this.props.onClick}
                type="submit"
              >
                {t("seatMapDisplay.search")}
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (pageId) => dispatch(activePageActions.setPage(pageId)),
  };
};

const mapStateToProps = (state) => {
  const displayLanguage = state.translationReducer.selectedLanguage;
  return { displayLanguage };
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(hotkeys(SelectSeatMap))
);
