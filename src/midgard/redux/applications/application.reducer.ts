import {
	CREATE_APPLICATION,
	CREATE_APPLICATION_SUCCESS,
	CREATE_APPLICATION_FAIL,
	LOAD_APPLICATIONS,
	LOAD_APPLICATIONS_SUCCESS,
	LOAD_APPLICATIONS_FAIL, DELETE_APPLICATION, DELETE_APPLICATION_SUCCESS
} from './application.action';
import { addAll, deleteOne, upsertOne } from '../reducer.utils';
import { Application } from './application.model';

export interface CoreUserState {
	data: Application[];
	loading: boolean
	loaded: boolean;
	creating: boolean;
	created: boolean;
	updating: boolean;
	updated: boolean;
	deleting: boolean;
	deleted: boolean;
}

const initialState: CoreUserState = {
	data: [],
	loading: false,
	loaded: false,
	creating: false,
	created: false,
	updating: false,
	updated: false,
	deleting: false,
	deleted: false
};

export default function applicationReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_APPLICATION:
			return {
				...state,
				creating: true,
			};
		case CREATE_APPLICATION_SUCCESS: {
			const _state = upsertOne(state, action, 'id');
			return {
				..._state,
				creating: false,
				created: true
			};
		}
		case CREATE_APPLICATION_FAIL:
			return {
				...state,
				creating: false,
				created: false
			};
		case LOAD_APPLICATIONS: {
			return {
				...state,
				loading: true
			};
		}
		case LOAD_APPLICATIONS_SUCCESS: {
			const _state = addAll(state, action);
			return {
				..._state,
				loading: false,
			};
		}
		case LOAD_APPLICATIONS_FAIL: {
			return {
				...state,
				loading: false,
				loaded: false
			};
		}

		case DELETE_APPLICATION: {
			return {
				...state,
				deleting: true
			}
		}
		case DELETE_APPLICATION_SUCCESS: {
			const _state = deleteOne(state, action, 'id');
			return {
				..._state,
				deleting: false,
				deleted: true
			}
		}
		default:
			return state;
	}
}
