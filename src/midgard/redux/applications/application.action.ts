import { Application } from './application.model';

export const CREATE_APPLICATION = 'CREATE_APPLICATION';
export const CREATE_APPLICATION_SUCCESS = 'CREATE_APPLICATION_SUCCESS';
export const CREATE_APPLICATION_FAIL = 'CREATE_APPLICATION_FAIL';

export const LOAD_APPLICATIONS = 'LOAD_APPLICATIONS';
export const LOAD_APPLICATIONS_SUCCESS = 'LOAD_APPLICATIONS_SUCCESS';
export const LOAD_APPLICATIONS_FAIL = 'LOAD_APPLICATIONS_FAIL';

export const DELETE_APPLICATION = 'DELETE_APPLICATION';
export const DELETE_APPLICATION_SUCCESS = 'DELETE_APPLICATION_SUCCESS';
export const DELETE_APPLICATION_FAIL = 'DELETE_APPLICATION_FAIL';

export const createApplication = (application: Application) => ({ type: CREATE_APPLICATION, data: application });
export const loadApplications = () => ({ type: LOAD_APPLICATIONS });
export const deleteApplication = (application: Application) => ({ type: DELETE_APPLICATION, data: application });
