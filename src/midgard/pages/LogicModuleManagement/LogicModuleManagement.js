import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { colors } from 'colors'
import styled from 'styled-components'
import { rem } from 'polished'
import { loadLogicModuleData } from 'midgard/redux/logicmodule/logicmodule.actions'
import { NotificationContainer } from 'react-notifications';

/**
 * Styled component for the user management page.
 */
const LogicModuleManagementWrapper = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  background-color: ${colors.baseLighter};
  .invite_button {
    border: ${rem(1)} solid ${colors.primary};
    color: ${colors.white};
  }
  .admin {
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
      &__name {
        padding-right: ${rem(12)};
      }   
    }
    &__users {
      width: 100%;
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


/**
 * Outputs the user management page.
 */
function LogicModuleManagement({ location, history, data, dispatch }) {
  // state to toggle actions menus
  const [logicModulesLoaded, setLogicModulesLoaded] = useState(false);

  useEffect(() => {
    history.push(`/app/admin/logic-modules`);
    if (!logicModulesLoaded) {
      dispatch(loadLogicModuleData());
      setLogicModulesLoaded(true);
    }
  }, [data]);


  return (
    <LogicModuleManagementWrapper className="admin">
      <div className="admin__container">
        <div className="admin__header">
          <h3 className="admin__header__name">Manage modules</h3>
        </div>
      </div>
      <NotificationContainer />
    </LogicModuleManagementWrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({...state.logicModuleReducer, ...ownProps});
export default connect(mapStateToProps)(LogicModuleManagement);
