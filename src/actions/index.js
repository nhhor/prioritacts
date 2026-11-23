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
    if (!token) {
      console.warn(
        "Cannot update contact: no Google access token. Please logout and sign in again.",
      );
      return Promise.resolve();
    }

    const params = new URLSearchParams({ updatePersonFields: "userDefined" });

    return fetch(
      `https://people.googleapis.com/v1/${id}:updateContact?${params.toString()}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          userDefined: userDefined,
          etag: etag,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      },
    )
      .then(async (response) => {
        const json = await response.json().catch(() => ({}));
        if (!response.ok) {
          const message =
            (json && json.error && json.error.message) || response.statusText;
          throw new Error(
            `People API updateContact failed (${response.status}): ${message}`,
          );
        }
        return json;
      })
      .then((json) => dispatch(logEvent(json)))
      .catch((error) => console.error(error));
  };
}

export const logEvent = (json) => ({
  type: types.LOG_EVENT,
  payload: json,
});
