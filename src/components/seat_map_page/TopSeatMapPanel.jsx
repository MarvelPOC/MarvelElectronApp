import React from "react";
import { Trans, useTranslation } from "react-i18next";
import narrowDisabled from "./assets/narrow.png";
import premiumOFF from "./assets/premium_btn_off.png";
import premiumON from "./assets/premium_btn_on.png";
import economyOFF from "./assets/regular_btn_off.png";
import economyON from "./assets/regular_btn_on.png";
import SeatMapService from "./SeatMapService.js";

function TopSeatMapPanel(props) {
  const { t } = useTranslation();
  let disableToggle = props.myKey === "sm";
  let flightInfo = SeatMapService.getFlightInfo(props.myKey);
  return (
    <div className="seat-map-screen__top-panel">
      <div className="app-row u-no-gutters">
        <div className="panel-heading">
          <div className="col-2-of-4">
            <h2 className="heading-primary u-margin-left--md">
              <Trans i18nKey="seatMapDisplay.seatMapTitle">
                {t("seatMapDisplay.seatMapTitle")}
              </Trans>
            </h2>
          </div>
          <div className="col-2-of-4">
            <div className="panel-heading-icon--right">
              <img src={require("../../assets/img/star-icon.png")} />
              <img
                className="que-icon"
                src={require("../../assets/img/icn_help_30-30.png")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="panel-sub-heading u-margin-left--md">
        <div className="app-row u-no-gutters">
          <div className="col-1-of-6">
            <h3 className="heading-teritiary heading-teritiary--light">
              {flightInfo.model}{" "}
              <Trans i18nKey="seatMapDisplay.seat">
                {t("seatMapDisplay.seat")}
              </Trans>{" "}
              <br /> #{flightInfo.listCount}{" "}
            </h3>
          </div>
          <div className="col-3-of-6 flight-info">
            <div className="col-1-of-4">
              <Trans i18nKey="seatMapDisplay.flightName">
                {t("seatMapDisplay.flightName")}
              </Trans>
              {flightInfo.flightNumber}
            </div>
            <div className="col-2-of-4">
              <Trans i18nKey="seatMapDisplay.dateTitle">
                {t("seatMapDisplay.dateTitle")}
              </Trans>
              {flightInfo.flightDate}
            </div>
            <div className="col-1-of-4 cntSpecified">
              <Trans i18nKey="seatMapDisplay.cntSpecified">
                {t("seatMapDisplay.cntSpecified")}
              </Trans>
            </div>
          </div>

          <div className="col-2-of-6 u-margin-top--sm">
            <div className="col-2-of-3">
              <div className="cabin-selection-btn">
                {flightInfo.flightNumber == "NH4915" ? (
                  <img src={narrowDisabled} alt="" />
                ) : (
                  <div>
                    <img
                      src={
                        disableToggle
                          ? premiumOFF
                          : props.focusEconomy
                          ? premiumOFF
                          : premiumON
                      }
                      alt=""
                      onClick={() => props.onPremiumClick(disableToggle)}
                    />
                    <img
                      src={
                        disableToggle
                          ? economyOFF
                          : !props.focusEconomy
                          ? economyOFF
                          : economyON
                      }
                      alt=""
                      onClick={() => props.onEconomyClick(disableToggle)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-1-of-3 forest-btn">
              <button className="app-btn app-btn--secondary--disabled">
                <Trans i18nKey="seatMapDisplay.forest">
                  {t("seatMapDisplay.forest")}
                </Trans>
                &nbsp;(<u>D</u>)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSeatMapPanel;
