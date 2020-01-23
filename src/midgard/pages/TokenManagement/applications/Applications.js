import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { rem } from 'polished'
import { FjTable, FjMenu, FjButton } from '@buildlyio/freyja-react';
import { NotificationContainer } from 'react-notifications';
import { deleteApplication, loadApplications } from 'midgard/redux/applications/application.action';
import copyIcon from 'assets/icon-copy.svg';
import { NotificationManager } from 'react-notifications';

const ApplicationsWrapper = styled.div`
	width: 100%;
	
	.applications {
		&__token {
			display: inline-block;
			width: ${rem(195)};
			white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
		}
		
		&__copy {
			display: inline-block;
			width: ${rem(15)};
			height: ${rem(15)};
			cursor: pointer;
			padding-bottom: ${rem(3)};
		}
	}
`;

const applicationsActions = [
	{ label: 'Delete', value: 'delete' },
];

function Applications({ data, dispatch, loaded, loading }) {
	const [applications, setApplications] = useState([]);
	const [menuState, setMenuState] = useState({ opened: false, id: '' });

	useEffect(() => {
		if (!loading && !loaded) {
			dispatch(loadApplications());
		}

		if (data) {
			setApplications(data);
		}
	}, [data, loading, loaded]);

	const actionsTemplate = (row) => {
		return <FjMenu
			menuItems={applicationsActions}
			xPosition="right"
			yPosition="down"
			open={menuState.id === row.id ? menuState.opened : null}
			setOpen={() => setMenuState({ opened: !menuState.opened, id: row.id })}
			onActionClicked={(action) => {
				if (action === 'delete') {
					dispatch(deleteApplication(row));
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

	const Cell = ({ content }) => (
		<div data-text={content} onClick={copyToClipboard}>
			<span className="applications__token">{content}</span>
			<img className="applications__copy" src={copyIcon} alt="copy"/>
		</div>
	);

	const copyToClipboard = (event) => {
		const text = event.currentTarget.dataset.text;

		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(_ => {
				NotificationManager.info('Copied to clipboard')
			});
		}
	};

	return (
		<ApplicationsWrapper className="applications">
			<FjTable
				columns={[
					{
						label: 'name',
						prop: 'name',
						flex: '0.8',
						template: (row) => {
							return <b>{row.name}</b>
						}
					},
					{
						label: 'Client ID',
						prop: 'client_id', flex: '1',
						template: (row) => <Cell content={row.client_id}/>
					},
					{
						label: 'Client secret',
						prop: 'client_secret',
						flex: '1',
						template: (row) => <Cell content={row.client_secret}/>
					},
					{
						label: 'Grant type',
						prop: 'grant_type',
						flex: '0.8',
						template: (row) => {
							return <span>
								{row.authorization_grant_type ? row.authorization_grant_type : '-'}
							</span>
						}
					},
					{
						label: 'Redirect URIs',
						prop: 'redirect_uris',
						flex: '1',
						template: (row) => {
							return <span className="applications__redirecturi">
								{row.redirect_uris ? row.redirect_uris : '-'}
							</span>
						}
					},
					{
						label: 'Actions',
						prop: 'options',
						flex: '0.3',
						template: (row) => actionsTemplate(row)
					},
				]}
				rows={applications}
			/>
			<NotificationContainer/>
		</ApplicationsWrapper>
	);
}


const mapStateToProps = (state, ownProps) => ({ ...state.applicationReducer, ...ownProps });

export default connect(mapStateToProps)(Applications);
