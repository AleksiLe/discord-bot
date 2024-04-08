const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies with name!"),
  async execute(interaction, client) {
    console.log(interaction.user);
    await interaction.reply(`Hello ${interaction.user.username}!`);
  },
};
