import React, { useEffect } from 'react';
import { connect } from 'react-redux';


const RefreshTokens = ({ history}) => {
	return (
		<div>
			TODO: Implement Refresh tokens view
		</div>
	);
}

const mapStateToProps = (state, ownProps) => ({ ...ownProps, ...state.accessTokenReducer });
export default connect(mapStateToProps)(RefreshTokens)
