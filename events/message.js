var { dices, cards, charley } = require('../games');
var { randomize } = require('../helpers/math');
module.exports = function(bot) {
    bot.on('message', msgObj => {
        let {
            content: message,
            author: { bot: isBot },
            channel: { id: idChannel }
        } = msgObj;

        if (!isBot && message.substring(0, 1) === '!') {
            let command = message.substring(0, 2);
            let success = false;
            switch (command) {
                case '!d':
                    success = dices(message, msgObj);
                    break;

                case '!c':
                    success = cards(message, msgObj);
                    break;

                case '!j':
                    success = charley.addUser(msgObj);
                    break;

                case '!p':
                    success = charley.play(bot, idChannel);
                    break;

                case '!s':
                    success = charley.stop();
                    break;

                case '!r':
                    success = charley.resume(bot);
                    break;

                default:
                    success = false;
                    break;
            }

            if (!success)
                msgObj.reply(` fuck you you drink ${randomize(5)} sips`);
        } else if (!isBot) {
            charley.tryAnswer(message, msgObj);
        }
    });
};
