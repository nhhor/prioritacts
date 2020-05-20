import constants from './../constants';
const { initialState, types } = constants;

export default (state = initialState.contacts, action) => {
  switch (action.type) {
    case types.LOAD_CONTACTS:
    let toSort = action.payload.slice();
    // function compare(a, b) {
    //   const contactA = (a.userDefined && a.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? parseInt(a.userDefined.find(x => x.key === '~prioritacts~frequency~').value) : a.names[0].displayName.toUpperCase();
    //   const contactB = (b.userDefined && b.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? parseInt(b.userDefined.find(x => x.key === '~prioritacts~frequency~').value) : b.names[0].displayName.toUpperCase();
    //   let comparison
    //   console.log(typeof contactA);
      // if (contactA < contactB) {
      //   comparison = -1;
      // } else if (contactA > contactB) {
      //   comparison = 1;
      // } else {
      //   comparison = 0;
      // }
      // return comparison;

      // return contactA - contactB;
    // }

    // REF: https://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    function sortAlphaNum(a,b) {
      const contactA = (a.userDefined && a.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? a.userDefined.find(x => x.key === '~prioritacts~frequency~').value : a.names[0].displayName.toUpperCase();
      const contactB = (b.userDefined && b.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? b.userDefined.find(x => x.key === '~prioritacts~frequency~').value : b.names[0].displayName.toUpperCase();
      var AInt = parseInt(contactA, 10);
      var BInt = parseInt(contactB, 10);
      if(isNaN(AInt) && isNaN(BInt)){
        var aA = contactA.replace(reA, "");
        var bA = contactB.replace(reA, "");
        if(aA === bA) {
          var aN = parseInt(contactA.replace(reN, ""), 10);
          var bN = parseInt(contactB.replace(reN, ""), 10);
          return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
          return aA > bA ? 1 : -1;
        }
      }else if(isNaN(AInt)){//A is not an In
        return 1;//to make alphanumeric sort first return -1 here
      }else if(isNaN(BInt)){//B is not an In
        return -1;//to make alphanumeric sort first return 1 here
      } else if (AInt == BInt) {
        var aA2 = contactA.replace(reA, "");
        var bA2 = contactB.replace(reA, "");
        return aA2 > bA2 ? 1 : -1;
      } else{
        return AInt > BInt ? 1 : -1;
      }
    }
    let sortedPayload = toSort.sort(sortAlphaNum);
    return {
      contacts: sortedPayload
    }
    case types.LOG_EVENT:
    let logUpdatedState = state.contacts.map(contactToLogUpdate => {
      if (contactToLogUpdate.resourceName === action.payload.resourceName) {
        return action.payload;
      } else {
        return contactToLogUpdate;
      }
    });
    // REF: https://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
    var reA2 = /[^a-zA-Z]/g;
    var reN2 = /[^0-9]/g;
    function sortAlphaNum2(a,b) {
      const contactA = (a.userDefined && a.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? a.userDefined.find(x => x.key === '~prioritacts~frequency~').value : a.names[0].displayName.toUpperCase();
      const contactB = (b.userDefined && b.userDefined.find(x => x.key === '~prioritacts~frequency~') !== undefined) ? b.userDefined.find(x => x.key === '~prioritacts~frequency~').value : b.names[0].displayName.toUpperCase();
      var AInt = parseInt(contactA, 10);
      var BInt = parseInt(contactB, 10);
      if(isNaN(AInt) && isNaN(BInt)){
        var aA = contactA.replace(reA2, "");
        var bA = contactB.replace(reA2, "");
        if(aA === bA) {
          var aN = parseInt(contactA.replace(reN2, ""), 10);
          var bN = parseInt(contactB.replace(reN2, ""), 10);
          return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
          return aA > bA ? 1 : -1;
        }
      }else if(isNaN(AInt)){//A is not an In
        return 1;//to make alphanumeric sort first return -1 here
      }else if(isNaN(BInt)){//B is not an In
        return -1;//to make alphanumeric sort first return 1 here
      } else if (AInt == BInt) {
        var aA2 = contactA.replace(reA, "");
        var bA2 = contactB.replace(reA, "");
        return aA2 > bA2 ? 1 : -1;
      } else {
        return AInt > BInt ? 1 : -1;
      }
    }
    let sortedPayload2 = logUpdatedState.sort(sortAlphaNum2);
    return {
      contacts: sortedPayload2,
    }
    default:
    return state
  }
}
