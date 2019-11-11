import {
  CREATE_LOGICMODULE_COMMIT,
  DELETE_LOGICMODULE_COMMIT,
  LOAD_DATA_LOGICMODULE_COMMIT,
  UPDATE_LOGICMODULE_COMMIT
} from './logicmodule.actions';
import {addAll, deleteOne, upsertOne} from '../reducer.utils';
import {LogicModule} from './logicmodule.model';

export interface LogicModuleState {
  data: LogicModule[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: LogicModuleState = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export default function logicModuleReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_LOGICMODULE_COMMIT:
      return addAll(state, action);
    case CREATE_LOGICMODULE_COMMIT:
      return upsertOne(state, action, 'id');
    case UPDATE_LOGICMODULE_COMMIT:
      return upsertOne(state, action, 'id');
    case DELETE_LOGICMODULE_COMMIT:
      return deleteOne(state, action, 'id');
    default:
      return state;
  }
}