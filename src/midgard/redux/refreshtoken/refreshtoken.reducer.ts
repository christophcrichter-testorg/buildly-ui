import {
	DELETE_REFRESHTOKEN,
	DELETE_REFRESHTOKEN_FAIL,
	DELETE_REFRESHTOKEN_SUCCESS,
	LOAD_REFRESHTOKENS,
	LOAD_REFRESHTOKENS_FAIL,
	LOAD_REFRESHTOKENS_SUCCESS
} from './refreshtoken.actions';

import { addAll, deleteOne } from '../reducer.utils';
import { RefreshToken } from './refreshtoken.model';

export interface AccessTokenState {
	data: RefreshToken[],
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

export default function refreshTokenReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_REFRESHTOKENS: {
			const _state = addAll(state, action);
			return {
				..._state,
				loading: true
			};
		}

		case LOAD_REFRESHTOKENS_SUCCESS:
			return {
				...state,
				data: action.data,
				loading: false,
				loaded: true
			};

		case LOAD_REFRESHTOKENS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
			};

		case DELETE_REFRESHTOKEN:
			return {
				...state,
				deleting: true,
			};

		case DELETE_REFRESHTOKEN_SUCCESS: {
			const _state = deleteOne(state, action, 'id');
			return {
				..._state,
				deleting: false,
			};
		}

		case DELETE_REFRESHTOKEN_FAIL:
			return {
				...state,
				deleting: false,
				deleted: false
			};

		default:
			return state;
	}
}
