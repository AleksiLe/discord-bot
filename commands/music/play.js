const { SlashCommandBuilder, MessageEmbed } = require("discord.js");
const { QueryType } = require('discord-player');
const { execute } = require("../fun/hello");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays given sound!')
        .addSubcommand((subcommand) =>
            subcommand.setName('song')
            .setDescription('Loads a single song from url')
            .addStringOption((option) => option.setName('url').setDescription("the song's url").setRequired(true))
            ),
        //add subcommands for playlist and search
    /* run:  async ({client, interaction})  => {
        if (!interaction.member.voice.channel)
            return interaction.editReply('You need to be in VC to use this command.')

            const queue = await client.player.createQueue(interaction.quild)
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new MessageEmbed()

            if (interaction.options.getSubcommand() === "song") {
                let url = interaction.options.getString('url')
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if (result.tracks.length === 0)
                    return interaction.editReply('No results')
                
                    const song = result.tracks[0]
                    await queue.addTrack(song)
                    embed
                        .setDescription(`** [${song.title}](${song.url})** has been added to the Queue`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({ text: `Duration: ${song.duration}`})
            }
            //handle playlist and search
    } */
    async execute(client, interaction) {
        if (!interaction.member.voice.channel)
            return interaction.editReply('You need to be in VC to use this command.')

            const queue = await client.player.createQueue(interaction.quild)
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new MessageEmbed()

            if (interaction.options.getSubcommand() === "song") {
                let url = interaction.options.getString('url')
                console.log(url)
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if (result.tracks.length === 0)
                    return interaction.editReply('No results')
                
                    const song = result.tracks[0]
                    await queue.addTrack(song)
                    embed
                        .setDescription(`** [${song.title}](${song.url})** has been added to the Queue`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({ text: `Duration: ${song.duration}`})
            }
            //handle playlist and search
    }
};