import {keyboardConstants} from '../constants/index';

export const keyboardActions= {
    onFocus,
    onBlur,
};

function onFocus(){
    return {
        type:keyboardConstants.TEXTBOX_ON_FOCUS
    }
}

function onBlur(){
    return {
        type:keyboardConstants.TEXTBOX_ON_BLUR
    }
}