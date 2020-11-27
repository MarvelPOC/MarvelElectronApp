import React from 'react';
import { withTranslation } from "react-i18next";

function RightSideMenu (props) {
    const { t } = props;
    return(
        <div className="right-side-menu" >
           
<div className="app-row u-no-gutters">
    <button className="right-menu__tab right-menu__tab--active" >{t('rightMenu.guidance')} (<u>F</u>)</button>
  <button className="right-menu__tab u-disable" >{t('rightMenu.list')} (<u>L</u>)</button>
  <button className="right-menu__tab u-disable">T<u>K</u>T</button>
</div>
<div className="app-row u-no-gutters">
    <div className="right-menu__heading">{t('rightMenu.guidance')}</div>
</div>
<div className="app-row u-no-gutters">
    <div className="right-menu__body">
    <div className="right-menu__body-content">
        &nbsp;
        </div>
    
    <div className="right-menu__body-btn-area">
    <div className="app-btn app-btn--white u-disable">{t('rightMenu.sendQueue')}&nbsp;(<u>Z</u>)</div>
    <div className="app-btn app-btn--white u-disable">{t('rightMenu.remarks')}</div>
</div>
</div>
</div>
<div className="app-row u-no-gutters">
    <div className="right-menu-footer">
        <div className="col-1-of-2">
            <ul className="right-menu-footer__radio-grp">
            <li  className="u-disable"><input type="checkbox" name="checkBtn"  id="check1" readOnly /><label>{t('rightMenu.sendQueue')}</label></li>
            <li className="u-disable"><input type="checkbox" name="checkBtn" id="check2" readOnly/><label>{t('rightMenu.eotOption')}</label></li>
            </ul>
        </div>
        <div className="col-1-of-2">
            <button className="app-btn app-btn--orange right-menu-footer__btn u-disable">{t('header.complete')}&nbsp;(<u>E</u>OT)</button>
        </div>
    </div>
</div>
</div>
    )
}

export default withTranslation()(RightSideMenu);