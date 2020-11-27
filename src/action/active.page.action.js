import {activePageConstants} from '../constants/index';

export const activePageActions= {
    setPage
};

function setPage(pageId){
    return { type: activePageConstants.SET_PAGE, payload: pageId }
    
}
