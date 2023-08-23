const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Gets weather of the area')
        .addStringOption(option => option.setName('location').setDescription('place to check the weather from').setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const location = options.getString('location')
        await interaction.reply(`Let me Google that for you :)`);
        await weather.find({ search: `${location}`, degreeType: 'C' }, async function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result.length == 0) {
                    return interaction.editReply({ content: 'I could not find weather for this place :(' });

                } else {
                    const temp = result[0].current.temperature;
                    const type = result[0].current.skytext;
                    const name = result[0].location.name;
                    const tempFeel = result[0].current.feelslike;
                    const wind = result[0].current.windspeed;


                    const embed = new EmbedBuilder()
                        .setColor('Green')
                        .setTitle(`Current weather of ${name}`)
                        .addFields({ name: 'Temperature', value: `${temp} °C` })
                        .addFields({ name: 'Weather', value: `${type}` })
                        .addFields({ name: 'Temperature feels like', value: `${tempFeel} °C` })
                        .addFields({ name: 'Wind', value: `${wind}` })
                    interaction.editReply({ content: ``, embeds: [embed] });
                }
            }
        })
    },
};