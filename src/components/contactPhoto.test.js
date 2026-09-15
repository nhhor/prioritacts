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

test("reuses the same photo URL while the 500 ms cooldown is active", () => {
  const url = "https://example.com/profile.jpg";

  const firstResult = getContactPhotoUrl(url, "Alice Example");
  const secondResult = getContactPhotoUrl(url, "Alice Example");

  assert.equal(firstResult, url);
  assert.equal(secondResult, url);
});
