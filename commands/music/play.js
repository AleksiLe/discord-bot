const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays given sound!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("song")
        .setDescription("Loads a single song from url")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("The song's url")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("playlist")
        .setDescription("Loads a playlist from url")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("The playlist's url")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Finds and loads a single song with search words")
        .addStringOption((option) =>
          option
            .setName("search")
            .setDescription("Insert search parameters")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    // Bot will wait for logic to process and only allows one editReply
    // This is to prevent the bot from sending multiple messages and to allow
    // the bot to edit the original message once.
    await interaction.deferReply({ ephemeral: true });
    if (!interaction.member.voice.channel) {
      return await interaction.editReply({
        content: "You need to enter a voice channel before use the command",
        ephemeral: true,
      });
    }

    const queue = await client.player.nodes.create(interaction.guild.id);

    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);
    let embed = new EmbedBuilder();
    //song
    if (interaction.options.getSubcommand() === "song") {
      let url = interaction.options.getString("url");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      });
      if (result.tracks.length === 0)
        return interaction.editReply("No results");

      const song = result.tracks[0];
      await queue.addTrack(song);
      embed
        .setDescription(
          `** [${song.title}](${song.url})** has been added to the Queue`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
        .setColor("Red");
    }
    //playlist
    else if (interaction.options.getSubcommand() === "playlist") {
      let url = interaction.options.getString("url");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
      });
      if (result.tracks.length === 0)
        return interaction.editReply("No results");

      const playlist = result.playlist;
      await queue.addTrack(result.tracks);
      embed
        .setDescription(
          `** [${playlist.title}](${playlist.url})** has been added to the Queue`
        )
        .setThumbnail(song.thumbnail)
        .setColor("Red");
    }
    //search
    else if (interaction.options.getSubcommand() === "search") {
      let url = interaction.options.getString("searchterms");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });
      if (result.tracks.length === 0)
        return interaction.editReply("No results");

      const song = result.tracks[0];
      await queue.addTrack(song);
      embed
        .setDescription(
          `** [${song.title}](${song.url})** has been added to the Queue`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
        .setColor("Red");
    }

    if (!queue.isPlaying()) await queue.node.play();
    await interaction.editReply({
      embeds: [embed],
      ephemeral: false,
    });
  },
};
