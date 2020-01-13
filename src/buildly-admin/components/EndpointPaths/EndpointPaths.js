import React, { useEffect, useState } from 'react'
import copyIcon from 'assets/copy-icon.svg'
import closeIcon from 'assets/close-icon.svg'
import { colors } from '../../../styles/colors'
import { rem } from 'polished'
import styled, { css } from 'styled-components'

const EndpointPathsWrapper = styled.div`
  overflow: auto;
`;

const EndpointPre = styled.pre`
  color: ${colors.white};
  overflow: auto;
`;

const EndpointText = styled.div`
  cursor: default;
  margin: ${rem(5)} 0;
  width: ${rem(200)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EndpointIcon = styled.img`
  margin-left: ${rem(5)};
  cursor: pointer;
`;

const EndpointContainer = styled.div`
  display: flex;
  position: relative;
  margin: ${rem(15)} 0;
`;
const EndpointOverlay = styled.div`
  position: fixed;
  left: 60%;
  width: ${rem(240)};
  padding: ${rem(15)};
  background-color: #27292b;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  z-index: 3;
`;

const EndpointOverlayClose = styled.img`
  position: absolute;
  right: ${rem(15)};
  cursor: pointer;
  pre {
    overflow: auto;
    height: ${rem(450)};
  }
`;

const EndpointPath = styled.div`
  font-size: ${rem(12)};
  padding: ${rem(8)};
  overflow: hidden;
  display: flex;
`;

const PathItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${rem(12)};
  font-weight: 600;
  padding: ${rem(6)};
  width: ${rem(40)};
  background-color: ${props => {
    switch(props.verb) {
      case 'get':
        return '#0673db';
      
      case 'post':
        return '#02a483';

      case 'patch':
        return '#02a483';

      case 'put':
        return '#cc9211';

      case 'delete':
        return '#fe5a5a';
    }
  }}
`;

const PathItemVerb = styled.div`
  display: flex;
  border-radius: ${rem(4)};
  margin-left: ${rem(5)};
  overflow: hidden;
  &:first-child {
    margin-left: ${rem(0)};
  }
  ${props => {
    switch(props.verb) {
      case 'get':
        return css`border-color: #0673db;`;
      
      case 'post':
        return css`
        border-color: #02a483;
        background-color: rgba(2, 164, 131, 0.17);`;

      case 'patch':
        return css`border-color: #02a483;`;

      case 'put':
        return css`border-color: #cc9211;`;

      case 'delete':
        return css`border-color: #fe5a5a;`;
    }
  }}
`; 


function EndpointPaths({ definitions, paths }) {
  const [showDefinitions, setShowDefinitions] = useState(false);
  const [definitionsString, setDefinitionsString] = useState('');

  useEffect(() => {
    setDefinitionsString(JSON.stringify(definitions, null, 2));
  }, [definitions])

  /**
   * copies selected endpoint to clipboard
   * @param val - value to be copied
   */
  const copyEndpoint = (val) => {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  return (
    <React.Fragment>{paths && paths.length && (
      <EndpointPathsWrapper>
        {showDefinitions &&
          <EndpointOverlay>
            <EndpointOverlayClose src={closeIcon} onClick={() => setShowDefinitions(false)} />
            <EndpointPre>{definitionsString}</EndpointPre>
          </EndpointOverlay>
        }
        <h3>Paths</h3>
        {paths.map(path => {
          return (<React.Fragment key={path[0]}>
            <EndpointPath>
              <EndpointText title={path[0]}>{path[0]}</EndpointText>
              <input type="text" value={path[0]} onChange={() => {}} hidden />
              <EndpointIcon onClick={() => copyEndpoint(path[0])} src={copyIcon}/>
            </EndpointPath>
            <EndpointContainer>
              {path[2].map(verb => (
                <PathItem verb={verb} key={`${path[0]}-${verb}`}>
                  <PathItemVerb
                    verb={verb}
                    onClick={() => setShowDefinitions(!showDefinitions)}>
                    {verb}
                  </PathItemVerb>
                </PathItem>
              ))}
            </EndpointContainer>
          </React.Fragment>)
        })}
      </EndpointPathsWrapper>
    )}</React.Fragment>
  )
}

export default EndpointPaths;
