import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteRefreshToken, loadRefreshTokens } from 'midgard/redux/refreshtoken/refreshtoken.actions';
import { FjTable, FjMenu, FjButton } from '@buildlyio/freyja-react';
import { NotificationContainer } from 'react-notifications';

const RefreshTokensWrapper = styled.div`
	width: 100%;
	
	.refresh-tokens {
		&__token {
			white-space: nowrap;
  		overflow: hidden;
  		text-overflow: ellipsis;
		}
	}
`;

const refreshTokenActions = [
	{ label: 'Delete', value: 'delete' },
];

const formatDate = (dateString) => {
	const revoked = new Date(dateString) || '';
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(revoked);
};

function RefreshTokens({ data, dispatch, loaded, loading }) {
	const [refreshTokens, setRefreshTokens] = useState([]);
	const [menuState, setMenuState] = useState({ opened: false, id: '' });

	useEffect(() => {
		if (!loading && !loaded) {
			dispatch(loadRefreshTokens());
		}

		if(data) {
			setRefreshTokens(data);
		}
	}, [data, loading, loaded]);

	const actionsTemplate = (row) => {
		return <FjMenu
			menuItems={refreshTokenActions}
			xPosition="right"
			yPosition="down"
			open={menuState.id === row.id ? menuState.opened : null}
			setOpen={() => setMenuState({ opened: !menuState.opened, id: row.id })}
			onActionClicked={(action) => {
				if (action === 'delete') {
					dispatch(deleteRefreshToken(row));
				}
			}}
		>
			<FjButton
				variant="secondary"
				size="small"
				onClick={() => setMenuState({ opened: !menuState.opened, id: row.id })}>
				•••
			</FjButton>
		</FjMenu>
	};


	return (
		<RefreshTokensWrapper className="access-tokens">
			<FjTable
				columns={[
					{
						label: 'User',
						prop: '',
						flex: '1.5',
						template: (row) => <b>{row.user.first_name} {row.user.last_name}</b>
					},
					{
						label: 'Token', prop: 'token', flex: '2.5', template: (row) => {
							return <span className="refresh-tokens__token">{row.token}</span>
						}
					},
					{
						label: 'Access token', prop: 'access_token', flex: '2.5', template: (row) => {
							return <span className="refresh-tokens__token">
								{row.access_token && row.access_token.token ? row.access_token.token : '-'}
							</span>
						}
					},
					{
						label: 'Revoked',
						prop: 'revoked',
						flex: '1.5',
						template: (row) => row.revoked ? formatDate(row.revoked) : '-'
					},
					{ label: 'Actions', prop: 'options', template: (row) => actionsTemplate(row), flex: '1' },
				]}
				rows={refreshTokens}
			/>
			<NotificationContainer/>
		</RefreshTokensWrapper>
	);
}


const mapStateToProps = (state, ownProps) => ({ ...state.refreshTokenReducer, ...ownProps });

export default connect(mapStateToProps)(RefreshTokens);
