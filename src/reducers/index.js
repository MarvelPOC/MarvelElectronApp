import { combineReducers } from 'redux';
import { keyboardReducer } from './keyboard.reducer';
import { airportSearchReducer } from './airport.search.reducer';
import { searchHistoryReducer } from './search.history.reducer';
import { initReducer } from './init.reducer';
import { vacancySearchReducer } from './vacancy.search.reducer';
import { translationReducer } from './translation.reducer';
import { activePageReducer } from './active.page.reducer'
import {loginReducer} from './login.reducer'

const rootReducer = combineReducers({
    keyboardReducer,
    airportSearchReducer,
    searchHistoryReducer,
    initReducer,
    vacancySearchReducer,
    translationReducer,
    activePageReducer,  
    login:loginReducer
  });
  
  export default rootReducer;
