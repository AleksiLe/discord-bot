const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const weather = require('weather-js');
const day = new Date().getDay();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Gets weather of the area')
        .addStringOption(option => option.setName('location').setDescription('place to check the weather from').setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const location = options.getString('location');

        await interaction.reply(`Let me Google that for you :)`);
        await weather.find({ search: `${location}`, degreeType: 'C' }, async function (err, result) {
            if (err) {
                console.log(err);
                interaction.editReply('There seems to be some error try again later :)');
            } else {
                if (result.length == 0) {
                    return interaction.editReply({ content: 'I could not find weather for this place :(' });

                } else {
                    let embed = MakeEmbed(result);
                    if (day > 0 && day < 6) {
                        embed = forecast(embed, result, day)

                        interaction.editReply({ content: ``, embeds: [embed] });
                    } else {
                        interaction.editReply({ content: ``, embeds: [embed] });
                    }



                }
            }
        })
    },
};


function MakeEmbed(result) {

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

    return embed;
}
function forecast(embed, result, day) {
    const name = result[0].location.name;
    const forecast = result[0].forecast[day].skytextday;
    const tempHigh = result[0].forecast[day].high;
    const tempLow = result[0].forecast[day].low;
    embed
        .setColor('Blue')
        .setTitle(`Current weather of ${name} and Tomorrow\'s forecast`)
        .addFields({ name: 'Tomorrow\'s weather', value: `${forecast}` })
        .addFields({ name: 'Tomorrow\'s high', value: `${tempHigh} °C` })
        .addFields({ name: 'Tomorrow\'s low', value: `${tempLow} °C` });

    return embed
}