import React, { useState } from 'react';
import './Error.css';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import  Button  from '../keyboard/Button';
import { withTranslation } from 'react-i18next';
import Tooltip from 'react-tooltip-lite';
import { connect } from 'react-redux';
import {activePageConstants} from '../../../constants/index';
import {activePageActions} from '../../../action/index';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Error = (props)=>{
    const [display, changeDisplay] = useState(false);
    const { className, t, error, pageId } = props;
    let  activePageId = "";

    const onHide = () =>{
        if(pageId){
            props.setPage(pageId);
        } else {
            props.setPage(activePageId);
        }
        changeDisplay(false);

        if(pageId === activePageConstants.VACANCY_SEARCH){
            let ariaSelected = document.getElementById("yearDropdown").getElementsByTagName("input")[1];
                ariaSelected.blur();
        }
    }
    
    const onShow = () =>{
        activePageId = props.activePageId;
        changeDisplay(true);
        props.setPage(activePageConstants.ERROR_PAGE);
        
        if(pageId === activePageConstants.VACANCY_SEARCH){
            let ariaSelected = document.getElementById("yearDropdown").getElementsByTagName("input");
            for(var i=0; i < ariaSelected.length ; i++){
                ariaSelected[i].blur();
            }
        }
    }
    const footer = (
            <div>
                <Button id="errorBtnId" autofocus className="marvel-primary footer-btn" hotkey="alt+o" pageId={activePageConstants.ERROR_PAGE} label="O̲K" onClick={() => onHide()} />
            </div>
        );
    return(
    error.length ? (<div className={`error-element ${className}`} onClick={()=> onShow()}>
                            <div className="error-message">
                             {error.map((err, i)=>(
                                 <Tooltip content={t(`error.${err}`)} zIndex={10000} tagName="span" direction="bottom-start" className="target errorTooltip" distance={1} background="#F9E4E0" padding="6px" color="#FF0000" arrow={false} tipContentClassName="myToolTip">
                                    <CopyToClipboard text={t(`error.${err}`)}>
                                        <span key={i} className="error-label">{t(`error.${err}`)}</span>
                                    </CopyToClipboard>
                                </Tooltip>
                             ))}
                            </div>
                            <Dialog visible={display}
                                onHide={() => onHide()} footer={footer} modal={true}>
                                <div className="error-content">
                                    <div className="err-titlebar">
                                        <div className="al-img-div">
                                            <img src={require('../../../assets/img/icn_pup_error.png')}/>
                                        </div>
                                        <div className="al-head-div">
                                            <label>{t('error.header')}</label>
                                        </div>
                                    </div>
                                    <div className="error-modal-content">
                                        <div style={{background:'#ffffff', minHeight:'84px'}}>
                                            {error.map((err, i)=>(
                                                <Tooltip content={t(`error.${err}`)} tagName="span" zIndex={10000} direction="right-start" className="target errorTooltip" distance={-4} background="#FFFFFF" padding="6px" color="#FF0000" arrow={false} tipContentClassName="myToolTipTwo">
                                                    <CopyToClipboard text={t(`error.${err}`)}>
                                                        <span key={i} className="error-label-content">{t(`error.${err}`)}</span>
                                                    </CopyToClipboard>
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </div>) : ''
    )};

Error.propTypes = {
    className: PropTypes.string,
    t:PropTypes.any,
    error: PropTypes.array,
    pageId:PropTypes.any,
  };

Error.defaultProps = {
    className: '',
    error: [],
    pageId: ''
}
const mapStateToProps=(state)=>{
    const activePageId = state.activePageReducer.pageId;
    return{ activePageId }
  }
const mapDispatchToProps=(dispatch)=>{
	return{
        setPage: (pageId) =>{
            dispatch(activePageActions.setPage(pageId))
        }
        
	}
}
export default withTranslation() (connect(mapStateToProps,mapDispatchToProps) (Error));