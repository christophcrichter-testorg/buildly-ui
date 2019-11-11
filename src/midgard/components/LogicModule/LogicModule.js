import React from 'react'
import styled, { css } from 'styled-components'
import { FjInlineEditor, FjButton, FjCard } from '@buildlyio/freyja-react'
import { colors } from 'colors'
import { rem } from 'polished'

const CardField = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
  padding: 0 ${rem(4)};

  ${props => props.small && css`
    font-size: ${rem(11)};
    color: ${colors.gray};
    padding: 0 ${rem(8)};
  `}
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * Generic card layout for logic module.
 */
function LogicModule({ logicmodule, updateModule, deleteModule }) {

  /**
   * Calls the update action.
   */
  const updateItem = (label, value) => {
    updateModule({ ...logicmodule, [label]: value });
  };

  const dateOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  };
  const createDateFormatted = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(logicmodule.create_date));
  const editDateFormatted = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(logicmodule.edit_date));

  return (
    <FjCard
      size="small"
      content={
      <React.Fragment>
        <CardRow>
          <CardField>
            <FjInlineEditor
              id="description"
              label="Description"
              placeholder="Enter description"
              value={logicmodule.description}
              tag="p"
              onChange={(event) => updateItem('description', event)} />
            </CardField>
          <FjButton variant="danger" size="small" onClick={() => deleteModule({...logicmodule})}>Delete</FjButton>
        </CardRow>
        <CardField small={true}>
          Created on {createDateFormatted} | Edited on {editDateFormatted}
        </CardField>
      </React.Fragment>}>
      <CardRow>
        <CardField>
          <FjInlineEditor
            id="name"
            label="Name"
            placeholder="Enter name"
            value={logicmodule.name}
            tag="h4"
            onChange={(event) => updateItem('name', event)} />
        </CardField>
        <CardField>
          <FjInlineEditor
            id="endpoint"
            label="Endpoint"
            placeholder="Enter endpoint"
            value={logicmodule.endpoint}
            tag="p"
            onChange={(event) => updateItem('endpoint', event)} />
        </CardField>
        <CardField>
          <FjInlineEditor
            id="endpoint_name"
            label="Endpoint name"
            placeholder="Enter endpoint name"
            value={logicmodule.endpoint_name}
            tag="p"
            onChange={(event) => updateItem('endpoint_name', event)} />
        </CardField>
        <CardField>
          <FjInlineEditor
            id="docs_endpoint"
            label="Docs endpoint"
            placeholder="Enter docs endpoint"
            value={logicmodule.docs_endpoint}
            tag="p"
            onChange={(event) => updateItem('docs_endpoint', event)} />
        </CardField>
      </CardRow>
    </FjCard>
  );
}

export default LogicModule;
