import assert from "node:assert/strict";
import test from "node:test";

import contactsReducer from "../reducers/contactsReducer.js";
import constants from "../constants/index.js";

const { initialState, types } = constants;

test("returns the initial contacts array when the reducer is created without a state", () => {
  assert.deepEqual(
    contactsReducer(undefined, { type: null }),
    initialState.contacts,
  );
});

test("keeps the existing contacts array when LOAD_CONTACTS receives a malformed payload", () => {
  const existingContacts = [
    { resourceName: "people/c1", names: [{ displayName: "Alice" }] },
  ];

  const nextState = contactsReducer(existingContacts, {
    type: types.LOAD_CONTACTS,
    payload: { bad: true },
  });

  assert.deepEqual(nextState, existingContacts);
});

test("keeps the existing contacts array when LOG_EVENT receives a payload without a matching resource", () => {
  const existingContacts = [
    {
      resourceName: "people/c1",
      names: [{ displayName: "Alice" }],
      userDefined: [],
    },
    {
      resourceName: "people/c2",
      names: [{ displayName: "Bob" }],
      userDefined: [],
    },
  ];

  const nextState = contactsReducer(existingContacts, {
    type: types.LOG_EVENT,
    payload: { resourceName: "people/c3", userDefined: [] },
  });

  assert.deepEqual(nextState, existingContacts);
});

test("MERGE_CONTACTS updates changed contacts, adds new ones, and removes deleted ones without dropping the rest", () => {
  const existingContacts = [
    { resourceName: "people/c1", etag: "a1", names: [{ displayName: "Alice" }] },
    { resourceName: "people/c2", etag: "b1", names: [{ displayName: "Bob" }] },
    { resourceName: "people/c3", etag: "c1", names: [{ displayName: "Carol" }] },
  ];

  const nextState = contactsReducer(existingContacts, {
    type: types.MERGE_CONTACTS,
    payload: [
      { resourceName: "people/c2", etag: "b2", names: [{ displayName: "Bob" }] },
      { resourceName: "people/c3", metadata: { deleted: true } },
      { resourceName: "people/c4", etag: "d1", names: [{ displayName: "Dave" }] },
    ],
  });

  assert.deepEqual(
    nextState.map((c) => [c.resourceName, c.etag]),
    [
      ["people/c1", "a1"],
      ["people/c2", "b2"],
      ["people/c4", "d1"],
    ],
  );
});
