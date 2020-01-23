import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteAccessToken, loadAccessTokens } from 'midgard/redux/accesstoken/accesstoken.actions';
import { FjTable, FjMenu, FjButton } from '@buildlyio/freyja-react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const AccessTokensWrapper = styled.div`
	width: 100%;
	
	.access-tokens {
		&__token {
			white-space: nowrap;
  		overflow: hidden;
  		text-overflow: ellipsis;
		}
	}
`;

const accessTokenActions = [
	{ label: 'Delete', value: 'delete' },
];

const formatDate = (dateString) => {
	const expires = new Date(dateString) || '';
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(expires);
};

function AccessTokens({ data, dispatch ,deleted }) {
	const [menuState, setMenuState] = useState({ opened: false, id: '' });
	const [accessTokensLoaded, setAccessTokensLoaded] = useState(false);

	useEffect(() => {
		if (!accessTokensLoaded) {
			dispatch(loadAccessTokens());
			setAccessTokensLoaded(true);
		}

		if (deleted) {
			NotificationManager.success('Access token deleted', 'Success');
		}
	}, [data]);

	let accessTokens = [];
	if (data) {
		accessTokens = data.sort((accessToken, accessToken1) => {
			return new Date(accessToken1.expires).getTime() - new Date(accessToken.expires).getTime();
		});
	}

	const actionsTemplate = (row) => {
		return <FjMenu
			menuItems={accessTokenActions}
			xPosition="right"
			yPosition="down"
			open={menuState.id === row.id ? menuState.opened : null}
			setOpen={() => setMenuState({ opened: !menuState.opened, id: row.id })}
			onActionClicked={(action) => {
				if (action === 'delete') {
					dispatch(deleteAccessToken(row));
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
		<AccessTokensWrapper className="access-tokens">
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
							return <span className="access-tokens__token">{row.token}</span>
						}
					},
					{
						label: 'Email', prop: 'email', flex: '2', template: (row) => {
							return <span> {row.user.email} </span>
						}
					},
					{
						label: 'Expires', prop: 'expires', flex: '1.5', template: (row) => formatDate(row.expires)
					},
					{ label: 'Actions', prop: 'options', template: (row) => actionsTemplate(row), flex: '1' },
				]}
				rows={accessTokens}
			/>
			<NotificationContainer/>
		</AccessTokensWrapper>
	);
}


const mapStateToProps = (state, ownProps) => ({ ...state.accessTokenReducer, ...ownProps });

export default connect(mapStateToProps)(AccessTokens);
