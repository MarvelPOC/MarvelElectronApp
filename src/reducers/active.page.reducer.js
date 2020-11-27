import {activePageConstants} from '../constants/index';

const initialState={
    pageId:activePageConstants.LANDING_PAGE
}

export const activePageReducer=(state = initialState, action)=>{

    switch(action.type){
        case activePageConstants.SET_PAGE:
            return{
                pageId:action.payload  
            };
        default:
            return state;
    }
}
