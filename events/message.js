const PREFIX = '!';
const { dices, cards, CharleyGame } = require('../games');
let charley = null;

module.exports = function(pBot) {
    pBot.on('message', msgObj => {
        let {
            content: message,
            author: { pBot: isBot, id: idUser },
            channel
        } = msgObj;

        if (!isBot && message.substring(0, PREFIX.length) === PREFIX) {
            let command = message.substring(0, PREFIX.length + 1);
            switch (command) {
                case `${PREFIX}c`:
                    cards(message, msgObj);
                    break;

                case `${PREFIX}d`:
                    dices(message, msgObj);
                    break;

                case `${PREFIX}j`:
                    if (charley !== null) charley.addPlayer(msgObj);
                    break;

                case `${PREFIX}l`:
                    if (charley !== null) charley.logCurrentGame();
                    else console.log(`No game started`);
                    break;

                case `${PREFIX}p`:
                    if (charley === null || !charley.isPlaying()) {
                        charley = new CharleyGame(channel);
                        charley.startGame();
                    }
                    break;

                case `${PREFIX}r`:
                    if (charley !== null) charley.resumeGame();
                    break;

                case `${PREFIX}s`:
                    if (charley !== null) charley.stop();
                    break;

                case `${PREFIX}t`:
                    if (charley === null || !charley.isPlaying()) {
                        charley = new CharleyGame(channel);
                        charley.testGame();
                    }
                    break;
            }
        } else if (!isBot) {
            if (charley !== null) charley.tryAnswer(msgObj);
        }
    });
};
