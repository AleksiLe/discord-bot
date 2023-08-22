const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require('discord-player');



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
        async execute(interaction, client) {
            if(!interaction.member.voice.channel) { return await interaction.reply({ content: 'You need to enter a voice channel before use the command', ephemeral: true }) }
            
            const queue = await client.player.nodes.create(interaction.guild.id)
            
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new EmbedBuilder()

            if (interaction.options.getSubcommand() === "song") {
                let url = interaction.options.getString('url')
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                console.log(result.tracks)
                if (result.tracks.length === 0)
                    return interaction.reply('No results')
                
                    const song = result.tracks[0]
                    await queue.addTrack(song)
                    embed
                        .setDescription(`** [${song.title}](${song.url})** has been added to the Queue`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({ text: `Duration: ${song.duration}`})
            }
            //handle playlist and search

            if (!queue.isPlaying()) await queue.node.play()
            await interaction.reply( {
                embeds: [embed]
            }) 
        }, 
}; 