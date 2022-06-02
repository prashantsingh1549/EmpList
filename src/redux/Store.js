import {combineReducers, createStore} from 'redux';
import EmpReducer from './Reducer/EmpReducer';
const rootReducer = combineReducers({
  EmpReducer: EmpReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
