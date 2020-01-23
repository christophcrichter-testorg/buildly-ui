import React, { useState, useEffect, useRef } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { colors } from 'colors';
import { rem } from 'polished';
import { FjButton, FjContentSwitcher } from '@buildlyio/freyja-react';
import AccessTokens from 'midgard/pages/TokenManagement/AccessTokens/AccessTokens';
import RefreshTokens from 'midgard/pages/TokenManagement/RefreshTokens/RefreshTokens';
import Popup from 'reactjs-popup';
import useWindowDimensions from 'midgard/hooks/useWindowDimensions';
import ApplicationForm from 'midgard/components/ApplicationForm/ApplicationForm';
import { createApplication } from 'midgard/redux/applications/application.action';
import { NotificationContainer } from 'react-notifications';
import Applications from 'midgard/pages/TokenManagement/applications/Applications';

const TokenManagementWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex: 1;
	background-color: ${colors.baseLighter};
	
	.add_app-button {
		border: ${rem(1)} solid ${colors.primary};
    color: ${colors.white};
	}
	
	.tokens {
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
			
			&__name {
				padding-right: ${rem(12)};
			}
		}
		
		&__token {
			white-space: nowrap;
  		overflow: hidden;
  		text-overflow: ellipsis;
		}
	}
	
	.content-switcher {
    margin-top: ${rem(-22)};
    &__container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      border-top: 1px solid #e1e1e1;
      margin-bottom: ${rem(30)};
    }   
  }
`;

const TokenManagement = ({ history, location, dispatch }) => {
	const subNav = [
		{ label: 'Access tokens', value: 'access-tokens' },
		{ label: 'Refresh tokens', value: 'refresh-tokens' },
		{ label: 'Applications', value: 'applications' },
	];
	const pathName = '/app/admin/tokens';
	const childPath = location.pathname.includes('refresh-tokens') ? 'refresh-tokens' : 'access-tokens';
	const viewState = useState(childPath);
	const [view, setView] = viewState;
	const { _, width } = useWindowDimensions();
	const popoverRef = useRef(null);
	const POPOVER_WIDTH = 416;

	useEffect(() => {
		history.push(`${pathName}/${view || location.state}`)
	}, [view]);

	const handleCreate = (application) => {
		dispatch(createApplication(application));
	};

	return (
		<TokenManagementWrapper>
			<div className="tokens__container">
				<div className="tokens__header">
					<h3 className="tokens__header__name">Manage authentication tokens</h3>
					{
						location.pathname.includes('applications') &&
						<Popup
							trigger={<FjButton size="small">Add new Application</FjButton>}
							offsetX={(width / 2) - POPOVER_WIDTH}
							offsetY={70}
							closeOnDocumentClick
							mouseLeaveDelay={300}
							mouseEnterDelay={0}
							contentStyle={{ padding: '0px', border: 'none', width: `{rem(${POPOVER_WIDTH})}` }}
							arrow={false}
							ref={popoverRef}
						>
							{close => <ApplicationForm action={handleCreate} closeModal={close}/>}
						</Popup>
					}
				</div>
				<div className="content-switcher__container">
					<div className="content-switcher">
						<FjContentSwitcher size="small" active={viewState} options={subNav}/>
					</div>
				</div>
				<Route exact path={pathName} render={() => (
					<Redirect to={`${pathName}/access-tokens`}/>
				)}/>
				<Route path={`${pathName}/access-tokens`} component={AccessTokens}/>
				<Route path={`${pathName}/refresh-tokens`} component={RefreshTokens}/>
			</div>
			<NotificationContainer/>
		</TokenManagementWrapper>
	);
};
const mapStateToProps = (state, ownProps) => ({ ...ownProps, ...state })
export default connect(mapStateToProps)(TokenManagement);
