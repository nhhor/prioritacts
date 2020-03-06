export const loadContacts = (items) => dispatch => {
 dispatch({
  type: 'LOAD_CONTACTS',
  payload: items
 })
}
