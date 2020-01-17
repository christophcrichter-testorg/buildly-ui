import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';


const StatusWrapper = styled.div`
	width: ${rem(16)};
	height: ${rem(16)};
	border-radius: 50%;
	background-color: ${props => props.working ? '#2fcc66' : '#cc4f2f'};
`;


const Status = (props) => {
	return (
		<StatusWrapper  {...props}/>
	);
};

export default Status;
