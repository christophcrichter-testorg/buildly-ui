import {
	LOAD_HEALTH_STATUS,
	LOAD_HEALTH_STATUS_SUCCESS,
	LOAD_HEALTH_STATUS_FAIL
} from '../actions/health-status.actions';
import { httpService } from 'midgard/modules/http/http.service';
import { environment } from 'environment';
import { put, takeLatest, all, call } from 'redux-saga/effects';

function* loadHealthStatus() {
	try {
		const response = yield call(httpService.makeRequest, 'GET', `${environment.API_URL}health_check/?format=json`);
		yield [
			yield put({ type: LOAD_HEALTH_STATUS_SUCCESS, statuses: response.data })
		];
	} catch (error) {
		yield put({ type: LOAD_HEALTH_STATUS_FAIL, error: 'Getting health status failed' });
	}
}

function* watchLoadHealthStatus() {
	yield takeLatest(LOAD_HEALTH_STATUS, loadHealthStatus)
}

export default function* healthStatusSaga() {
	yield all([
		watchLoadHealthStatus(),
	])
}
