const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    botToken: process.env.BOT_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
}