import {
	LOAD_ACCESSTOKENS,
	LOAD_ACCESSTOKENS_SUCCESS,
	LOAD_ACCESSTOKENS_FAIL
} from './accesstoken.actions';

import { put, takeLatest, all, call } from 'redux-saga/effects';
import { httpService } from 'midgard/modules/http/http.service';

import { environment } from 'environment';

const endpoint = `${environment.API_URL}oauth/accesstoken`;

function* loadAccessTokens() {
	try {
		const res = yield call(httpService.makeRequest, 'get', endpoint);
		yield [
			yield put({ type: LOAD_ACCESSTOKENS_SUCCESS, data: res.data })
		]
	} catch (error) {
			console.log(error);
			yield put({ type: LOAD_ACCESSTOKENS_FAIL, error });
	}
}

function* watchLoadAccessTokens() {
	yield takeLatest(LOAD_ACCESSTOKENS, loadAccessTokens)
}

export default function* accessTokenSaga() {
	yield all([
		watchLoadAccessTokens()
	]);
}
