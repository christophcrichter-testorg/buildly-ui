import { LogicModule } from './logicmodule.model';

export const LOAD_DATA_LOGICMODULE = 'LOAD_DATA_LOGICMODULE';
export const LOAD_DATA_LOGICMODULE_COMMIT = 'LOAD_DATA_LOGICMODULE_COMMIT';
export const LOAD_DATA_LOGICMODULE_FAIL = 'LOAD_DATA_LOGICMODULE_FAIL';

export const CREATE_LOGICMODULE = 'CREATE_LOGICMODULE';
export const CREATE_LOGICMODULE_COMMIT = 'CREATE_LOGICMODULE_COMMIT';
export const CREATE_LOGICMODULE_FAIL = 'CREATE_LOGICMODULE_FAIL';

export const UPDATE_LOGICMODULE = 'UPDATE_LOGICMODULE';
export const UPDATE_LOGICMODULE_COMMIT = 'UPDATE_LOGICMODULE_COMMIT';
export const UPDATE_LOGICMODULE_FAIL = 'UPDATE_LOGICMODULE_FAIL';

export const DELETE_LOGICMODULE = 'DELETE_LOGICMODULE';
export const DELETE_LOGICMODULE_COMMIT = 'DELETE_LOGICMODULE_COMMIT';
export const DELETE_LOGICMODULE_FAIL = 'DELETE_LOGICMODULE_FAIL';

export function loadLogicModuleData() {
  return {
    type: LOAD_DATA_LOGICMODULE,
  };
}

export function loadLogicModuleDataCommit(data: LogicModule[]) {
  return {
    type: LOAD_DATA_LOGICMODULE_COMMIT,
    data
  };
}

export function loadLogicModuleDataFail(error) {
  return {
    type: LOAD_DATA_LOGICMODULE_FAIL,
    error
  };
}

export function createLogicModule(data: LogicModule) {
  return {
    type: CREATE_LOGICMODULE,
    data
  };
}

export function createLogicModuleCommit(data: LogicModule) {
  return {
    type: CREATE_LOGICMODULE_COMMIT,
    data
  };
}

export function createLogicModuleFail(error) {
  return {
    type: CREATE_LOGICMODULE_FAIL,
    error
  };
}

export function updateLogicModule(data: LogicModule) {
  return {
    type: UPDATE_LOGICMODULE,
    data
  };
}

export function updateLogicModuleCommit(data: LogicModule) {
  return {
    type: UPDATE_LOGICMODULE_COMMIT,
    data
  };
}

export function updateLogicModuleFail(error) {
  return {
    type: UPDATE_LOGICMODULE_FAIL,
    error
  };
}

export function deleteLogicModule(data: LogicModule) {
  return {
    type: DELETE_LOGICMODULE,
    data
  };
}

export function deleteLogicModuleCommit(data: LogicModule) {
  return {
    type: DELETE_LOGICMODULE_COMMIT,
    data
  };
}

export function deleteLogicModuleFail(error) {
  return {
    type: DELETE_LOGICMODULE_FAIL,
    error
  };
}
