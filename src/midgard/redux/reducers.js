// react library imports
import { combineReducers } from 'redux';
import authReducer from './authuser/reducers/authuser.reducer';
import coreuserReducer from './coreuser/coreuser.reducer';
import coreGroupReducer from './coregroup/reducers/coregroup.reducer';
import crudDataReducer from 'midgard/modules/crud/redux/crud.reducer';
import logicModuleReducer from './logicmodule/logicmodule.reducer';
import healthStatusReducer from './health-status/reducers/health-status.reducer'

const rootReducer = combineReducers(
  {
    //entryPointForGulpStart
    //entryPointForGulpEnd
    authReducer,
    coreuserReducer,
    coreGroupReducer,
    crudDataReducer,
    logicModuleReducer,
    healthStatusReducer,
  }
);

export default rootReducer;
