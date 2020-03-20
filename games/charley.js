var players = [];
var started = false;
var paused = false;
var channelID = '';
var idInterval = null;
var { randomize } = require('../helpers/math');
var gameActions = require('./charley_actions');
const NB_GAMES = 9;

module.exports.runAllText = (pBot, pCurrPlayer, pChannel) => {
    channelID = pChannel;
    players = [pCurrPlayer, pCurrPlayer];

    for (let i = 0; i < NB_GAMES; ++i) {
        pBot.channels.cache.get(channelID).send(`TEST ACTION ${i + 1}`);
        playAGame(pBot, pCurrPlayer, i + 1);
    }
    pBot.channels.cache.get(channelID).send(`TEST WRONG ACTION`);
    playAGame(pBot, pCurrPlayer, NB_GAMES + 1);

    channelID = '';
    players = [];
};

function playAGame(bot, currPlayer, currentGame) {
    let actionString = '';
    switch (currentGame) {
        case 1:
            actionString = gameActions.giveSips(currPlayer, players.length);
            break;

        case 2:
            actionString = gameActions.takeSips(currPlayer);
            break;

        case 3:
            actionString = gameActions.shareSips(currPlayer, players.length);
            break;

        case 4:
            actionString = gameActions.category(currPlayer);
            paused = true;
            break;

        case 5:
            actionString = gameActions.rime(currPlayer);
            paused = true;
            break;

        case 6:
            actionString = `Everyone drink one sip !`;
            break;

        case 7:
            actionString = gameActions.multiplication();
            paused = true;
            break;

        case 8:
            actionString = gameActions.randNumber();
            paused = true;
            break;

        case 9:
            actionString = gameActions.rule(currPlayer);
            paused = true;
            break;
    }

    if (actionString.length > 0) {
        bot.channels.cache.get(channelID).send(actionString);
    } else {
        bot.channels.cache
            .get(channelID)
            .send(`There was a bug with the bot, everyone drink one anyway !`);
    }
}

function startGame(bot) {
    idInterval = setInterval(() => {
        if (!paused && started && players.length > 0) {
            let currPlayer = players[randomize(players.length) - 1];
            let currentGame = randomize(NB_GAMES);
            playAGame(bot, currPlayer, currentGame);
        }
    }, 30000);
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
        gameActions.deleteAnswer();

        startGame(bot);

        bot.channels.cache
            .get(channelID)
            .send(
                `The game have been started` +
                '\n' +
                `type !join to join the game, !stop to stop it.`
            );

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
        players = [];
        gameActions.deleteAnswer();
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
        gameActions.deleteAnswer();
        bot.channels.cache.get(channelID).send(`The game have resumed.`);
        return true;
    } else {
        return false;
    }
};

module.exports.tryAnswer = (pAnswer, msgObj) => {
    let idResult = gameActions.tryAnswer(pAnswer);
    if (idResult === 1) {
        paused = false;
        msgObj.reply(` you won, give ${randomize(3, 1)} sips`);
    } else if (idResult === 2) {
        msgObj.reply(` you failed, take 1 sip`);
    }
};

module.exports.isPlaying = () => {
    return started;
};