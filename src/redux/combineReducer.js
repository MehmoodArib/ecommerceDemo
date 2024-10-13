import {combineReducers} from 'redux';
import HomeReducer from '../services/Home/reducer';
import {CartReducer} from '../services/Cart/reducer';

const combineReducer = combineReducers({
  home: HomeReducer,
  cart: CartReducer,
});

export default combineReducer;
