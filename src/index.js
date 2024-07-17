require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");
const https = require("https");
const linkAccount = require("./features/link_account");

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

bot.login(process.env.BOT_TOKEN);

// Startup
bot.on("ready", () => {
  console.log(`${bot.user.username} is online`);
});

// Message event
bot.on("messageCreate", async (message) => {
  // Send by bot
  if (message.author.bot) return;
});

// Interaction event
bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    interaction.reply("pong");
  }
  // Link account
  else if (commandName === "link") {
    // Get the code from the interaction
    const code = interaction.options.getString("code");

    // Check if the code is valid
    if (!code) {
      return interaction.reply("Invalid code");
    }

    // Get the user ID
    const userId = interaction.user.id;

    // REST API call to the backend
    await linkAccount(code, userId)
      .then((response) => {
        if (response.data.status === 200) {
          let message = `Account successfully linked with ${response.data.body.email}`;
          return interaction.reply(message);
        } else {
          return interaction.reply("Account linking failed");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        return interaction.reply(
          "Unexpected error occurred. Please try again later."
        );
      });
  } else if (commandName === "add") {
    const remark = interaction.options.getString("remark");
    const amount = interaction.options.getInteger("amount");

    if (!remark || !amount) {
      return interaction.reply("Invalid input");
    }

    let message = `New expense added with remark: ${remark} and amount: ${amount}`;
    return interaction.reply(message);
  }
});

// Error event
bot.on("error", (error) => {
  console.error("An error occurred:", error);
  if (error.message) {
    console.error("Error message:", error.message);
  }
  if (error.stack) {
    console.error("Stack trace:", error.stack);
  }
});

// Reconnecting event
bot.on("reconnecting", () => {
  console.log("Reconnecting...");
});

// Disconnect event
bot.on("disconnect", () => {
  console.log("Disconnected");
});
