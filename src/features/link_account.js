const config = require("../../config.js");
const https = require("https");
const axios = require("axios");

async function linkAccount(code, userId) {
  const data = {
    code: code,
    discord_id: userId,
    process: "link_account",
  };

  const fullUrl = `${config.database_url}/api/verify_discord.php`;

  return axios
    .post(fullUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("Response:", response.data);
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

module.exports = linkAccount;
