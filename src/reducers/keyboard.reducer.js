import {keyboardConstants} from '../constants/index';

const initialState={
    isFocused:false
}

export const keyboardReducer=(state = initialState, action)=>{

    switch(action.type){
        case keyboardConstants.TEXTBOX_ON_FOCUS:
            return{
                isFocused:true  
            };
        case keyboardConstants.TEXTBOX_ON_BLUR:
            return{
                isFocused:false  
            };
        default:
            return state;
    }
}