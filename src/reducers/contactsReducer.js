import constants from './../constants';
const { initialState, types } = constants;

export default (state = initialState.contacts, action) => {
  switch (action.type) {
    case types.LOAD_CONTACTS:
    let toSort = action.payload.slice();
    function compare(a, b) {
      const contactA = (a.userDefined && a.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? a.userDefined.find(x => x.key === '~prioritacts~frequency~').value : a.names[0].displayName.toUpperCase();
      const contactB = (b.userDefined && b.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? b.userDefined.find(x => x.key === '~prioritacts~frequency~').value : b.names[0].displayName.toUpperCase();
      let comparison = 0;
      if (contactA > contactB) {
        comparison = 1;
      } else if (contactA < contactB) {
        comparison = -1;
      }
      return comparison;
    }
    let sortedPayload = toSort.sort(compare);
    return {
      contacts: sortedPayload
    }
    default:
    return state
  }
}
