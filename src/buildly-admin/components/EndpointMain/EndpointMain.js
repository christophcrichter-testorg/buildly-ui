import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { colors } from '../../../styles/colors'
import { rem } from 'polished'
import styled from 'styled-components'
import EndpointEntries from '../EndpointEntries/EndpointEntries'
import EndpointForm from '../EndpointForm/EndpointForm'
import EndpointPaths from '../EndpointPaths/EndpointPaths'

const EndpointMainWrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  background-color: ${colors.gray};
  padding: 30px 0;
  min-height: 100vh;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;

  .endpoint-main {
    &__spinner {
      flex: 3;
    }
    &__form {
      flex: 3;
    }
    &__entries {
      flex: 3;
    }
    &__paths {
      flex: 1;
      max-width: ${rem(300)};
      margin-left: ${rem(30)};
      overflow: auto;
    }
  }
`;

const EndpointMainContainer = styled.div`
  display: flex;
  position: relative;
  color: ${colors.text};
  margin-top: rem-calc(60);
  width: 100%;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
`;

function EndpointMain({ endpoint, swaggerObj, match }) {
  const [paths, setPaths] = useState(null);
  const [crudInputs, setCrudInputs] = useState({});
  const [definitions, setDefinitions] = useState({});
  const [listView, setListView] = useState(true);
  const [definitionKey, setDefinitionKey] = useState(null);

  useEffect(() => {
    if (match.params.id) {
      setListView(false);
      setCurrentItemId(match.params.id.toString());
    }
  }, [swaggerObj]);

  /**
   * gets the list of paths to do Http operations that can be applied to the endpoint from swagger
   */
  useEffect(() => {
    if (swaggerObj) {
      setPaths(null);
      setCrudInputs({});
      const httpVerbs = ['get', 'put', 'post', 'delete', 'patch']; // get the available operations for the current endpoint
      const paths = Object.entries(swaggerObj.paths).filter(path => {
        const pathSegments = path[0].split('/'); // split the path url to segments
        if (!pathSegments[2] || pathSegments[2].length === 0) {
          return pathSegments[1].includes(endpoint); // take the first path segemnt if there is no second segment
        }
        if (pathSegments[2] && pathSegments[2].includes('{')) {
          return pathSegments[1].includes(endpoint); // take the first path segemnt if the second segment is a url parameter
        } else {
          return pathSegments[2].includes(endpoint); // else take the second path segemnt
        }
      }).map(path => {
        const httpMethods = Object.keys(path[1]).filter(verb => {
          return httpVerbs.includes(verb);
        });
        path.push(httpMethods);
        return path;
      });
      setPaths(paths);
      setCrudInputs({...crudInputs, endpoint: paths[0][0]});
    }
  }, [swaggerObj]);

  /**
   * get endpoint definitions from swagger
   */
  useEffect(() => {
    if (swaggerObj && paths) {
      // find the definition schema from the swagger paths object
      if (paths[0][1].get && paths[0][1].get.responses['200'].schema.items) { // without pagination
        setDefinitionKey(paths[0][1].get.responses['200'].schema.items.$ref.split('/')[2]);
        setCrudInputs({...crudInputs, dataProp: 'data' }); // push the data property to use in the crud module
      } else { // with pagination
        setDefinitionKey(paths[0][1].get.responses['200'].schema.properties.results.items.$ref.split('/')[2]);
        setCrudInputs({...crudInputs, dataProp: 'results' }); // push the data property to use in the crud module
      }
      setDefinitions(swaggerObj.definitions[definitionKey]);
    }
  }, [paths]);

  return (
    <EndpointMainWrapper>
      <EndpointMainContainer>
        {listView && swaggerObj && (
          <EndpointEntries
            class="endpoint-main__entries"
            definitions={definitions}
            paths={paths}
            crudInputs={crudInputs}
            endpointTitle={endpoint} />
        )}
        {!listView && swaggerObj && (
          <EndpointForm
            class="endpoint-main__form"
            definitions={definitions}
            crudInputs={crudInputs}
            currentItemId={currentItemId}
            endpointTitle={endpoint} />
        )}
        <EndpointPaths
          class="endpoint-main__paths"
          definitions={definitions}
          paths={paths} />
      </EndpointMainContainer>
    </EndpointMainWrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.authReducer});

export default connect(mapStateToProps)(EndpointMain);
