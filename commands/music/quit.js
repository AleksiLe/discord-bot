const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { useQueue } = require("discord-player")



module.exports = {
    data: new SlashCommandBuilder()
        .setName('quit')
        .setDescription('Disconnect bot from channel!'
        ),
        //add subcommands for playlist and search
    async execute(interaction, client) {
            const queue = useQueue(interaction.guild.id)
            queue.delete()
            interaction.reply('See you!')
        }
    }