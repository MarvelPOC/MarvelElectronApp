import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';


const SideElement=(({t})=>{
    return (<div className="rght-option-container">
                <div className="rght-option-btn-grp">
                    <div>
                        <div className="rght-option-header">
                            <span>{t('vacancySearch.sideElement.labels.itinerary')}</span>
                            <span className="option-left">(0)</span>
                        </div>
                        <div className="rght-option-middle">
                            <div className="rght-option-mid-content">
                                <div className="option-mid-content"></div>
                            </div>
                            <div className="middle-footer">
                                <button>{t('vacancySearch.sideElement.labels.resdelete')}</button>
                            </div>
                        </div>
                        <div className="rght-option-bottom">
                            <div className="option-bottom-header">
                                <span>MEMO</span>
                            </div>
                            <div className="rght-option-bot-content">
                                <div className="option-bot-content"></div>
                            </div>
                            <div className="rght-option-bot-footer">
                                <span>{t('vacancySearch.sideElement.labels.total')}</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
});


SideElement.propTypes = {
    t:PropTypes.any
  };

export default withTranslation() (SideElement);
