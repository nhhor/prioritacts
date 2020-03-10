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
  console.log('started');
  return function (dispatch) {
    dispatch(logEvent());

    return fetch(`https://people.googleapis.com/v1/${id}:updateContact?access_token=${token}&updatePersonFields=userDefined&alt=json`, {
      method: 'PATCH',
      body: JSON.stringify({
        userDefined: [{
          key: '~prioritacts~lastContact~',
          value: '2020-3-10'
        },
        {
          key: '~prioritacts~frequency~',
          value: '7'
        }],
        etag: etag,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))
  };
}




export const logEvent = () => ({
  type: types.LOG_EVENT,
  payload: 'none',
});





// fetch(`https://people.googleapis.com/v1/people/${resourceName_ID}:updateContact?access_token=${access_token}&updatePersonFields=userDefined&alt=json`, {
//   method: ‘PATCH’,
//   body: JSON.stringify({
//     userDefined: [{
//       key: 'test1',
//       value: 'test2'
//     },
//     {
//       key: 'test3',
//       value: 'test4'
//     }],
//     etag: etag,
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8"
//   }
// })
// .then(response => response.json())
// .then(json => console.log(json))
