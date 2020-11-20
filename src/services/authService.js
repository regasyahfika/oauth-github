const config = require("../config");

function redirectUri() {
  return `${config.oauthUrl}/authorize?client_id=${config.clientId}&redirect_uri=http://localhost:3000/oauth-github-callback`;
}

module.exports = {
  redirectUri: redirectUri
};
