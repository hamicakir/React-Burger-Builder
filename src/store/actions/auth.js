import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};
export const authSuccess = (token,userId) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId: userId
    }
};
export const authFail = (error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
};
export const auth = (email, password, method) => {
    let url ="";
    if(method){
        url= "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDziEj6UQAj02aTnJJQzmaAcm9ysSVZQXg"
    }else{
        url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDziEj6UQAj02aTnJJQzmaAcm9ysSVZQXg"
    }
    const authData =  {
        email: email,
        password: password,
        returnSecureToken: true
    };
    return dispatch => {
        dispatch(authStart());
        axios.post(url ,authData).then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            dispatch(authFail(error));
        })
    }
};
export const setAuthRedirectPath = (path) => {
  return{
      type: actionTypes.AUTH_REDIRECT,
      path: path
  }
};
export const authCheckState= () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }else{
                dispatch(logout());
            }
        }
    }
};