import constants from "./../constants";
const { initialState, types } = constants;

const normalizeSortValue = (contact) => {
  const userDefinedEntry =
    contact &&
    Array.isArray(contact.userDefined) &&
    contact.userDefined.find(
      (entry) => entry && entry.key === "~prioritacts~frequency~",
    );

  if (userDefinedEntry && userDefinedEntry.value !== undefined) {
    return String(userDefinedEntry.value);
  }

  const displayName =
    contact &&
    Array.isArray(contact.names) &&
    contact.names[0] &&
    contact.names[0].displayName
      ? contact.names[0].displayName
      : "";

  return displayName.toUpperCase();
};

const sortAlphaNum = (a, b) => {
  const contactA = normalizeSortValue(a);
  const contactB = normalizeSortValue(b);

  const reA = /[^a-zA-Z]/g;
  const reN = /[^0-9]/g;
  const AInt = parseInt(contactA, 10);
  const BInt = parseInt(contactB, 10);

  if (isNaN(AInt) && isNaN(BInt)) {
    const aA = contactA.replace(reA, "");
    const bA = contactB.replace(reA, "");

    if (aA === bA) {
      const aN = parseInt(contactA.replace(reN, ""), 10);
      const bN = parseInt(contactB.replace(reN, ""), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    }

    return aA > bA ? 1 : -1;
  }

  if (isNaN(AInt)) {
    return 1;
  }

  if (isNaN(BInt)) {
    return -1;
  }

  if (AInt === BInt) {
    const aA2 = contactA.replace(reA, "");
    const bA2 = contactB.replace(reA, "");
    return aA2 > bA2 ? 1 : -1;
  }

  return AInt > BInt ? 1 : -1;
};

export default (state = initialState.contacts, action) => {
  switch (action.type) {
    case types.LOAD_CONTACTS: {
      if (!Array.isArray(action.payload)) {
        return state;
      }

      return [...action.payload].sort(sortAlphaNum);
    }
    case types.LOG_EVENT: {
      const currentContacts = Array.isArray(state) ? state : [];
      if (!action || !action.payload || !action.payload.resourceName) {
        return currentContacts;
      }

      const logUpdatedState = currentContacts.map((contactToLogUpdate) =>
        contactToLogUpdate.resourceName === action.payload.resourceName
          ? action.payload
          : contactToLogUpdate,
      );

      return [...logUpdatedState].sort(sortAlphaNum);
    }
    default:
      return state;
  }
};
