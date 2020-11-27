import React, { Component } from 'react';
import { messaging } from "./init.fcm";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { Growl } from 'primereact/growl';
import { Button } from 'primereact/button';
import './PushNotification.css';
import { connect } from 'react-redux';
import { initActions } from '../action';

const registerPushListener = pushNotification =>
  navigator.serviceWorker.addEventListener("message", ({ data }) =>
    pushNotification(
      data.data
        ? data.data.message
        : data["firebase-messaging-msg-data"].data.message
    )
  );
class Notification extends Component{
  constructor(props) {
    super(props);
    this.showConfirm = this.showConfirm.bind(this);
    this.clear = this.clear.bind(this);
    this.onYesClick = this.onYesClick.bind(this);
  }
    showConfirm(notification) {
      this.growl.show({ severity: 'warn', sticky: true, summary:"Confirm to proceed", detail: (
          <div className="p-flex p-flex-column" style={{flex: '1'}}>
              <div className="p-text-center">
                  <p style={{fontSize:'1.1rem', marginBottom:'4px'}}>{notification}</p>
              </div>
              <div className="p-grid p-fluid">
                  <div className="p-col-6">
                      <Button type="button" label="No" className="no-btn" onClick={this.clear}/> 
                  </div>
                  <div className="p-col-6">
                      <Button type="button" label="Yes" className="yes-btn" onClick={this.onYesClick}/>
                  </div>
              </div>
          </div>
      ) });
  }

  clear =()=> {
		this.growl.clear();
  }

  onYesClick = () =>{
    this.props.getAllAirportInfo();
    this.growl.clear();
  }
  
  render(){
    return(
      <div className="marvel-notification">
        <div style={{textAlign:'center'}}>
          <Growl ref={(el) => this.growl = el} position="topright" />
        </div> 
        <div>
          {console.log(this.props.token)}
          {this.props.notifications.length ? this.showConfirm(this.props.notifications) :''}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps=(dispatch)=>{
	return{
        getAllAirportInfo: ()=>{
			    dispatch(initActions.getAllAirportInfo())
		},
	}
}

export default compose(
  connect(null, mapDispatchToProps),
  withState("token", "setToken", ""),
  withState("notifications", "setNotifications", []),
  withHandlers({
    pushNotification: ({
      setNotifications
    }) => newNotification =>
      setNotifications(newNotification)
  }),
  lifecycle({
    async componentDidMount() {
      const { pushNotification, setToken } = this.props;
      messaging
        .requestPermission()
        .then(async function() {
          const token = await messaging.getToken();
          setToken(token);
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
        });
      registerPushListener(pushNotification);
    }
  })
)(Notification);