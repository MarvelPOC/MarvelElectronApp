import { airportSearchConstants } from '../constants/index';

const InitialState = {
    loading: false,
    regionInfo:[],
    displayCountries: [],
    countryData:[],
    airportList:[],
    airportData:[],
    airportLabel:'',
    error:[]
}

export const airportSearchReducer=(state = InitialState, action)=>{

    switch(action.type){
        case airportSearchConstants.GET_AIRPORT_INFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case airportSearchConstants.GET_AIRPORT_INFO_SUCCESS:
            return {
                ...state,
                regionInfo: action.payload.regionInfo || [],
                displayCountries: action.payload.displayCountries || [],
                countryData: action.payload.countryData || [],
                airportList: action.payload.airportList || [],
                airportData: action.payload.airportData || [],
            };
        case airportSearchConstants.GET_AIRPORT_INFO_FAIL:
            return { 
                ...state,
                error: action.payload
            };
        case airportSearchConstants.GET_COUNTRY_DATA_REQUEST:
            return {
                ...state,
                countryData:state.regionInfo.filter(region=>
                    action.payload === region.mapKey
                )[0].displayCountry
            };
        case airportSearchConstants.GET_OTHER_COUNTRY_DATA_REQUEST:
            return {
                ...state,
                countryData:state.regionInfo.filter(region=>
                    action.payload === region.mapKey
                )[0].otherCountry
            };
        case airportSearchConstants.GET_AIRPORT_DATA_REQUEST:
            return {
                ...state,
                airportData: getAirports(state.displayCountries, state.airportList, action.payload)
            };
        case airportSearchConstants.SEARCH_FOR_AIRPORTS_REQUEST:
            return {
                ...state,
                loading:true
            };
        case airportSearchConstants.SEARCH_FOR_AIRPORTS_SUCCESS:
            return {
                ...state,
                error:[],
                countryData: action.payload
            };
        case airportSearchConstants.SEARCH_FOR_AIRPORTS_FAIL:
            return {
                ...state,
                error: action.payload,
                countryData: []
            };
        case airportSearchConstants.AUTO_LABEL_AIRPORT_REQUEST:
            return {
                ...state,
                airportLabel: searchAirportByInput(state.airportList, action.payload)
            };
        case airportSearchConstants.SEARCH_FOR_AIRPORTLIST_SUCCESS:
            return {
                ...state,
                airportList: action.payload
            };
        case airportSearchConstants.CLEAR_AIRPORT_ERROR:
            return {
                ...state,
                error:[]
            };
        default:
            return state;
    }

    function getAirports(countryData, airportList, value){
        if(value === 'all'){
            return groupAirportData(airportList);
        } else{
            return countryData.filter(country=>
                value === country.threeDigitCode
            )[0].airport.sort((a, b)=>{
                    let x = a.enName.toUpperCase(),
                        y = b.enName.toUpperCase();
                    return x === y ? 0 : x > y ? 1 : -1;
                });
        }
    }

    function searchAirportByInput(airportData, inputName){
        let airportName= '';
        let langSel = localStorage.getItem('i18nextLng') || 'en';
        let countryArray=airportData.filter(({threeDigitCode}) => threeDigitCode === inputName);
        if( typeof countryArray != "undefined" && countryArray.length > 0 && countryArray != null ){
            if(countryArray.length > 1){
                countryArray = countryArray.filter(({enName})=> enName === 'Dummy');
            }

            if(langSel === 'en'){
                airportName= countryArray[0].enName;
            } else{
                airportName= countryArray[0].jpName;
            }          
        }
        return airportName;
    }

    function groupAirportData(airportList){
          let groupAirports = airportList.reduce((groupAirport, e) => {
            let group = e.enName[0];
            if(!groupAirport[group]) {
                groupAirport[group] = {group, airport: [e]}
            }else {
                groupAirport[group].airport.push(e);
            }
            return groupAirport;
          }, {})
          return Object.values(groupAirports);
    }
}
