import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import FareMark from "./assets/fareComparisonTitle.png";
import SeatMapService from "./SeatMapService.js";

function getSeatCountRow(row) {
  return (
    <>
      {getSeatCountCol(row.window)} {getSeatCountCol(row.aisle)}{" "}
      {getSeatCountCol(row.others)}
    </>
  );
}

function getSeatCountCol(col) {
  if (col) {
    return (
      <td className="seat-count">
        {" "}
        {col.count} / {col.total}{" "}
      </td>
    );
  } else return <td></td>;
}

function getBlockCount(block) {
  if (block) {
    return (
      <span className="seat-summary-item__count seat-count">
        {" "}
        {block.count} / {block.total}{" "}
      </span>
    );
  } else
    return (
      <span className="seat-summary-item__count seat-count">
        {" "}
        {0} / {0}{" "}
      </span>
    );
}

function BottomSeatMapPanel(props) {
  let seatAttributes = SeatMapService.getEconomySeatAttributes(
    props.isEconomySelected,
    props.myKey
  );
  let blockDetails = SeatMapService.getEconomyBlockDetails(
    props.isEconomySelected,
    props.myKey
  );
  const { t } = useTranslation();
  const history = useHistory();

  useHotkeys("alt+c", () => {
    props.cancel();
  });
  useHotkeys("alt+a", () => {
    history.goBack();
  });

  return (
    <div className="seat-map-screen__bottom-panel">
      <div className="app-row">
        <div className="col-1-of-6">
          <h3 className="flight-img-heading heading-teritiary">
            <img src={FareMark} alt="Fare" className="fare-mark" />
            <Trans i18nKey="seatAttributeHeadings.attribute">
              {t("seatAttributeHeadings.attribute")}
            </Trans>
          </h3>
          <div className="flight-img-area"></div>
        </div>

        <div className="col-3-of-6">
          <div className="seat-info-table">
            <table>
              <tr>
                <th></th>
                <th>
                  <Trans i18nKey="seatAttributeHeadings.window">
                    {t("seatAttributeHeadings.window")}
                  </Trans>
                </th>
                <th>
                  <Trans i18nKey="seatAttributeHeadings.aisle">
                    {t("seatAttributeHeadings.aisle")}
                  </Trans>
                </th>
                <th>
                  <Trans i18nKey="seatAttributeHeadings.other">
                    {t("seatAttributeHeadings.other")}
                  </Trans>
                </th>
              </tr>

              <tr>
                <th>
                  <Trans i18nKey="seatAttributeHeadings.front">
                    {t("seatAttributeHeadings.front")}
                  </Trans>
                </th>
                {getSeatCountRow(seatAttributes.front)}
              </tr>
              <tr>
                <th>
                  <Trans i18nKey="seatAttributeHeadings.mid">
                    {t("seatAttributeHeadings.mid")}
                  </Trans>
                </th>
                {getSeatCountRow(seatAttributes.middle)}
              </tr>
              <tr>
                <th>
                  <Trans i18nKey="seatAttributeHeadings.back">
                    {t("seatAttributeHeadings.back")}
                  </Trans>
                </th>
                {getSeatCountRow(seatAttributes.back)}
              </tr>
            </table>
            <span className="bottom-info-text">
              <Trans i18nKey="seatAttributeHeadings.remainingCount">
                {t("seatAttributeHeadings.remainingCount")}
              </Trans>
            </span>
          </div>
        </div>
        <div className="col-2-of-6">
          <h3 className="flight-img-heading heading-teritiary">
            <img src={FareMark} alt="Fare" className="fare-mark" />
            <Trans i18nKey="seatAttributeHeadings.block">
              {t("seatAttributeHeadings.block")}
            </Trans>
          </h3>
          <div className="seat-summary-list">
            <ul>
              <li className="seat-summary-item">
                <span className="seat-summary-item__heading">GT-BLK</span>
                <span className="seat-summary-item__count">
                  {getBlockCount(blockDetails.gtBlk)}
                </span>
              </li>
              <li className="seat-summary-item">
                <span className="seat-summary-item__heading">NOP-BLK</span>
                <span className="seat-summary-item__count">
                  {getBlockCount(blockDetails.nopBlk)}
                </span>
              </li>
              <li className="seat-summary-item">
                <span className="seat-summary-item__heading">CKI-BLK</span>
                <span className="seat-summary-item__count">
                  {getBlockCount(blockDetails.ckiBlK)}
                </span>
              </li>
              <li className="seat-summary-item">
                <span className="seat-summary-item__heading">W/B-BLK</span>
                <span className="seat-summary-item__count">
                  {getBlockCount(blockDetails.wbBlk)}
                </span>
              </li>
            </ul>
            <span className="bottom-info-text">
              <Trans i18nKey="seatAttributeHeadings.remainingCount">
                {t("seatAttributeHeadings.remainingCount")}
              </Trans>
            </span>
          </div>
        </div>
      </div>
      <div className="bottom-base">
        <div className="col-1-of-4">
          {/* <div className="col-1-of-3">
            <button className="app-btn app-btn--secondary" onClick={() => {history.goBack()}} >
              <Trans i18nKey="seatAttributeHeadings.backBtn">{t('seatAttributeHeadings.backBtn')}</Trans>
            </button>
          </div> */}
          <div className="col-1-of-2">
            <button
              className="app-btn app-btn--secondary"
              onClick={() => {
                props.cancel();
              }}
            >
              <Trans i18nKey="seatAttributeHeadings.closeBtn">
                {t("seatAttributeHeadings.closeBtn")}
              </Trans>
              &nbsp;(<u>C</u>)
            </button>
          </div>
          <div className="col-1-of-2">
            <button
              className="app-btn app-btn--secondary"
              onClick={() => {
                history.goBack();
              }}
            >
              <Trans i18nKey="seatAttributeHeadings.condInput">
                {t("seatAttributeHeadings.condInput")}
              </Trans>
              &nbsp;(<u>A</u>)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomSeatMapPanel;
