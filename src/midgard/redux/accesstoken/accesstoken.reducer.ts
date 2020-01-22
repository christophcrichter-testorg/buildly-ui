import { AccessToken } from './accesstoken.model';
import {
	DELETE_ACCESSTOKEN,
	DELETE_ACCESSTOKEN_FAIL,
	DELETE_ACCESSTOKEN_SUCCESS,
	LOAD_ACCESSTOKENS,
	LOAD_ACCESSTOKENS_FAIL,
	LOAD_ACCESSTOKENS_SUCCESS
} from './accesstoken.actions';

import { addAll, deleteOne } from '../reducer.utils';

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

export default function accessTokenReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_ACCESSTOKENS: {
			const _state = addAll(state, action);
			return {
				..._state,
				loading: true
			};
		}

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

		case DELETE_ACCESSTOKEN:
			return {
				...state,
				deleting: true,
			};

		case DELETE_ACCESSTOKEN_SUCCESS: {
			const _state = deleteOne(state, action, 'id');
			return {
				..._state,
				deleting: false,
			};
		}

		case DELETE_ACCESSTOKEN_FAIL:
			return {
				...state,
				deleting: false,
				deleted: false
			};

		default:
			return state;
	}
}
