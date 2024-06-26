const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { clientId, guildId, botToken } = require("./config.js");
const { Player } = require("discord-player");

/* const db = require("./database/db.js");
const SlashLogger = require("./database/models/Slashlogger.js"); */

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  console.log("Event");
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction, client);
    /* const commandUrl = interaction.options.getString("url")
      ? interaction.options.getString("url")
      : null;
    SlashLogger.create({
      quildId: interaction.guildId,
      commandName: interaction.commandName,
      commandUrl: commandUrl,
      userId: interaction.user.id,
      username: interaction.user.username,
      timestamp: Date.now(),
    }); */ //Commented out because container cant reach mongodb now.
  } catch (error) {
    console.error(error);
    await interaction.followUp({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    filter: "audioonly",
    highWaterMark: 1 << 25,
  },
});

client.player.extractors.loadDefault();
client.login(botToken);
