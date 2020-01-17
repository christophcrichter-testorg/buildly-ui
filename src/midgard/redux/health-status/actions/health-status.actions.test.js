import * as actions from 'midgard/redux/health-status/actions/health-status.actions';

describe('health status actions', () => {
	it('should create an action to login', () => {
		const expectedAction = {
			type: actions.LOAD_HEALTH_STATUS,
		};

		expect(actions.loadHealthStatus()).toEqual(expectedAction);
	})
});
