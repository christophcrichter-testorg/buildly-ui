
export const  LOAD_ACCESSTOKENS = 'LOAD_ACCESS_TOKENS';
export const  LOAD_ACCESSTOKENS_SUCCESS = 'LOAD_ACCESS_TOKENS_SUCCESS';
export const  LOAD_ACCESSTOKENS_FAIL = 'LOAD_ACCESS_TOKENS_FAIL';

export const DELETE_ACCESSTOKEN = 'DELETE_ACCESSTOKEN';
export const DELETE_ACCESSTOKEN_SUCCESS = 'DELETE_ACCESSTOKEN_SUCCESS';
export const DELETE_ACCESSTOKEN_FAIL = 'DELETE_ACCESSTOKEN_FAIL';

export const loadAccessTokens = () => ({ type: LOAD_ACCESSTOKENS });

export const deleteAccessToken = (accessToken) => ({ type: DELETE_ACCESSTOKEN, data: accessToken });
