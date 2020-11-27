import { airportSearchConstants } from '../constants';
import { airportSearchService } from '../service';

export const airportSearchActions= {
    getAirportInfo,
    getByRegion,
    getByCountry,
    getByOtherCountry,
    searchForAirports,
    autoLabelAirport,
    getAirports,
    clearErrors,
};

function getAirportInfo(){
    return dispatch => {
        dispatch(request());      
        airportSearchService.getAirportInfo()
            .then(
                flightInfo => dispatch(success(flightInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: airportSearchConstants.GET_AIRPORT_INFO_REQUEST } }
    function success(flightInfo) { return { type: airportSearchConstants.GET_AIRPORT_INFO_SUCCESS, payload: flightInfo } }
    function failure(error) { return { type: airportSearchConstants.GET_AIRPORT_INFO_FAIL, payload: error } }
}

function getByRegion(value) {
    return { type: airportSearchConstants.GET_COUNTRY_DATA_REQUEST, payload: value }
}

function getByCountry(value) {
    return { type: airportSearchConstants.GET_AIRPORT_DATA_REQUEST, payload: value }
}

function getByOtherCountry(value) {
    return { type: airportSearchConstants.GET_OTHER_COUNTRY_DATA_REQUEST, payload: value }
}

function autoLabelAirport(value) { 
    return { type: airportSearchConstants.AUTO_LABEL_AIRPORT_REQUEST, payload: value } 
}

function searchForAirports(searchInfo){
    return dispatch => {
        dispatch(request(searchInfo));      
        airportSearchService.searchForAirport(searchInfo)
            .then(
                airportInfo => dispatch(success(airportInfo)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: airportSearchConstants.SEARCH_FOR_AIRPORTS_REQUEST } }
    function success(airportInfo) { return { type: airportSearchConstants.SEARCH_FOR_AIRPORTS_SUCCESS, payload: airportInfo } }
    function failure(error) { return { type: airportSearchConstants.SEARCH_FOR_AIRPORTS_FAIL, payload: error } }
}

function getAirports(codeList){
    return dispatch => {
        airportSearchService.getAirportsForCodeList(codeList)
            .then(
                airportList => dispatch(success(airportList))
            );
    };
    function success(airportList) { return { type: airportSearchConstants.SEARCH_FOR_AIRPORTLIST_SUCCESS, payload: airportList } }
}
function clearErrors() { 
    return { type: airportSearchConstants.CLEAR_AIRPORT_ERROR } 
}