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

        if (!isBot && message.substring(0, 1) === '!') {
            let command = message.substring(0, 2);
            let success = false;
            switch (command) {
                case '!c':
                    success = cards(message, msgObj);
                    break;

                case '!d':
                    success = dices(message, msgObj);
                    break;

                case '!j':
                    success = charley.addUser(msgObj);
                    break;

                case '!l':
                    success = charley.logCurrentGame();

                case '!p':
                    success = charley.play(bot, idChannel);
                    break;

                case '!r':
                    success = charley.resume(bot);
                    break;

                case '!s':
                    success = charley.stop();
                    break;

                case '!t':
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