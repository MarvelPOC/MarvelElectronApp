import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import IconRloc from "../../../assets/img/btn_header_rloc.png";
import IconWebMinds from "../../../assets/img/btn_WebMinds.png";
import IconNH from "../../../assets/img/carrier_NH.png";
import DmsDevLogo from "../../../assets/img/DMS_DEV.png";
import IconP from "../../../assets/img/iconP.png";
import IconPY from "../../../assets/img/iconPY.png";
import IconCACAO from "../../../assets/img/icon_CACAO.png";
import IconFFP from "../../../assets/img/icon_NOFFP.png";
import IconStar from "../../../assets/img/star-icon.png";
import { activePageConstants } from "../../../constants/index";
import { AuthService } from "../../../service";
import HeaderButton from "../keyboard/HeaderButton";
import IconButton from "../keyboard/IconButton";

const MainHeader = (props) => {
  const onHeaderClick = () => {
    props.history.push("/landing");
  };
  const onF1Click = () => {
    props.history.push("/vacancy");
    props.onMenuSelect(true);
  };

  const onSeatMapClick = () => {
    props.history.push("/selectSeatMap");
    props.onMenuSelect(true);
  };

  const onLogout = () => {
    props.logOut();
    props.history.push("/login");
  };

  const { t } = props;
  const pageId = activePageConstants.LANDING_PAGE;
  return (
    <>
      {AuthService.isLoggedin() && (
        <>
          <div className="app-row u-no-gutters header-main">
            <div className="col-1-of-6">
              <ul className="main-icon__list">
                <li className="main-icon__item u-disable">
                  <img src={IconNH} alt="Ana Carrier" />
                  <span className="carrier-info">OSB001</span>
                </li>
                <li className="main-icon__item u-disable">
                  <img src={IconFFP} alt="User Icon" />
                </li>
              </ul>
            </div>
            <div className="col-2-of-6">
              <div className="col-5-of-6">
                <ul className="minds-info">
                  <li>
                    <div className="col-1-of-2">
                      {t("header.amcNumber")}&nbsp;:
                      <span className="empty-info">-</span>
                    </div>
                    <div className="col-1-of-2">
                      AFA/JFM:<span className="empty-info">-</span>
                    </div>
                  </li>
                  <li>
                    <div className="col-1-of-3">
                      {t("header.mileage")}&nbsp;:
                      <span className="empty-info">-</span>
                    </div>
                    <div className="col-1-of-3">
                      {t("header.upgradePoints")}&nbsp;:
                      <span className="empty-info">-</span>
                    </div>
                    <div className="col-1-of-3">
                      {t("header.premiumPoints")}&nbsp;:
                      <span className="empty-info">-</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-1-of-6">
                <div style={{ float: "right" }}>
                  <IconButton
                    className="launch-icon"
                    id="seatMapLauncher"
                    onKeyPress={(event) =>
                      event.key === "Enter" ? onSeatMapClick() : null
                    }
                    onClick={onSeatMapClick}
                    src={IconStar}
                    alt="Launch Seat Map"
                    hotkey="alt+shift+z"
                    pageId={pageId}
                  />

                  <a href="#" className="launch-icon u-disable">
                    <img src={IconWebMinds} alt="" className="main-btn-icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-3-of-6">
              <div className="app-row u-margin-bottom--sm">
                <div className="col-1-of-5">
                  <button className="app-btn app-btn--teritiary u-disable">
                    {t("header.history")}&nbsp;(<u>H</u>)
                  </button>
                </div>
                <div className="col-1-of-5">
                  <button className="app-btn app-btn--teritiary u-disable">
                    {t("header.supend&redisplay")}&nbsp;(<u>I</u>)
                  </button>
                </div>
                <div className="col-1-of-5">
                  <button className="app-btn app-btn--teritiary u-disable">
                    {t("header.update")}&nbsp;(<u>T</u>)
                  </button>
                </div>
                <div className="col-1-of-5">
                  <button className="app-btn app-btn--teritiary u-disable">
                    {t("header.suspend")}&nbsp;(<u>G</u>)
                  </button>
                </div>
                {/*  <div className="col-1-of-5">
              <CustomTranslate className="translate-btn" />
            </div> */}
                <div className="col-1-of-5">
                  <button className="app-btn  app-btn--orange u-disable">
                    {t("header.complete")}&nbsp;(<u>E</u>OT)
                  </button>
                </div>
              </div>
              <div className="app-row u-margin-top--sm">
                <div className="col-1-of-4">
                  <button className="app-btn app-btn--teritiary u-disable">
                    {t("header.otherAction")}&nbsp;(<u>V</u>)
                  </button>
                </div>
                <div className="col-1-of-4">
                  <div className="col-3-of-4">
                    <input className="text-input u-disable" type="text" readOnly/>
                  </div>
                  <div className="col-1-of-4">
                    <a href="#" className="launch-icon u-disable">
                      <img src={IconRloc} alt="" className="main-btn-icon" />
                    </a>
                  </div>
                </div>
                <div className="col-1-of-4">
                  <a href="#" className="launch-icon u-disable">
                    <img
                      src={IconCACAO}
                      alt=""
                      style={{ float: "left" }}
                      className="main-btn-icon"
                    />
                  </a>
                  <div className="col-2-of-3">
                    <button className="app-btn app-btn--teritiary u-disable">
                      {t("header.search")}&nbsp;(<u>S</u>)
                    </button>
                  </div>
                </div>
                <div className="col-1-of-4">
                  <button className="app-btn app-btn--teritiary u-disable">
                    {t("header.clearData")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="app-row u-no-gutters header-sub">
            <div className="col-1-of-4 fn-grp">
              <HeaderButton
                id="f1Btn"
                onClick={onF1Click}
                hotkey="f1"
                firstHeader={t("header.f1")}
                secondHeader="F1"
                pageId={pageId}
              />
              <HeaderButton
                id="f2Btn"
                onClick={onHeaderClick}
                hotkey="f2"
                firstHeader={t("header.f2")}
                secondHeader="F2"
                pageId={pageId}
                disabled
              />

              <HeaderButton
                id="f3Btn"
                onClick={onHeaderClick}
                hotkey="f3"
                firstHeader={t("header.f3")}
                secondHeader="F3"
                pageId={pageId}
                disabled
              />
              <HeaderButton
                id="f4Btn"
                onClick={onHeaderClick}
                hotkey="f4"
                firstHeader={t("header.f4")}
                secondHeader="F4"
                pageId={pageId}
                disabled
              />
            </div>

            <div className="col-1-of-4 fn-grp">
              <HeaderButton
                id="f5Btn"
                onClick={onHeaderClick}
                hotkey="f5"
                firstHeader={t("header.f5")}
                secondHeader="F5"
                pageId={pageId}
                disabled
              />
              <HeaderButton
                id="f6Btn"
                onClick={onHeaderClick}
                hotkey="f6"
                firstHeader={t("header.f6")}
                secondHeader="F6"
                pageId={pageId}
                disabled
              />
              <HeaderButton
                id="f7Btn"
                onClick={onHeaderClick}
                hotkey="f7"
                firstHeader={t("header.f7")}
                secondHeader="F7"
                pageId={pageId}
                disabled
              />
              <HeaderButton
                id="f8Btn"
                onClick={onHeaderClick}
                hotkey="f8"
                firstHeader={t("header.f8")}
                secondHeader="F8"
                pageId={pageId}
                disabled
              />
            </div>
            <div className="col-1-of-4">
              <HeaderButton
                id="f9Btn"
                onClick={onHeaderClick}
                hotkey="f9"
                firstHeader={t("header.f9")}
                secondHeader="F9"
                pageId={pageId}
                disabled
              />
              <HeaderButton
                id="f10Btn"
                onClick={onHeaderClick}
                hotkey="f10"
                firstHeader={t("header.f10")}
                secondHeader="F10"
                pageId={pageId}
                disabled
              />
              <HeaderButton
                id="f11Btn"
                onClick={onHeaderClick}
                hotkey="f11"
                firstHeader={t("header.f11")}
                secondHeader="F11"
                pageId={pageId}
                disabled
              />
              <HeaderButton
                id="f12Btn"
                onClick={onHeaderClick}
                hotkey="f12"
                firstHeader={t("header.f12")}
                secondHeader="F12"
                pageId={pageId}
                disabled
              />
            </div>
            <div className="col-1-of-4">
              <div className="col-1-of-2">
                <ul className="u-margin-left--sm  header-sub__pnr-list">
                  <li className="header-sub__pnr-item">
                    <a href="#" className="pnr-link u-disable">
                      <img src={IconP} alt="#" className="header-sub__p-icon" />
                    </a>
                  </li>
                  <li className="header-sub__pnr-item">
                    <a href="#" className="pnr-link u-disable">
                      <img
                        src={IconPY}
                        alt="#"
                        className="header-sub__p-icon"
                      />
                    </a>
                  </li>
                </ul>
              </div>

              <img
                src={DmsDevLogo}
                alt="#"
                className="col-1-of-2 header-sub__dms-bkg "
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
MainHeader.propTypes = {
  history: PropTypes.object,
  onMenuSelect: PropTypes.func,
};

export default withTranslation()(withRouter(MainHeader));
