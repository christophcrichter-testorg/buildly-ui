import React, { useState, useEffect } from 'react'
import { colors } from 'colors'
import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { connect } from 'react-redux'
import NavItem from 'midgard/components/NavItem/NavItem'

const NavBarWrapper = styled.div`
  display: flex;
  max-width: ${rem(220)};
  width: ${rem(220)};
  height: 100%;
  background-color: ${colors.base};
  min-height: calc(100vh - ${rem(60)});
  transition: max-width 0.3s ease-in-out;
  margin-top: ${rem(-60)};
  padding-top: ${rem(60)};

  .nav-bar {
    &__container {
      display: flex;
      margin: 0 ${rem(10)};
      flex-flow: column nowrap;
      width: ${rem(200)};
      height: calc(100vh - ${rem(60)});
      padding-bottom: ${rem(16)};
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
    }
    &__elements {
      flex: 3;
    }
  }

  ${props => props.hidden && css`
    max-width: 0;
    overflow: hidden;
    margin-right: ${rem(40)};
  `}
`;

/**
 * Component for the top bar header.
 */
function NavBarAdmin({ swaggerObj, navHiddenState, history, location, dispatch }) {
  const [navHidden, setNavHidden] = navHiddenState;
  const [endpoints, setEndpoints] = useState(null);

  /**
   * gets the list of the endpoints from swagger
   */
  const getEndpointsFromSwagger = () => {
    const newEndpoints = Object.keys(swaggerObj.paths).map(path => {
      const pathSegments = path.split('/'); // split the path to array of segments
      if (!pathSegments[2] || pathSegments[2].length === 0) {
        return pathSegments[1]; // take the first path segemnt if there is no second segment
      }
      if (pathSegments[2] && pathSegments[2].includes('{')) {
        return pathSegments[1]; // take the first path segemnt if the second segment is a url parameter
      } else {
        return pathSegments[2]; // else take the second path segemnt
      }
    }).filter((value, index, self) => {
      return self.indexOf(value) === index;
    }).map((endpoint) => {
      return {
        name: endpoint,
        value: endpoint.toLowerCase(),
      };
    });
    setEndpoints(newEndpoints);
  }

  useEffect(() => {
    getEndpointsFromSwagger();
  }, [swaggerObj]);

  /**
   * Sets the active item.
   * @param {string} active the active nav item
   */
  const setActive = (active) => {
    const { from } = location.state || { from: { pathname: `/admin-panel/${active}` } };
    history.push(from);
  }

  return (
    <NavBarWrapper hidden={navHidden}>
      <div className="nav-bar__container">
        {endpoints && (
          <div id="navbar" className="nav-bar__elements">
            {endpoints.map(item => (
              <NavItem
                key={item.name}
                id={item.name}
                title={item.name}
                active={location.pathname.includes(item.name)}
                action={(active) => setActive(active)}
              />))
            };
          </div>
        )}
      </div>
    </NavBarWrapper>
  )
}

export default connect()(NavBarAdmin);
