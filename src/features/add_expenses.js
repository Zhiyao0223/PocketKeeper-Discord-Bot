const config = require("../../config.js");
const https = require("https");
const axios = require("axios");

async function addExpenses(remark, amount, userId) {
  const data = {
    remark: remark,
    amount: amount,
    discord_id: userId,
    process: "add_expenses",
  };

  const fullUrl = `${config.database_url}/api/bot_add_expenses.php`;

  return axios
    .post(fullUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Response:", response.data);
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

module.exports = addExpenses;
