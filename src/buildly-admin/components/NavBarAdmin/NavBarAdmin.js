import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { httpService } from '../../../midgard/modules/http/http.service'
import { environment } from 'environment'
import EndpointMain from '../../components/EndpointMain/EndpointMain';

function NavBarAdmin({ swaggerObj }) {
  return (
    <React.Fragment>
      nav
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => ({...ownProps, ...state.authReducer});

export default connect(mapStateToProps)(NavBarAdmin);
