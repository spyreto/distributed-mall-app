import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import userPosition from './userPosition';

export default combineReducers({ userPosition, auth, products });
