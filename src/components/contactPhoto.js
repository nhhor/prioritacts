const PHOTO_REQUEST_COOLDOWN_MS = 500;
let lastPhotoRequestAt = 0;
let lastPhotoRequestUrl = "";

function getFallbackAvatar(displayName = "") {
  const initials =
    (displayName || "?")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0] && part[0].toUpperCase())
      .join("") || "?";

  return (
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect width="50" height="50" rx="25" fill="#d9d9d9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">${initials}</text></svg>`,
    )
  );
}

function getContactPhotoUrl(photoUrl, displayName = "") {
  const fallbackUrl = getFallbackAvatar(displayName);

  if (!photoUrl || typeof photoUrl !== "string") {
    return fallbackUrl;
  }

  const normalizedUrl = photoUrl.trim();
  if (!normalizedUrl) {
    return fallbackUrl;
  }

  const now = Date.now();
  if (
    normalizedUrl === lastPhotoRequestUrl &&
    now - lastPhotoRequestAt < PHOTO_REQUEST_COOLDOWN_MS
  ) {
    return lastPhotoRequestUrl;
  }

  if (
    normalizedUrl.startsWith("data:image/") ||
    /^https?:\/\//i.test(normalizedUrl)
  ) {
    lastPhotoRequestUrl = normalizedUrl;
    lastPhotoRequestAt = now;
    return normalizedUrl;
  }

  lastPhotoRequestUrl = fallbackUrl;
  lastPhotoRequestAt = now;
  return fallbackUrl;
}

export { getContactPhotoUrl, getFallbackAvatar };
export default {
  getContactPhotoUrl,
  getFallbackAvatar,
};
