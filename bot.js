const discord = require('discord.js');
const bot = new discord.Client();

require('dotenv').config();

require('./events/start')(bot);
require('./events/message')(bot);

bot.login(process.env.TOKEN);
