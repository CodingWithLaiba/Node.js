import "dotenv/config";

import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'create',
    description: 'Create Short url',
  },
];
const rest = new REST({ version: '10' }).setToken(process.env.Token)

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands('1522580986812956724'), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}