import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { colors } from '../../../styles/colors';
import { rem } from 'polished';
import styled from 'styled-components';


function EndpointEntries({ definitions, crudInputs, paths, endpointTitle }) {
  return (
    <div>entry for {endpointTitle}</div>
  )
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.authReducer});

export default connect(mapStateToProps)(EndpointEntries);
