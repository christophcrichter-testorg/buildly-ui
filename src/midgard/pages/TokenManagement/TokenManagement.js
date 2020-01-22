import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { colors } from 'colors';
import { rem } from 'polished';
import { FjContentSwitcher } from '@buildlyio/freyja-react';
import AccessTokens from 'midgard/pages/TokenManagement/AccessTokens/AccessTokens';
import RefreshTokens from 'midgard/pages/TokenManagement/RefreshTokens/RefreshTokens';

const TokenManagementWrapper = styled.div`
	width: 100%;
	display: flex;
	flex: 1;
	background-color: ${colors.baseLighter};
	
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

const TokenManagement = ({ history, location }) => {
	const subNav = [
		{ label: 'Access tokens', value: 'access-tokens' },
		{ label: 'Refresh tokens', value: 'refresh-tokens' },
	];
	const pathName = '/app/admin/tokens';
	const childPath = location.pathname.includes('refresh-tokens') ? 'refresh-tokens' : 'access-tokens';
	const viewState = useState(childPath);
	const [view, setView] = viewState;

	useEffect(() => {
		history.push(`${pathName}/${view || location.state}`)
	}, [view]);

	return (
		<TokenManagementWrapper>
			<div className="tokens__container">
				<div className="tokens__header">
					<h3 className="tokens__header">Manage authentication tokens</h3>
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
		</TokenManagementWrapper>
	);
};
const mapStateToProps = (state, ownProps) => ({ ...ownProps, ...state })
export default connect(mapStateToProps)(TokenManagement);
