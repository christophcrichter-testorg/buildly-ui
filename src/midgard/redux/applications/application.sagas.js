import { put, takeLatest, all, call } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { httpService } from 'midgard/modules/http/http.service';
import { environment } from 'environment';

import {
	CREATE_APPLICATION,
	CREATE_APPLICATION_SUCCESS,
	CREATE_APPLICATION_FAIL,
	LOAD_APPLICATIONS,
	LOAD_APPLICATIONS_SUCCESS,
	LOAD_APPLICATIONS_FAIL, DELETE_APPLICATION, DELETE_APPLICATION_SUCCESS, DELETE_APPLICATION_FAIL
} from './application.action';

const endpoint = `${environment.API_URL}oauth/applications/`;

function* createApplication(action) {
	try {
		const res = yield call(httpService.makeRequest, 'post', endpoint, action.data);
		yield [
			yield put({ type: CREATE_APPLICATION_SUCCESS, data: res.data }),
		];
		NotificationManager.success('Application created successfully', 'Success');
	} catch (error) {
		yield put({ type: CREATE_APPLICATION_FAIL, error });
		NotificationManager.error(error.message, 'Error');
	}
}

function* loadApplications() {
	try {
		const res = yield call(httpService.makeRequest, 'get', endpoint);
		yield [
			yield put({ type: LOAD_APPLICATIONS_SUCCESS, data: res.data }),
		];
	} catch (error) {
		yield put({ type: LOAD_APPLICATIONS_FAIL, error: error });
	}
}

function* deleteApplication(action) {
	try {
		yield call(httpService.makeRequest, 'delete', `${endpoint}${action.data.id}`);
		yield [
			yield put({ type: DELETE_APPLICATION_SUCCESS, data: action.data }),
		];
		NotificationManager.success('Application deleted successfully', 'Success');
	} catch (error) {
		yield put({ type: DELETE_APPLICATION_FAIL, error });
		NotificationManager.error(error.message, 'Error');
	}
}

function* watchCreateApplication() {
	yield takeLatest(CREATE_APPLICATION, createApplication);
}

function* watchLoadApplications() {
	yield takeLatest(LOAD_APPLICATIONS, loadApplications);
}

function* watchDeleteApplication() {
	yield takeLatest(DELETE_APPLICATION, deleteApplication);
}

export default function* applicationSaga() {
	yield all([
		watchLoadApplications(),
		watchCreateApplication(),
		watchDeleteApplication(),
	]);
}
