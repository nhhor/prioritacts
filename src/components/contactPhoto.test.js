const test = require("node:test");
const assert = require("node:assert/strict");
const { getContactPhotoUrl } = require("./contactPhoto.js");

test("keeps Googleusercontent photo URLs", () => {
  const url = "https://lh3.googleusercontent.com/a-/ACB-R5QXQ4...";
  assert.equal(getContactPhotoUrl(url), url);
});

test("keeps normal HTTP photo URLs", () => {
  const url = "https://example.com/profile.jpg";
  assert.equal(getContactPhotoUrl(url), url);
});
