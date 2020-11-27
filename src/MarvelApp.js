import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../src/assets/css/common.css';
import Header from './components/common/header/Header';
import MainHeader from './components/common/header/MainHeader';
import LandingScreen from './components/landing_page/LandingScreen';
import LoginScreen from './components/login_page/LoginScreen';
import Notification from './notification/PushNotification';
import { Loading } from './router/Loading';
import PrivateRoute from './router/PrivateRoute';

 const MarvelApp=(props) => {
 
  const [displayModal, changeDisplay] = useState(false);
  const onMenuSelect = (flag) =>{
      changeDisplay(flag);
    }

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    document.addEventListener("keydown", (e) => {
    //remove 73 to enable inspect
      if (([65,70,72,73,74,76,78,80,83,84,87].includes(e.keyCode)) && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
        e.preventDefault();
      }
    }, false);
  //prevent browser task manager
    document.addEventListener("keydown", (e) => {
      if (([27].includes(e.keyCode)) && e.shiftKey){
      e.preventDefault();
      }
      }, false);

      document.addEventListener("keydown", (event) => {
        if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109' || event.which == '187' || event.which == '189' ) ) {
        event.preventDefault();
        }
        },false);

  // tab + f11 disable in edge minimie
  document.addEventListener("keydown", (event) => {
  if (event.keyCode == '9' && event.keyCode == '122') {
  event.preventDefault();
  }
  }, false);
  

    document.addEventListener('mousedown', function (event) {
      if (event.detail > 1) {
      event.preventDefault();
      }
      }, false);

  }, [])

 
  return ( <>{ props.loading ?<Loading/>:
          <>
            <BrowserRouter>
                <div className="header">
                <Header/>
              <MainHeader onMenuSelect={onMenuSelect}/>
              </div>
              <Switch>
                <Route path="/login/:lsn?/:uuid?" component={LoginScreen}/>
                <PrivateRoute path="/" onMenuSelect={onMenuSelect} displayModal={displayModal} component={LandingScreen}/>
              </Switch> 
            </BrowserRouter>
            <Notification/>
           {/*  <Footer/> */}
          </>}</>
          
  );
}
const mapStateToProps=(state)=>{
  const loading = state.login.loading;
  return{ loading }
}


export default (connect(mapStateToProps, null)) (MarvelApp);