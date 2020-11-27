import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import '../src/assets/css/common.css';
import { store } from '../src/helpers/store';
import MarvelApp from './MarvelApp';

 const App=(props) => {
  return ( 
    <Suspense fallback={<Loader/>}>
      <Provider store={store}>
        <div className="App">
          <MarvelApp/>
          </div>
      </Provider>
    </Suspense>
  );
}
const Loader = () => (
  <div className="App">
    <div></div>
  </div>
);
export default  App;