import {
	LOAD_HEALTH_STATUS,
	LOAD_HEALTH_STATUS_SUCCESS,
	LOAD_HEALTH_STATUS_FAIL
} from '../actions/health-status.actions';

const initialState = {
	loading: false,
	loaded: false,
	data: null,
	error: null
};

// Reducer
export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_HEALTH_STATUS:
			return {
				...state,
				loading: true,
				loaded: true,
				error: null
			};

		case LOAD_HEALTH_STATUS_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.statuses
			};

		case LOAD_HEALTH_STATUS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			};

		default:
			return state;
	}
}
