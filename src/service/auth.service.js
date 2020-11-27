import axios from 'axios';
import { errorConstants } from '../constants/index';
import { AGENT_ID } from '../helpers/agents';

const AGENT_PASSWORD = 'admin';

export const AuthService = {
  authenticate,
  logOut,
  setUpAxiosInterceptors,
  isLoggedin,
}

function authenticate (loginCredentials) {
  if (AGENT_ID.includes(loginCredentials.agentId) &&
        loginCredentials.agentPassword === AGENT_PASSWORD) {
        sessionStorage.setItem('header', JSON.stringify(loginCredentials));
        let axiosInterceptors = setUpAxiosInterceptors();
        return Promise.resolve(axiosInterceptors);
  } else if(loginCredentials.agentPassword !== '' && loginCredentials.agentPassword !== AGENT_PASSWORD){
      sessionStorage.removeItem('header');
      return Promise.reject(errorConstants.DMS5000_004);
  } else if(AGENT_ID.includes(loginCredentials.agentId) && loginCredentials.agentPassword === ''){
      sessionStorage.removeItem('header');
      return Promise.reject(errorConstants.E212400375);
  } else if(!AGENT_ID.includes(loginCredentials.agentId) &&
            loginCredentials.agentPassword === AGENT_PASSWORD){
      sessionStorage.removeItem('header');
      return Promise.reject(errorConstants.E212400097);
  } else {
      sessionStorage.removeItem('header');
      return Promise.reject(errorConstants.E212400097);
  }
}

function logOut () {
  sessionStorage.removeItem('header');
  localStorage.removeItem('latestSearchCriteria');
  ejectAxiosInterceptors();
  return Promise.resolve('Logout Success');
}

function isLoggedin () {
  let loginInfo = JSON.parse(sessionStorage.getItem('header')) || null
  let flag = loginInfo != null ? true : false
  return flag;
}

function setUpAxiosInterceptors () {
  let loginInfo = JSON.parse(sessionStorage.getItem('header')) || null;
  const axiosInterceptors = axios.interceptors.request.use(config => {
    if (isLoggedin()) {
      config.headers.agentId = loginInfo.agentId
      config.headers.uuid = loginInfo.uuid
      config.headers.lsn = loginInfo.lsn
    }
    return config
  });
  sessionStorage.setItem('axiosInterceptors', JSON.stringify(axiosInterceptors));
  return axiosInterceptors;
}

function ejectAxiosInterceptors (){
  let axiosInterceptors = JSON.parse(sessionStorage.getItem('axiosInterceptors')) || 0;
  for(let i=0; i<= axiosInterceptors; i++){
    axios.interceptors.request.eject(i);
  }
  sessionStorage.removeItem('axiosInterceptors');
}