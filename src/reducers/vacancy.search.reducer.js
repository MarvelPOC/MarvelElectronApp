import { vacancySearchConstants } from '../constants';

const InitialState = {
    loading: false,
    searchRequest:{},
    searchResponse:{},
    error:[]
}

export const vacancySearchReducer=(state = InitialState, action)=>{

    switch(action.type){
        case vacancySearchConstants.VACANCY_SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                searchRequest: action.payload
            };
        case vacancySearchConstants.VACANCY_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error:[],
                searchResponse: action.payload
            };
        case vacancySearchConstants.VACANCY_SEARCH__FAIL:
            return { 
                ...state,
                error: action.error,
                loading: false,
                searchResponse:[]
            };
        case vacancySearchConstants.VACANCY_PROPS_CLEAR:
            return { 
                ...state,
                loading: false,
                searchRequest:{},
                searchResponse:{},
                error:[]
            };
        default:
            return state;
    }
}
