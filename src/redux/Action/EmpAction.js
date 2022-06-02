import {LIST_OF_EMP, IS_LOGIN, ADD_USER, EDIT_USER, DELETE_USER} from './Type';

export const listOfAllEpm = body => ({
  type: LIST_OF_EMP,
  body,
});

export const isLogin = body => ({
  type: IS_LOGIN,
  body,
});

export const addUser = body => ({
  type: ADD_USER,
  body,
});

export const editUser = body => ({
  type: EDIT_USER,
  body,
});

export const deleteUser = body => ({
  type: DELETE_USER,
  body,
});
