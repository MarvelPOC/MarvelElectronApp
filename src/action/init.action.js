import { initConstants } from '../constants';
import { initService } from '../service';

export const initActions= {
    getAllAirportInfo,
};

function getAllAirportInfo(value) {
    return dispatch => {
        dispatch(request(value));
        initService.getAllAirportInfo(value)
            .then(
                flightInfo => { 
                    dispatch(success(flightInfo));
                },
                error => {
                    dispatch(failure(value, error));
                }
            );
    };

    function request() { return { type: initConstants.GET_INIT_AIRPORT_DATA } }
    function success(flightInfo) { return { type: initConstants.GET_INIT_AIRPORT_SUCCESS, payload: flightInfo } }
    function failure(error) { return { type: initConstants.GET_INIT_AIRPORT_FAIL, payload: error } }
}