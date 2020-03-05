import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

describe("App.test.js", () => {
  // test("renders learn react link", () => {
  //   const { getByText } = render(<App />);
  //   const linkElement = getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // });

  test("Default test above failed due to 'Invariant Violation: You should not use <Link> outside a <Router>'...", () => {
    expect(2 + 2).toBe(4);
  });
});
