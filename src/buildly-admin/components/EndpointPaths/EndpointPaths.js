import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { colors } from '../../../styles/colors';
import { rem } from 'polished';
import styled from 'styled-components';


function EndpointPaths({ definitions, paths }) {
  return (
    <div>paths</div>
  )
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.authReducer});

export default connect(mapStateToProps)(EndpointPaths);
