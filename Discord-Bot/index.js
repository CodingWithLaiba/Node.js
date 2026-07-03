import "dotenv/config";

import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generting short ID for" + url,
    });
  }
  console.log(message.content);
  console.log(message);
  message.reply({
    content: "Hi From Bot👋",
  });
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  await interaction.reply({
    content: "Pong!",
  });
});
client.login(process.env.TOKEN);
