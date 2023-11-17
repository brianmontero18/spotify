// Function to check if the access token has expired
const isAccessTokenExpired = () => {
  return global.tokenExpirationTimestamp <= Date.now();
};

// Function to renew the access token
const renewAccessToken = async () => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = data.body;
    spotifyApi.setAccessToken(access_token);

    // Update the new access token data in persistent storage
    global.accessToken = access_token;
    global.tokenExpirationTimestamp = Date.now() + (expires_in - tokenExpirationMargin) * 1000;

    console.log("Access token renewed successfully.");
  } catch (error) {
    console.error("Error while renewing access token:", error);
  }
};

// Check if the token has expired
const checkAccessTokenExpiration = (req, res, next) => {
  if (isAccessTokenExpired()) {
    renewAccessToken().then(() => {
      next();
    });
  } else {
    next();
  }
};

/* app.use(checkAccessTokenExpiration); */

module.exports = { checkAccessTokenExpiration };
