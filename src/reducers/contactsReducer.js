export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_CONTACTS':
    let toSort = action.payload.slice();
    const result = toSort.find( ({ userDefined }) => userDefined === '~prioritacts~frequency~' );
    function compare(a, b) {
      const bandA = a.names[0].displayName.toUpperCase();
      const bandB = b.names[0].displayName.toUpperCase();
      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
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
