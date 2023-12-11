const dotenv = require('dotenv');

dotenv.config({ path: './dev.env' });

module.exports = {
    clientToken: process.env.CLIENT_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
}