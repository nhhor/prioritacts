// import * as types from "./../constants/ActionTypes";



export const loadContacts = (items) => dispatch => {
 dispatch({
  type: 'LOAD_CONTACTS',
  payload: items,
 })
}
