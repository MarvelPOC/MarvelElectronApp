import { searchHistoryConstants } from '../constants';

const InitialState = {
    history:[],
}

export const searchHistoryReducer = (state = InitialState, action)=> {
    switch (action.type) {
      case searchHistoryConstants.GET_HISTORY_REQUEST:
        return {
            history: action.payLoad,
        };
      case searchHistoryConstants.CLEAR_HISTORY_REQUEST:
        return {
            history: []
        };
      default:
        return state
    }
  }