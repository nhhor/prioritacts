import React from "react";
import { render } from "@testing-library/react";
import contactsReducer from "./../reducers/contacts-reducer";

describe("contactsReducer", () => {
  test("Should return default state if no action type is recognized", () => {
    expect(contactsReducer({}, { type: null })).toEqual({});
  });
});
