import axios from 'axios';
import {
  //AUTH_FAILED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  //USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from './types'

import createHistory from 'history/createBrowserHistory'

export const login = ({ username, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post('/auth/login/', body, config);
    let newpayload = {}
    newpayload['key'] = res.data['key']
    newpayload['user'] = username
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: newpayload,
    });
   
  } catch (error) {
    console.log(error)
    const errors = error
    dispatch({
      type: LOGIN_FAIL,
      payload: errors
    });
  }
};

export const register = ({ name, email, password1, password2, family, username }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password1, password2, family, username });
  try {
    const res = await axios.post('/auth/registration', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    //dispatch(loadUser());
    console.log(res.data)
  } catch (error) {
    console.log(error.response.data)
    const errors = error.response.data
    dispatch({
      type: REGISTER_FAIL,
      payload: errors
    });
  }
};

export const logout = () => async(dispatch) => {
  try {
    const res = await axios.post('/auth/logout/');
    dispatch({
      type: LOGOUT,
    });
    dispatch({
      type: CLEAR_PROFILE,
    });
  } catch (error) {
    const errors = []
    if (errors) {
        console.log(error) 
    dispatch({
      type: REGISTER_FAIL,
    });
    }
  }
  
};
