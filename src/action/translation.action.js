import { translationConstants } from '../constants/index';

export const translationActions = {
    changeDisplayLanguage
};

function changeDisplayLanguage(language) {
    return { type: translationConstants.CHANGE_DISPLAY_LANGUAGE, payload:language };
}