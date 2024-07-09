import { authReducer } from './auth-state';
import { combineReducers, createStore } from 'redux';
import { TokenReducer } from './TokenState';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, compose } from 'redux';

const reducers = combineReducers({
  authState: authReducer,
  TokenReducerState: TokenReducer,
  GmailReducerState: GmailReducer,
  DatesReducerState: DatesReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(/* your middleware here */)
    // other store enhancers if any
  )
);
export { store, HttpClient };
