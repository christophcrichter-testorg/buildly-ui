import { AccessToken } from './accesstoken.model';
import { LOAD_ACCESSTOKENS, LOAD_ACCESSTOKENS_FAIL, LOAD_ACCESSTOKENS_SUCCESS } from './accesstoken.actions';

export interface AccessTokenState {
	data: AccessToken[],
	loaded: boolean;
	loading: boolean;
	creating: boolean;
	created: boolean;
	updating: boolean;
	updated: boolean;
	deleting: boolean;
	deleted: boolean;
}

const initialState: AccessTokenState = {
	data: [],
	loaded: false,
	loading: false,
	creating: false,
	created: false,
	updating: false,
	updated: false,
	deleting: false,
	deleted: false,
};

export default function accessTokenReducer(state=initialState, action) {
	switch (action.type) {
		case LOAD_ACCESSTOKENS:
			return {
				...state,
				loading: true
			};

		case LOAD_ACCESSTOKENS_SUCCESS:
			return {
				...state,
				data: action.data,
				loading: false,
				loaded: true
			};

		case LOAD_ACCESSTOKENS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
			};

		default:
			return state;
	}
}
