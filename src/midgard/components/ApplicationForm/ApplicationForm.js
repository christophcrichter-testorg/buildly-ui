import { FormWrapper, FieldRow, FieldWrapper, ActionWrapper } from 'midgard/components/FormUtils/FormUtils';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { rem } from 'polished';
import { FjButton, FjInputField } from '@buildlyio/freyja-react';

import FjSelect from 'midgard/components/Select/Select';
import { useInput } from 'midgard/hooks/useInput';

const ApplicationFormWrapper = styled.div`
	width: ${rem(460)};
`;

const Header = styled.h4`
	margin-top: ${rem(12)};
	margin-bottom: ${rem(0)};
	text-align: center;
`;

const clientTypeOptions = [
	{ label: 'Confidential', value: 'confidential' },
	{ label: 'Public', value: 'public' },
];

const authGrantType = [
	{ label: 'Authorization code', value: 'authorization-code' },
	{ label: 'Implicit', value: 'implicit' },
	{ label: 'Password', value: 'password' },
	{ label: 'Client credentials', value: 'client-credentials' },
];

function ApplicationForm({ action, closeModal }) {
	const name = useInput('', { required: true });
	const client_type = useInput('', { required: true });
	const authorization_grant_type = useInput('', { required: true });
	const redirect_uris = useInput('', );

	const handleSubmit = (event) => {
		event.preventDefault();
		const application = {
			name: name.value,
			client_type: client_type.value,
			authorization_grant_type: authorization_grant_type.value,
			redirect_uris: redirect_uris.value
		};

		action(application);
		// Reset form controls
		reset();
		// Close modal
		if (closeModal) {
			closeModal()
		}
	};

	const reset = () => {
		[
			name,
			client_type,
			authorization_grant_type,
			redirect_uris
		].forEach(input => input.reset());
	};

	return (
		<ApplicationFormWrapper>
			<Header>New application</Header>
			<FormWrapper onSubmit={handleSubmit}>
				<FieldWrapper>
					<FjInputField
						id="name"
						label="Application name"
						type="text"
						placeholder="Enter name"
						required={true}
						{...name.bind}
					/>
				</FieldWrapper>
				<FieldWrapper>
					<FjSelect
						label="Client type"
						placeholder="Select client type"
						options={clientTypeOptions}
						required={true}
						{...client_type.bind}
					/>
				</FieldWrapper>
				<FieldWrapper>
					<FjSelect
						label="Authorization grant type"
						options={authGrantType}
						required={true}
						{...authorization_grant_type.bind}
					/>
				</FieldWrapper>
				<FieldWrapper>
					<FjInputField
						id="name"
						label="Redirect URIs"
						type="text"
						placeholder="Space separated redirect URIs"
						{...redirect_uris.bind}
					/>
				</FieldWrapper>
				<FieldRow>
					<ActionWrapper right={false}>
						<FjButton
							size="small"
							type="submit"
							disabled={!(name.valid && client_type.valid && authorization_grant_type.valid)}
						>
							Save
						</FjButton>
					</ActionWrapper>
				</FieldRow>
			</FormWrapper>
		</ApplicationFormWrapper>
	);
}

export default connect()(ApplicationForm);
