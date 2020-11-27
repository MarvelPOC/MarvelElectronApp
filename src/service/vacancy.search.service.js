import axios from 'axios';
import { errorConstants } from '../constants';

export const vacancySearchService = {
    vacancySearchRequest,
};

function vacancySearchRequest(searchCriteria){
    
    setHistory(searchCriteria);
    
    if(validateAirportInput(searchCriteria)){
        let searchInput = {}
        if(searchCriteria.isFlightNumSearch){
             searchInput = {
                depCode:"",
                arvCode:"",
                depDate:searchCriteria.depDate,
                depTime:"",
                bookSeats:searchCriteria.bookSeats,
                targetMaxSegmentCount:'1000',
                transitFareOption:true,
                reverseSectionDefFlg:true,
                fltNbr:searchCriteria.fltNbr,
                formatNo:1,
                cOption:true
            }
        } else {
             searchInput = {
                depCode:searchCriteria.depCode,
                arvCode:searchCriteria.arvCode,
                depDate:searchCriteria.depDate,
                depTime:searchCriteria.depTime,
                bookSeats:searchCriteria.bookSeats,
                targetMaxSegmentCount:'1000',
                transitFareOption:true,
                reverseSectionDefFlg:true,
                fltNbr:"",
                formatNo:1,
                cOption:true
            }
        }
 
        /** Change Post to Get to use dummy data and remove searchCriteria from the request*/
        return axios.post(process.env.REACT_APP_AVAILABILITY_SERACH_REQUEST, searchInput).then((res)=>{
            if(res.data.length){
                return res.data;
            }else{
                let error = [errorConstants.E212100024];
                return Promise.reject(error);
            }
        }).catch((err)=>{
            return Promise.reject([err.response.data.message]);
        });
    } else{
        let error = [errorConstants.E212100030];
        return Promise.reject(error);
    } 
}

function setHistory(searchCriteria){
    if (!searchCriteria.resultPageFlag){
        let history = JSON.parse(localStorage.getItem('history')) || [];
        history.unshift(searchCriteria);
        localStorage.setItem('history', JSON.stringify(history));
    }
    localStorage.setItem('latestSearchCriteria', JSON.stringify(searchCriteria));
}

//Validate Airport codes
function validateAirportInput(searchCriteria){
    if(!searchCriteria.isFlightNumSearch){
        let depCode = searchCriteria.depCode;
        let arvCode = searchCriteria.arvCode;
        let airportInfo = JSON.parse(localStorage.getItem("airportInfo")) || [];
        let depArray=airportInfo.airportList.filter(({threeDigitCode, multiArptCode}) => threeDigitCode === depCode || multiArptCode === depCode);
        let arrArray=airportInfo.airportList.filter(({threeDigitCode, multiArptCode}) => threeDigitCode === arvCode || multiArptCode === arvCode);
        if( typeof depArray != "undefined" && typeof arrArray != "undefined" && depArray.length >= 1 && arrArray.length >= 1 && depArray != null && arrArray !== null){
            return true;
        }
        return false;
    } else{
        return true;
    }
}
