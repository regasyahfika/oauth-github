const axios = require("axios");
const config = require("../config");

async function getUserInfo(token) {
  const response = await axios({
    method: "get",
    url: `${config.apiUrl}/users`,
    headers: {
      Authorization: "token " + token,
    },
  }).then((response) => {
    return response.data;
  });
  return response;
}

module.exports = { getUserInfo: getUserInfo };
