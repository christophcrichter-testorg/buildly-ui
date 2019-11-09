import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { colors } from 'colors'
import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { loadLogicModuleData, createLogicModule, updateLogicModule, deleteLogicModule } from 'midgard/redux/logicmodule/logicmodule.actions'
import { FjButton } from '@buildlyio/freyja-react'
import LogicModule from 'midgard/components/LogicModule/LogicModule';
import { NewLogicModuleForm } from '../../components/NewLogicModuleForm/NewLogicModuleForm'
import Popup from 'reactjs-popup'

const ModuleManagementWrapper = styled.div`
  height: 100%;
  background-color: ${colors.baseLighter};
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  margin: 0 ${rem(24)};
`;

const ModuleManagementHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${rem(30)};
`;

const ModuleManagementHeading = styled.h3`
  padding-right: ${rem(12)};
`;

const ModuleManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


/**
 * Outputs the user management page.
 */
function LogicModuleManagement({ history, data, dispatch }) {
  const [logicModulesLoaded, setLogicModulesLoaded] = useState(false);

  useEffect(() => {
    history.push(`/app/admin/logic-modules`);
    if (!logicModulesLoaded) {
      dispatch(loadLogicModuleData());
      setLogicModulesLoaded(true);
    }
  }, [data]);

  /** Create logicmodule request */
  const handleCreate = (logicmodule) => {
    dispatch(createLogicModule(logicmodule));
  };

  /** Update logicmodule request */
  const handleUpdate = (logicmodule) => {
    dispatch(updateLogicModule(logicmodule));
  };

  /** Delete logicmodule request */
  const handleDelete = (logicmodule) => {
    dispatch(deleteLogicModule(logicmodule));
  };

  const logicmodules = data.map(logicmodule => <LogicModule key={logicmodule.id} logicmodule={logicmodule} updateModule={handleUpdate} deleteModule={handleDelete} />);

  return (
    <ModuleManagementWrapper>
      <ModuleManagementHeader>
        <ModuleManagementHeading>List of logic modules</ModuleManagementHeading>
        <Popup
          trigger={<FjButton size="small">Add</FjButton>}
          position="bottom right"
          on="click"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: '0px', border: 'none', width: `{rem(350)}` }}
          arrow={false}>
          <NewLogicModuleForm action={handleCreate} />
        </Popup>
      </ModuleManagementHeader>
      <ModuleManagementContainer>
        {logicmodules}
      </ModuleManagementContainer>
    </ModuleManagementWrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({...state.logicModuleReducer, ...ownProps});
export default connect(mapStateToProps)(LogicModuleManagement);
