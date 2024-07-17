// Must execute this file to register the slash command
require("dotenv").config();

const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with pong",
  },
  {
    name: "link",
    description: "Paste the provided code in app to link your account",
    options: [
      {
        name: "code",
        description: "The code provided in the app",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "add",
    description: "Add new expenses",
    options: [
      {
        name: "remark",
        description: "expense remark",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "amount",
        description: "total amount",
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

// IIFE
(async () => {
  try {
    console.log("Registering slash command");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.BOT_ID,
        process.env.SERVER_ID
      ),
      { body: commands }
    );
    console.log("Successfully registered slash command");
  } catch (error) {
    console.log(error);
  }
})();
