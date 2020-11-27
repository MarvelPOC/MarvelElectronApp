import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import './Translate.css';
import engImg from '../../../assets/img/english.png';
import jpnImg from '../../../assets/img/japanese.png';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { translationActions } from '../../../action';

const CustomTranslate=(props)=>{
    const { t, i18n } = useTranslation();
    let langSel = localStorage.getItem('i18nextLng') || 'en';
    const [displayDiv, changeDisplay] = useState('none');
    const [displayLanguage, changeDisplayLanguage] = useState(langSel);
    const selImgae = langSel === 'en' ? engImg : jpnImg;
    const [imageUrl, changeImageURL] = useState(selImgae);

    useEffect(() => {
        let langSelected = localStorage.getItem('i18nextLng') || 'en';
        props.changeDisplayLanguage(langSelected);
        let imgSel = langSelected === 'en' ? engImg : jpnImg;
        changeImageURL(imgSel);
      }, [])

    const changeLanguage = lng => {
        if(lng === 'jp'){
            changeDisplayLanguage(lng);
            changeImageURL(jpnImg);
        }else{
            changeDisplayLanguage(lng);
            changeImageURL(engImg);
        }
        i18n.changeLanguage(lng);
        props.changeDisplayLanguage(lng);
        changeDisplay('none');
      };
    
    const selectLanguage= () =>{
        changeDisplay('block');
    }

    return(
        <div className={`translate-area ${props.className}`}>
            <nav tabIndex="0">
                <div className="lang-menu">
                    <div className="selected-lang" onClick={() => selectLanguage()}>
                        <img src={imageUrl} alt="languageImage" />
                        <label>{displayLanguage == 'jp' ? t('translate.labels.jp') : t('translate.labels.en')}</label>
                    </div>
                    <ul style={{display:`${displayDiv}`, zIndex: '1'}}>
                        <li tabIndex="0">
                            <div className="jp" onClick={() => changeLanguage('jp')}>{t('translate.labels.jp')}</div>
                        </li>
                        <li tabIndex="0">
                            <div className="en" onClick={() => changeLanguage('en')}>{t('translate.labels.en')}</div>
                        </li>
                    </ul>           
                </div>
            </nav>
        </div>
    )
}

CustomTranslate.propTypes = {
    className: PropTypes.string,
    t:PropTypes.any,
  };
  const mapStateToProps=(state)=>{
    const selectedLanguage = state.translationReducer.selectedLanguage;
    return{ selectedLanguage }
  }

  const mapDispatchToProps=(dispatch)=>{
    return{
     changeDisplayLanguage: (language)=>{
            dispatch(translationActions.changeDisplayLanguage(language))
         }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(CustomTranslate);