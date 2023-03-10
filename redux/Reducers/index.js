import {combineReducers} from 'redux';
import AccountReducer from './AccountReducer';
const Reducer = combineReducers({
    Login : AccountReducer,
})
export default (state, action) => Reducer(state, action)