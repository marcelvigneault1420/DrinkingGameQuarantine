//The prefix of the messages to trigger the bot
const PREFIX = '!';
const { dices, cards, CharleyGame } = require('../games');
let charley = null;
//Fill this array with a player array to avoid the /join on server restart.
const OVERRIDE_PLAYERS = [
    '95635008718376960',
    '139770579006914561',
    '637458807454433282',
    '214556025423003648',
    '693236413222879315',
    '564205655838162974'
];
module.exports = function(pBot) {
    pBot.on('message', msgObj => {
        let {
            content: message,
            author: { pBot: isBot, id: idUser },
            channel
        } = msgObj;

        //Ignore messages without prefix
        if (message.substring(0, PREFIX.length) === PREFIX) {
            let command = message.substring(0, PREFIX.length + 1);
            switch (command) {
                //Cards game command
                case `${PREFIX}c`:
                    cards(message, msgObj);
                    break;
                //Dices game command
                case `${PREFIX}d`:
                    dices(message, msgObj);
                    break;
                //Join the current game
                case `${PREFIX}j`:
                    if (charley !== null) charley.addPlayer(msgObj);
                    break;
                //Log the current game on the server
                case `${PREFIX}l`:
                    if (charley !== null) charley.logCurrentGame();
                    else console.log(`No game started`);
                    break;
                //Begin a new game
                case `${PREFIX}p`:
                    if (charley === null || !charley.isPlaying()) {
                        charley = new CharleyGame(channel, OVERRIDE_PLAYERS);
                        charley.startGame();
                    }
                    break;
                //Resume the current game when the timer is stopped by an answer or a minigame
                case `${PREFIX}r`:
                    if (charley !== null) charley.resumeGame();
                    break;
                //Stop the current game
                case `${PREFIX}s`:
                    if (charley !== null) charley.stop();
                    break;
                //Launch the tests of a game
                case `${PREFIX}t`:
                    if (charley === null || !charley.isPlaying()) {
                        charley = new CharleyGame(channel);
                        charley.testGame();
                    }
                    break;
            }
        }
        //If the message is not from a bot and there is no prefix, it's maybe an answer
        else if (!isBot) {
            if (charley !== null) charley.tryAnswer(msgObj);
        }
    });
};
