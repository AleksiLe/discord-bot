const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with name!'),
    async execute(interaction) {
        await interaction.reply(`Hello ${interaction.user.username}!`);
    },
};