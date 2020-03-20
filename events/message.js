const PREFIX = '!';
var { dices, cards, charley } = require('../games');
var {
    basicTests: charleyBasicTests,
    wrintingTests: charleyWritingTests
} = require('../tests/charley');
var { randomize } = require('../helpers/math');
module.exports = function(bot) {
    bot.on('message', msgObj => {
        let {
            content: message,
            author: { bot: isBot, id: idUser },
            channel: { id: idChannel }
        } = msgObj;

        if (!isBot && message.substring(0, PREFIX.length) === PREFIX) {
            let command = message.substring(0, PREFIX.length + 1);
            let success = false;
            switch (command) {
                case `${PREFIX}c`:
                    success = cards(message, msgObj);
                    break;

                case `${PREFIX}d`:
                    success = dices(message, msgObj);
                    break;

                case `${PREFIX}j`:
                    success = charley.addUser(msgObj);
                    break;

                case `${PREFIX}l`:
                    success = charley.logCurrentGame();

                case `${PREFIX}p`:
                    success = charley.play(bot, idChannel);
                    break;

                case `${PREFIX}r`:
                    success = charley.resume(bot);
                    break;

                case `${PREFIX}s`:
                    success = charley.stop();
                    break;

                case `${PREFIX}t`:
                    if (charley.isPlaying()) {
                        success = false;
                    } else {
                        success = true;
                        if (message.length > 2) {
                            charleyWritingTests(bot, idChannel, message[2]);
                        } else {
                            charleyBasicTests(bot, idUser, idChannel);
                        }
                    }
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
