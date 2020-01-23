import {
	DELETE_REFRESHTOKEN,
	DELETE_REFRESHTOKEN_FAIL,
	DELETE_REFRESHTOKEN_SUCCESS,
	LOAD_REFRESHTOKENS,
	LOAD_REFRESHTOKENS_FAIL,
	LOAD_REFRESHTOKENS_SUCCESS
} from './refreshtoken.actions';

import { put, takeLatest, all, call } from 'redux-saga/effects';
import { httpService } from 'midgard/modules/http/http.service';

import { environment } from 'environment';
import { NotificationManager } from 'react-notifications';

const endpoint = `${environment.API_URL}oauth/refreshtokens/`;

function* loadAccessTokens() {
	try {
		const res = yield call(httpService.makeRequest, 'get', endpoint);
		yield [
			yield put({ type: LOAD_REFRESHTOKENS_SUCCESS, data: res.data })
		]
	} catch (error) {
		yield put({ type: LOAD_REFRESHTOKENS_FAIL, error });
	}
}

function* deleteAccessToken(action) {
	try {
		yield call(httpService.makeRequest, 'delete', `${endpoint}${action.data.id}/`, {}, true);
		yield [
			yield put({ type: DELETE_REFRESHTOKEN_SUCCESS, data: action.data })
		];
		NotificationManager.success('Refresh token deleted', 'Success');
	} catch (error) {
		yield put({ type: DELETE_REFRESHTOKEN_FAIL, error })
	}
}

function* watchLoadRefreshTokens() {
	yield takeLatest(LOAD_REFRESHTOKENS, loadAccessTokens)
}

function* watchDeleteRefreshToken() {
	yield takeLatest(DELETE_REFRESHTOKEN, deleteAccessToken);
}

export default function* refreshTokenSaga() {
	yield all([
		watchLoadRefreshTokens(),
		watchDeleteRefreshToken()
	]);
}
