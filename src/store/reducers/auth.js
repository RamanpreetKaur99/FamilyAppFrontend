import {
    AUTH_FAILED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
   // USER_LOADED,
  } from '../actions/types';
  
  const initialState = {
    loading: true,
    error: null,
    user: localStorage.getItem('user'), 
    token: localStorage.getItem('token'),
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      /*case USER_LOADED:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: payload['username'],
        };*/
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          error:'no',
        };
      case LOGIN_SUCCESS:
        console.log(payload)
        localStorage.setItem('token', payload['key']);
        localStorage.setItem('user',payload['user']);
        console.log(localStorage.getItem('user'))
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: localStorage.getItem('user'), 
          token: localStorage.getItem('token'),
          error:'no',
        };
      case REGISTER_FAIL:
        console.log(payload)
        return {
          ...state,
          error: payload
        }
      case LOGIN_FAIL:
        return {
          ...state,
          error: payload
        }
      case LOGOUT:
        localStorage.removeItem('token');
        localStorage.removeItem('user');
       
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          key:null,
          error: null
        };
      default:
        return state;
    }
  }
  