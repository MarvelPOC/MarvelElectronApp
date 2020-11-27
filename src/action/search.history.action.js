import {searchHistoryConstants} from '../constants';

export const searchHistoryActions= {
    getHistory,
    clearHistory
};

function getHistory(){
    let history = JSON.parse(localStorage.getItem('history')) || [];
    return { type: searchHistoryConstants.GET_HISTORY_REQUEST, payLoad: history }
}

function clearHistory(){
    localStorage.removeItem('history');
    let history = [];
    localStorage.setItem('history', JSON.stringify(history));
    return { type: searchHistoryConstants.CLEAR_HISTORY_REQUEST }
}