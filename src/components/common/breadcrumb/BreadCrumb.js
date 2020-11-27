import React from 'react';
import './BreadCrumb.css';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const BreadCrumb = ({isSearchScreen, t})=>{
return(
    <div className="bread-crumb-area">
        <div className="bread-crumb">
            <div className={`crumb-element ${isSearchScreen ? 'selected-crumb' : ''}`}>
                <label>{t('vacancySearch.labels.breadCrumbSearch')}</label>
            </div>
            <div className="crumb-icon">
                <div class="arrow-right-tst"></div>
            </div>
            <div className={`crumb-element ${isSearchScreen ? '' : 'selected-crumb'}`}>
                <label>{t('vacancySearch.labels.breadCrumbResult')}</label>
            </div>
        </div>
    </div>
    )
}

BreadCrumb.propTypes = {
    isSearchScreen: PropTypes.bool,
    t:PropTypes.any
  };

export default withTranslation() (BreadCrumb);