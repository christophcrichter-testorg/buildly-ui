// react library imports
import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from 'colors'

// react user imports
import NavBar from 'midgard/layout/NavBar/NavBar'
import TopBar from 'midgard/layout/TopBar/TopBar'
import Profile from 'midgard/pages/Profile/Profile'
import UserManagement from 'midgard/pages/UserManagement/UserManagement'
import LogicModuleManagement from 'midgard/pages/LogicModuleManagement/LogicModuleManagement'

import { user, UserContext } from 'midgard/context/User.context'
import { subNav, SubNavContext } from 'midgard/context/SubNav.context'

const ContainerWrapper = styled.div`
  height: 100%;
  display: flex;
  background-color: ${colors.baseLighter};

  .container {
    &__row {
      display: flex;
      flex: 1;
    }

    &__column {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__scroll {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: scroll;
    }
  }
`

/**
 * Container for the app layout when the user is authenticated.
 */
function Container({ location, history }) {
  const [navHidden, setNavHidden] = useState(false);
  const routeItems = [];
    //entryPointForGulpStart
    //entryPointForGulpEnd

  let subNavItems = subNav;
  if (location.pathname.includes('profile')) {
    subNavItems = [
      { label: 'Profile settings', value: 'profile/settings' },
    ];
  } else if (location.pathname.includes('admin')) {
    subNavItems = [
      { label: 'User management', value: 'admin/users/current-users' },
      { label: 'Logic modules', value: 'admin/logic-modules' },
    ];
  }

  return (
    <ContainerWrapper className="container">
      <UserContext.Provider value={user}>
        <div className="container__column">
          <SubNavContext.Provider value={subNavItems}>
            <TopBar navHidden={navHidden} setNavHidden={setNavHidden} options={subNavItems} location={location} history={history} />
          </SubNavContext.Provider>
          <div className="container__row">
            <NavBar navHidden={navHidden} location={location} history={history} />
            <div className="container__scroll">
              <Route exact path="/app" render={() => (
                <Redirect to="/app/profile"/>
              )} />
              <Route exact path="/app/profile" render={() => (
                <Redirect to="/app/profile/settings"/>
              )} />
              <Route exact path="/app/admin" render={() => (
                <Redirect to="/app/admin/users"/>
              )} />
              <Route path="/app/profile/settings" component={Profile} />
              <Route path="/app/admin/users" component={UserManagement} />
              <Route path="/app/admin/logic-modules" component={LogicModuleManagement} />
              {routeItems}
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </ContainerWrapper>
  )
}

export default Container;
