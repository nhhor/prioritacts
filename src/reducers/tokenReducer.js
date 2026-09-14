import constants from "./../constants";
const { initialState, types } = constants;

export default (state = initialState.token, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
