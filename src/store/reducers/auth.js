import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    token:null,
    userId: null,
    error:null,
    loading:false,
    authRedirect: '/'
};

const authSuccess = (currentState, action) => {
    return   updateObject(currentState, {
        token:action.token,
        userId: action.userId,
        error:null,
        loading:false
    })
};
const authFail = (currentState, action) => {
    return   updateObject(currentState, {
        error:action.error,
        loading:false
    })
};
const logout = (currentState, action) => {
  return updateObject(currentState, { token:null, userId:null});
};
const auth = (currentState = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:return updateObject(currentState, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS: return authSuccess(currentState,action);
        case actionTypes.AUTH_FAIL: return authFail(currentState,action);
        case actionTypes.AUTH_LOGOUT: return logout(currentState, action);
        case actionTypes.AUTH_REDIRECT: return updateObject(currentState, {authRedirect: action.path});
        default:return currentState;
    }

};

export default auth;