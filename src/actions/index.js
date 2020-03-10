import * as types from "./../constants/ActionTypes";

export const loadContacts = (items) => ({
  type: types.LOAD_CONTACTS,
  payload: items,
});

export const setToken = (token) => ({
  type: types.SET_TOKEN,
  payload: token,
});
