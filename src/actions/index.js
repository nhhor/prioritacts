import * as types from "./../constants/ActionTypes";

export const loadContacts = (items) => ({
  type: types.LOAD_CONTACTS,
  payload: items,
});

export const setToken = (token) => ({
  type: types.SET_TOKEN,
  payload: token,
});

export function fetchNewVisit(id, etag, userDefined, token) {
  return function (dispatch) {
    return fetch(`https://people.googleapis.com/v1/${id}:updateContact?access_token=${token}&updatePersonFields=userDefined&alt=json`, {
      method: 'PATCH',
      body: JSON.stringify({
        userDefined: userDefined,
        etag: etag,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => dispatch(logEvent(json)))
  };
}

export const logEvent = (json) => ({
  type: types.LOG_EVENT,
  payload: json,
});
