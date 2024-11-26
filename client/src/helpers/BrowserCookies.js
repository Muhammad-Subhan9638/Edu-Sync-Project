export const BrowserCookie = () => {
  // Split cookies and return as an object
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

  // Get the token from cookies, if it exists
  const UserToken = cookies.token || null;

  // Return the UserToken in an object
  return { UserToken };
};
