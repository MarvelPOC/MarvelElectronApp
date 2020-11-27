import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Tooltip from "react-tooltip-lite";
import SeatIcons from "./seat_map/partials/Columns/SeatIcons";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context(
    "./seat_map/partials/Columns/seat_icons",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

function LeftSideSeatMapPanel({ displayLanguage }) {
  return (
    <div className="seat-map-screen__left-panel u-gray-border">
      <ul className="seat-list">
        {SeatIcons.map((config) => (
          <div>
            {config.tooltip == "jp" && displayLanguage === "jp" ? (
              <Tooltip
                content={
                  <div className="seat-tooltip">
                    <img
                      className="seat-tooltip__icon"
                      src={images[config.image]}
                      alt="Seat Info"
                    />
                    <span className="seat-tooltip__label">{config.textJP}</span>
                  </div>
                }
                direction="right"
                arrow={false}
                distance={-10}
                zIndex={1500}
              >
                <li className="seat-item">
                  <img
                    src={images[config.image]}
                    alt=""
                    className="seat-item__icon"
                  />
                  <span className="seat-item__label">
                    {displayLanguage === "jp" ? config.textJP : config.text}
                  </span>
                </li>
              </Tooltip>
            ) : config.tooltip == "en" && displayLanguage === "en" ? (
              <Tooltip
                content={
                  <div className="seat-tooltip">
                    <img
                      className="seat-tooltip__icon"
                      src={images[config.image]}
                      alt="Seat Info"
                    />
                    <span className="seat-tooltip__label">{config.text}</span>
                  </div>
                }
                direction="right"
                arrow={false}
                distance={-10}
                zIndex={1500}
              >
                <li className="seat-item">
                  <img
                    src={images[config.image]}
                    alt=""
                    className="seat-item__icon"
                  />
                  <span className="seat-item__label">
                    {displayLanguage === "jp" ? config.textJP : config.text}
                  </span>
                </li>
              </Tooltip>
            ) : (
              <div>
                <li className="seat-item">
                  <img
                    src={images[config.image]}
                    alt=""
                    className="seat-item__icon"
                  />
                  <span className="seat-item__label">
                    {displayLanguage === "jp" ? config.textJP : config.text}
                  </span>
                </li>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  const displayLanguage = state.translationReducer.selectedLanguage;
  return { displayLanguage };
};

export default withTranslation()(
  connect(mapStateToProps)(LeftSideSeatMapPanel)
);
