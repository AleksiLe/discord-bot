const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { useQueue } = require("discord-player")



module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song!'
        ),
        //add subcommands for playlist and search
    async execute(interaction, client) {
            const queue = useQueue(interaction.guild.id)
            queue.node.skip()
            interaction.reply('Skipped song!')
        }
    }