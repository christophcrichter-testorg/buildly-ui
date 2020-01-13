import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { httpService } from '../../../midgard/modules/http/http.service'
import { environment } from 'environment'
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin';
import TopBarAdmin from '../../components/TopBarAdmin/TopBarAdmin';
import EndpointMain from '../../components/EndpointMain/EndpointMain';
import { withRouter } from 'react-router'
import styled from 'styled-components'

const ContainerWrapper = styled.div`
  height: 100%;
  display: flex;

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
 * Outputs the admin landing page.
 */
function AdminPanel({ match, location, history }) {
  const navHiddenState = useState(null);
  const [swaggerObj, setSwaggerObj] = useState(null);
  const [currentEndpoint, setCurrentEndpoint] = useState(null);

  /**
   * it sends a request to get swagger json
   */
  useEffect(() => {
    httpService.makeRequest('get', `${environment.API_URL}docs/?format=openapi`).then(res => {
      if (res.data) {
        setSwaggerObj(res.data);
      }
    });
  }, [match]);

  /**
   * it gets the endpoint from the router params
   */
  useEffect(() => {
    if (match.params) {
      setCurrentEndpoint(match.params.endpoint);
    }
  }, [match]);

  return (
    <ContainerWrapper>
      <div className="container__column">
        <TopBarAdmin swaggerObj={swaggerObj} navHiddenState={navHiddenState} location={location} history={history} />
        {swaggerObj && <div className="container__row">
          <NavBarAdmin swaggerObj={swaggerObj} navHiddenState={navHiddenState} location={location} history={history} />
          <EndpointMain endpoint={currentEndpoint} swaggerObj={swaggerObj} match={match} />
        </div>}
      </div>
    </ContainerWrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.match});

export default withRouter(connect(mapStateToProps)(AdminPanel));
