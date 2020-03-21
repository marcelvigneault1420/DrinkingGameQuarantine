const OVERRIDE_ARRAY = ['95635008718376960'];
const OVERRIDE_CHANNEL = '519305408742162484';
const OVERRIDE = false;
const { charley } = require('../games');
module.exports = function(bot) {
    bot.on('ready', () => {
        console.log(`Bot is online`);

        if (OVERRIDE) {
            charley.play(bot, OVERRIDE_CHANNEL, OVERRIDE_ARRAY);
        }
    });
};
