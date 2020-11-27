import { translationConstants } from '../constants/index';

const InitialState = {
    selectedLanguage:'en'
}

export const translationReducer=(state = InitialState, action)=>{
    switch(action.type){
        case translationConstants.CHANGE_DISPLAY_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.payload
            };
        default:
            return state;
        }
}