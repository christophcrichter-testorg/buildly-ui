import React from 'react'
import { connect } from 'react-redux'
import { useInput } from "midgard/hooks/useInput"
import { FjInputField, FjButton} from '@buildlyio/freyja-react'

import { FormWrapper, FieldRow, FieldWrapper, ActionWrapper } from 'midgard/components/FormUtils/FormUtils';

/**
 * Component for user that appears in the sidebar navigation.
 */
export function NewLogicModuleForm({ action }) {
  const name = useInput('', { required: true });
  const description = useInput('');
  const endpoint = useInput('', { required: true });
  const endpoint_name = useInput('', { required: true });
  const docs_endpoint = useInput('');

  /** Handles the submit action */
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = {
      name: name.value,
      description: description.value,
      endpoint: endpoint.value,
      endpoint_name: endpoint_name.value,
      docs_endpoint: docs_endpoint.value,
    };
    action(form);
    reset();
  };

  /** Resets all form fields */
  const reset = () => {
    name.reset();
    description.reset();
    endpoint.reset();
    endpoint_name.reset();
    docs_endpoint.reset();
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FieldWrapper>
      <FjInputField
        label="Logic module name"
        id="name"
        type="text"
        placeholder="Enter name"
        {...name.bind} />
      </FieldWrapper>
      <FieldWrapper>
      <FjInputField
        label="Description"
        id="description"
        type="text"
        placeholder="Enter description"
        {...description.bind} />
      </FieldWrapper>
      <FieldRow>
        <FieldWrapper>
          <FjInputField
            label="Endpoint"
            id="endpoint"
            type="text"
            placeholder="Enter endpoint"
            {...endpoint.bind} />
        </FieldWrapper>
        <FieldWrapper>
          <FjInputField
            label="Endpoint name"
            id="endpoint_name"
            type="text"
            placeholder="Enter endpoint name"
            {...endpoint_name.bind} />
        </FieldWrapper>
      </FieldRow>
      <FieldRow>
        <FieldWrapper>
          <FjInputField
            label="Docs endpoint"
            id="docs_endpoint"
            type="text"
            placeholder="Enter docs endpoint"
            {...docs_endpoint.bind} />
        </FieldWrapper>
        <ActionWrapper right={true}>
          <FjButton size="small" type="submit" disabled={!(name.valid && endpoint.valid && endpoint_name.valid)}>
            Save
          </FjButton>
        </ActionWrapper>
      </FieldRow>
    </FormWrapper>
  )
}

export default connect()(NewLogicModuleForm);
