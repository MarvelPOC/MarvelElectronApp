import { initConstants } from '../constants/index';

const InitialState = {
    loading: false,
    error:''
}

export const initReducer=(state = InitialState, action)=>{
    switch(action.type){
        case initConstants.GET_INIT_AIRPORT_DATA:
            return {
                ...state,
                loading: true
            };
        case initConstants.GET_INIT_AIRPORT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case initConstants.GET_INIT_AIRPORT_FAIL:
            return { 
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
        }
}