var players = [];
var started = false;
var paused = false;
var channelID = '';
var answer = null;
var idInterval = null;
var { randomize } = require('../helpers/math');
var gameActions = require('./charley_actions');
function startGame(bot) {
    idInterval = setInterval(() => {
        if (!paused && started && players.length > 0) {
            let currPlayer = players[randomize(players.length) - 1];
            let currentGame = randomize(6);
            let actionString = '';
            switch (currentGame) {
                case 1:
                    actionString = gameActions.giveSips();
                    bot.channels.cache
                        .get(channelID)
                        .send(`<@${currPlayer}>, ${actionString}.`);
                    break;

                case 2:
                    actionString = gameActions.takeSips();
                    bot.channels.cache
                        .get(channelID)
                        .send(`<@${currPlayer}>, ${actionString}.`);
                    break;

                case 3:
                    actionString = gameActions.shareSips();
                    bot.channels.cache
                        .get(channelID)
                        .send(`<@${currPlayer}>, ${actionString}.`);
                    break;

                case 4:
                    actionString = gameActions.giveSips(players);
                    bot.channels.cache
                        .get(channelID)
                        .send(`<@${currPlayer}>, ${actionString}.`);
                    break;

                case 5:
                    actionString = gameActions.shareSips(players);
                    bot.channels.cache
                        .get(channelID)
                        .send(`<@${currPlayer}>, ${actionString}.`);
                    break;

                case 6:
                    actionString = gameActions.category();
                    bot.channels.cache
                        .get(channelID)
                        .send(`<@${currPlayer}>, ${actionString}.`);
                    paused = true;
                case 7:
                    bot.channels.cache
                        .get(channelID)
                        .send(`Everyone drink one sip !`);
                    break;

                case 8:
                    let number1 = randomize(12);
                    let number2 = randomize(12);
                    answer = number1 * number2;
                    paused = true;
                    bot.channels.cache
                        .get(channelID)
                        .send(
                            `Answer this question: Calculate ${number1}x${number2}.`
                        );
                    break;

                case 9:
                    answer = randomize(8500, 1050);
                    paused = true;
                    bot.channels.cache
                        .get(channelID)
                        .send(`Type the number "${answer}" in chat.`);
                    break;
            }
        }
    }, 5000);
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
        paused = false;
        answer = null;
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
        answer = null;
        bot.channels.cache.get(channelID).send(`The game have resumed.`);
        return true;
    } else {
        return false;
    }
};

module.exports.tryAnswer = (pAnswer, msgObj) => {
    if (answer !== null && answer == pAnswer) {
        paused = false;
        answer = null;
        msgObj.reply(` you won, give ${randomize(3, 1)} sips`);
    }
};