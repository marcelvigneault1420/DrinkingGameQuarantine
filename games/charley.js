var players = [];
var started = false;
var paused = false;
var channelID = '';
var answer = 0;
var idInterval = null;
var { randomize } = require('../helpers/math');
var gameActions = require('./charley_actions');
function startGame(bot) {
    idInterval = setInterval(() => {
        if (!paused && started && players.length > 0) {
            if (randomize(4) === 1) {
                let currentGame = randomize(2);

                switch (currentGame) {
                    case 1:
                        bot.channels.cache
                            .get(channelID)
                            .send(`Everyone drink one sip !`);
                        break;

                    case 2:
                        let number1 = randomize(12);
                        let number2 = randomize(12);
                        answer = number1 * number2;
                        paused = true;
                        bot.channels.cache
                            .get(channelID)
                            .send(
                                `Answer this question: Calculate ${number1}x${number2}`
                            );
                        break;
                }
            } else {
                let currPlayer = players[randomize(players.length) - 1];
                let currentGame = randomize(7);
                let actionString = '';
                switch (currentGame) {
                    case 1:
                        actionString = gameActions.giveSips();
                        break;

                    case 2:
                        actionString = gameActions.takeSips();
                        break;

                    case 3:
                        actionString = gameActions.shareSips();
                        break;

                    case 4:
                        actionString = gameActions.giveSips(players);
                        break;

                    case 5:
                        actionString = gameActions.shareSips(players);
                        break;

                    case 6:
                        actionString = gameActions.category();
                        paused = true;
                }

                bot.channels.cache
                    .get(channelID)
                    .send(`<@${currPlayer}>, ${actionString}`);
            }
        }
    }, 25000);
}

module.exports.addUser = function(msgObj) {
    if (started && !players.includes(msgObj.author.id)) {
        players.push(msgObj.author.id);
        msgObj.reply(` welcome to the game`);
        return true;
    }

    return false;
};

module.exports.play = function(bot, pChannelId) {
    if (!started) {
        started = true;
        players = [];
        channelID = pChannelId;

        startGame(bot);

        bot.channels.cache.get(channelID).send(`The game have been started`);
        bot.channels.cache
            .get(channelID)
            .send(`type !join to join the game, !stop to stop it.`);

        return true;
    } else {
        return false;
    }
};

module.exports.stop = () => {
    if (idInterval !== null) {
        clearInterval(idInterval);
    }

    if (started) {
        started = false;
        players = [];
        channelID = '';
        idInterval = null;

        return true;
    } else {
        return false;
    }
};

module.exports.resume = bot => {
    if (paused) {
        paused = false;
        bot.channels.cache.get(channelID).send(`The game have resumed.`);
        return true;
    } else {
        return false;
    }
};

module.exports.tryAnswer = (pAnswer, msgObj) => {
    console.log('test');
    console.log(answer);
    console.log(pAnswer);

    if (answer == pAnswer) {
        paused = false;
        answer = 0;
        msgObj.reply(` you won, give ${randomize(3, 1)} sips`);
    }
};
