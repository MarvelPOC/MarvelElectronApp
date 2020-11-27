import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginActions, translationActions } from '../action/index';
import { LeftSideMenu } from '../components/common/sidemenu/LeftSideMenu.jsx';
import RightSideMenu from '../components/common/sidemenu/RightSideMenu.jsx';
import SeatMapPage from '../components/seat_map_page/SeatMapPage';
import SelectSeatMap from '../components/seat_map_page/SelectSeatMap';
import VacancyResult from '../components/vacancy_result/VacancyResult';
import VacancySearch from '../components/vacancy_search/VacancySearch';
import { ModalRoute } from '../router/ModalRoute';

const PrivateRoute = (props) =>{
    const { i18n } = useTranslation();
    useEffect(() => {
      if (isLoggedin()){
        props.setUpAxiosInterceptors();
        let loginInfo = JSON.parse(sessionStorage.getItem('header')) || null;
        if(loginInfo.agentId === "20089"){
          i18n.changeLanguage("jp");
          props.changeDisplayLanguage('jp');
        } else{
          i18n.changeLanguage("en");
          props.changeDisplayLanguage('en');
        }
      }
    }, [])

  const isLoggedin = () =>{
    let loginInfo = JSON.parse(sessionStorage.getItem('header')) || null;
    return loginInfo != null ? true : false;
  }

  let onMenuSelect = props.onMenuSelect;
  let displayModal = props.displayModal;

  if(isLoggedin())
  {
    return(
      <div className="app">
        <div className="app-row">
          <div className="app-container">
            <LeftSideMenu/>  
            <div className="main-page-area">
              <Route {...props}/>
              <Switch>
                <ModalRoute path="/vacancy" render={(props) => (<VacancySearch onHide={onMenuSelect} {...props}/>)} display={displayModal} onDisplayChange={onMenuSelect}/>
                <ModalRoute path="/seat-map/:myKey"  render={(props) => (<SeatMapPage onHide={onMenuSelect} {...props}/>)} display={displayModal} onDisplayChange={onMenuSelect}/>
                <ModalRoute path="/selectSeatMap"  render={(props) => (<SelectSeatMap onHide={onMenuSelect} {...props}/>)} display={displayModal} onDisplayChange={onMenuSelect}/>
                <ModalRoute path="/vacancyResult" render={(props) => (<VacancyResult onHide={onMenuSelect} {...props}/>)} display={displayModal} onDisplayChange={onMenuSelect}/>
                <Redirect from="*" to="/" /> 
              </Switch>
            </div>
            <RightSideMenu/>
          </div>
        </div>
      </div>
    )
  }
  else{
    return <Redirect to ="/login"/>
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    logout: ()=>{
        dispatch(LoginActions.logout())
     },
    setUpAxiosInterceptors: ()=>{
      dispatch(LoginActions.setUpAxiosInterceptors())
    },
    changeDisplayLanguage: (language)=>{
      dispatch(translationActions.changeDisplayLanguage(language))
   }
 }
}

export default (connect(null, mapDispatchToProps)) (PrivateRoute);