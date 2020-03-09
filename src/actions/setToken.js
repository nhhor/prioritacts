export const setToken = (token) => dispatch => {
 dispatch({
  type: 'SET_TOKEN',
  payload: token
 })
}
