import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import candies from './candies';
import singleCandy from './singleCandy';
import cart from './cart'
import candyOrders from './candyOrders';

const reducer = combineReducers({ auth, candies, singleCandy, cart, candyOrders });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
