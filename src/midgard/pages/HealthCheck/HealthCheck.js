import React, { useEffect, useState } from 'react';
import { rem } from 'polished'
import { colors } from 'colors';
import styled from 'styled-components';
import { FjTable } from '@buildlyio/freyja-react';
import Status from 'midgard/components/Status/Status';
import { loadHealthStatus } from 'midgard/redux/health-status/actions/health-status.actions';
import { connect } from 'react-redux';

const HealthCheckWrapper = styled.div`
	height: 100%;
	display: flex;
	flex: 1;
	background-color: ${colors.baseLighter};
	
	.health-check {
		&__container {
			display: flex;
			flex-direction: column;
			flex: 1;
			align-items: flex-start;
			margin: 0 ${rem(24)};
		}
		
		&__header {
			display: flex;
			align-items: center;
			margin-bottom: ${rem(30)};
			padding-right: ${rem(12)};
		}
		
		&__statuses {
			width: 100%;
			
		}
	}
`;

function HealthCheck({ location, history, data, dispatch }) {
	const [healthStatusLoaded, setHealthStatusLoaded] = useState(false);

	useEffect(() => {
		history.push('/app/admin/health-check');

		if (!healthStatusLoaded) {
			dispatch(loadHealthStatus());
			setHealthStatusLoaded(true);
		}
	}, [data]);

	let serviceStatuses = [];
	if(data) {
		const services = Object.keys(data);
		serviceStatuses = services.map((service, index) => {
			return {
				id: index,
				service,
				status: data[service],
			}
		});
	}

	return (
		<HealthCheckWrapper className="health-check">
			<div className="health-check__container">
				<h3 className="health-check__header">
					System health check
				</h3>
				<div className="health-check__statuses">
					<FjTable
						columns={[
							{ label: 'Service', prop: 'service', flex: '1' },
							{ label: 'Status', prop: 'status', flex: '1', template: (row) => <Status working={row.status === "working"}/> },
						]}
						rows={serviceStatuses}
					/>
				</div>
			</div>
		</HealthCheckWrapper>
	);
}

const mapStateToProps = (state, ownProps) => ({...state.healthStatusReducer, ...ownProps});

export default connect(mapStateToProps)(HealthCheck);
