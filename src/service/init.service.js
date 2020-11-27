import axios from 'axios';
import { errorConstants } from '../constants/index';

export const initService = {
    getAllAirportInfo
};

function getAllAirportInfo(){
    return axios.get(process.env.REACT_APP_INIT_LOAD_REQUEST).then((res)=>{
        const airportInfo = res.data;
        localStorage.setItem('airportInfo', JSON.stringify(airportInfo));
        return airportInfo;
     }).catch((err)=>{
        return Promise.reject(errorConstants.E212400097);
    });
}