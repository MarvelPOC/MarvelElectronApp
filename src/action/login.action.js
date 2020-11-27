import { loginConstants } from '../constants/index';
import { AuthService, initService } from '../service/index';

export const LoginActions = {
  login,
  logout,
  setUpAxiosInterceptors,
}

function login(props, loginCredentials) {
  let loginDetails = {
    agentId:loginCredentials.agentId,
    lsn:loginCredentials.lsn,
    uuid:loginCredentials.uuid
  }
  sessionStorage.setItem('header', JSON.stringify(loginDetails));
  sessionStorage.setItem('lsn',loginDetails.lsn);
  sessionStorage.setItem('uuid',loginDetails.uuid);
  return dispatch => {
      dispatch(request(loginCredentials));
      AuthService.authenticate(loginCredentials)
          .then(
              loginInfo => {
                  initService.getAllAirportInfo().then( airportInfo => {
                    dispatch(success(loginInfo));
                  }).catch((error)=>{
                    sessionStorage.removeItem('header');
                    props.history.push('/login');
                    dispatch(failure(error));
                  });
                  props.history.push('/');
              },
              error => {
                  dispatch(failure(error));
              }
          );
  };

  function request() { return { type: loginConstants.LOGIN_REQUEST } }
  function success(loginInfo) { return { type: loginConstants.LOGIN_SUCCESS, payload: loginInfo } }
  function failure(error) { return { type: loginConstants.LOGIN_FAIL, payload: error } }
}

function logout () {
  return dispatch => {
    AuthService.logOut()
        .then(
            () => {
                dispatch(logOut());
            });
    };
  function logOut() {return { type: loginConstants.LOGOUT}}
}

function setUpAxiosInterceptors() {
  return dispatch => { AuthService.setUpAxiosInterceptors();
                      dispatch (setUpAxiosInterceptors()); }
    function setUpAxiosInterceptors() { return { type: loginConstants.SET_AXIOS_INTERCEPTOR }}
}