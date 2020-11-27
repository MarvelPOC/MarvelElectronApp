
import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withTranslation } from 'react-i18next';
import '../../../assets/css/common.css';
import iconPopup from '../../../assets/img/icn_pup_error.png';
import { activePageConstants } from '../../../constants';
import Button from '../keyboard/Button';


const  ErrorModal = ({message, closefn, t}) =>{

    const onClose = () => { closefn(); }


    return (<>
     
            <div className="error-modal">
            <div className="close__bar">
                <button className="close__icon" onClick={onClose}>&times;</button>
            </div>
            <div className="error-modal__content">
    
                <div className="error-modal__header">
                    <img src={iconPopup} alt="" className="alert-icon"/>
                    {t('error.header')}</div>
                    <div className="error-modal__body">
                    <CopyToClipboard text={t(`error.${message}`)}>
                     <span className="error-label-content">{t(`error.${message}`)}</span>
                    </CopyToClipboard>
                    </div>
                    <center>
                    <Button  
              className="u-btn u-btn--white confirm-btn"
              id="login-error-confirm"
              hotkey="alt+o" pageId={activePageConstants.LOGIN_PAGE}
              onClick={onClose}
              label={"O̲K"}
            /></center>

            </div>
        </div></>)
}

ErrorModal.propTypes = {
    message:PropTypes.string,
    closefn:PropTypes.func,
    t:PropTypes.any,
}

ErrorModal.defaultProps = {
    message:'',
}


export default withTranslation() (ErrorModal);
