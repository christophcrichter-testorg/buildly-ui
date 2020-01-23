import {
	LOAD_ACCESSTOKENS,
	LOAD_ACCESSTOKENS_SUCCESS,
	LOAD_ACCESSTOKENS_FAIL,
	DELETE_ACCESSTOKEN_SUCCESS,
	DELETE_ACCESSTOKEN_FAIL,
	DELETE_ACCESSTOKEN
} from './accesstoken.actions';

import { put, takeLatest, all, call } from 'redux-saga/effects';
import { httpService } from 'midgard/modules/http/http.service';

import { environment } from 'environment';

const endpoint = `${environment.API_URL}oauth/accesstokens/`;

function* loadAccessTokens() {
	try {
		const res = yield call(httpService.makeRequest, 'get', endpoint);
		yield [
			yield put({ type: LOAD_ACCESSTOKENS_SUCCESS, data: res.data })
		]
	} catch (error) {
		yield put({ type: LOAD_ACCESSTOKENS_FAIL, error });
	}
}

function* deleteAccessToken(action) {
	try {
		yield call(httpService.makeRequest, 'delete', `${endpoint}${action.data.id}/`, {}, true);
		yield [
			yield put({ type: DELETE_ACCESSTOKEN_SUCCESS, data: action.data })
		]
	} catch (error) {
		yield put({ type: DELETE_ACCESSTOKEN_FAIL, error })
	}
}

function* watchLoadAccessTokens() {
	yield takeLatest(LOAD_ACCESSTOKENS, loadAccessTokens)
}

function* watchDeleteAccessToken() {
	yield takeLatest(DELETE_ACCESSTOKEN, deleteAccessToken);
}

export default function* accessTokenSaga() {
	yield all([
		watchLoadAccessTokens(),
		watchDeleteAccessToken()
	]);
}
