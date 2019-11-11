import {
  LOAD_DATA_LOGICMODULE,
  LOAD_DATA_LOGICMODULE_COMMIT,
  LOAD_DATA_LOGICMODULE_FAIL,
  CREATE_LOGICMODULE,
  CREATE_LOGICMODULE_COMMIT,
  CREATE_LOGICMODULE_FAIL,
  DELETE_LOGICMODULE,
  DELETE_LOGICMODULE_COMMIT,
  DELETE_LOGICMODULE_FAIL,
  UPDATE_LOGICMODULE,
  UPDATE_LOGICMODULE_COMMIT,
  UPDATE_LOGICMODULE_FAIL,

} from './logicmodule.actions';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import { httpService } from 'midgard/modules/http/http.service';

const endpoint = `${environment.API_URL}logicmodule/`;

import { environment } from 'environment';

function* loadLogicModules() {
    try {
        const res = yield call(httpService.makeRequest, 'get', endpoint);
        yield [
            yield put({ type: LOAD_DATA_LOGICMODULE_COMMIT, data: res.data })
        ];
    } catch(error) {
        yield put({ type: LOAD_DATA_LOGICMODULE_FAIL, error });
    }
}

function* createLogicModule(action) {
  try {
    const res = yield call(httpService.makeRequest, 'post', endpoint, action.data);
    yield [
      yield put({ type: CREATE_LOGICMODULE_COMMIT, data: res.data })
    ];
  } catch(error) {
    yield put({ type: CREATE_LOGICMODULE_FAIL, error });
  }
}

function* updateLogicModule(action) {
  try {
    const res = yield call(httpService.makeRequest, 'patch', `${endpoint}${action.data.id}/`, action.data, true);
    yield [
      yield put({ type: UPDATE_LOGICMODULE_COMMIT, data: res.data})
    ];
  } catch(error) {
    yield put({ type: UPDATE_LOGICMODULE_FAIL, error });
  }
}

function* deleteLogicModule(action) {
  try {
    const res = yield call(httpService.makeRequest, 'delete', `${endpoint}${action.data.id}/`,  {}, true);
    yield [
      yield put({ type: DELETE_LOGICMODULE_COMMIT, data: action.data})
    ];
  } catch(error) {
    yield put({ type: DELETE_LOGICMODULE_FAIL, error });
  }
}

function* watchLoadLogicModules() {
    yield takeLatest(LOAD_DATA_LOGICMODULE, loadLogicModules)
}

function* watchCreateLogicModule() {
  yield takeLatest(CREATE_LOGICMODULE, createLogicModule)
}

function* watchUpdateLogicModule() {
  yield takeLatest(UPDATE_LOGICMODULE, updateLogicModule)
}

function* watchDeleteLogicModule() {
  yield takeLatest(DELETE_LOGICMODULE, deleteLogicModule)
}

export default function* logicModuleSaga() {
  yield all([
    watchLoadLogicModules(),
    watchCreateLogicModule(),
    watchUpdateLogicModule(),
    watchDeleteLogicModule()
  ]);
}
