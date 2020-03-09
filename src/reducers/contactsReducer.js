export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_CONTACTS':
    let toSort = action.payload.slice();
    const result = toSort.find( ({ userDefined }) => userDefined === '~prioritacts~frequency~' );
    function compare(a, b) {

      const bandA = a.userDefined ? a.userDefined.find(x => x.key === '~prioritacts~frequency~').value : a.names[0].displayName.toUpperCase();
      const bandB = b.userDefined ? b.userDefined.find(x => x.key === '~prioritacts~frequency~').value : b.names[0].displayName.toUpperCase();


      console.log(bandA.value);

      const bandAx = a.names[0].displayName.toUpperCase();
      const bandBx = b.names[0].displayName.toUpperCase();
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
