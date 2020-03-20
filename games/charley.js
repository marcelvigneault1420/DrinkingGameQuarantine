var players = [];
var started = false;
var paused = false;
var channelID = '';
var idInterval = null;
var { randomize } = require('../helpers/math');
var { actionsArray, tryAnswer, deleteAnswer } = require('./charley_actions');

module.exports.runAllTests = (pBot, pCurrPlayer, pChannel) => {
    channelID = pChannel;
    players = [pCurrPlayer, pCurrPlayer];

    for (let i = 0; i < actionsArray.length; ++i) {
        pBot.channels.cache.get(channelID).send(`TEST ACTION ${i + 1}`);
        playAGame(pBot, pCurrPlayer, i);
    }

    pBot.channels.cache.get(channelID).send(`TEST WRONG ACTION`);
    playAGame(pBot, pCurrPlayer, actionsArray.length);

    channelID = '';
    players = [];
};

module.exports.logCurrentGame = () => {
    console.log(channelID);
    console.log(players);

    return false;
};

function playAGame(bot, currPlayer, currentGame) {
    let action = actionsArray[currentGame];

    if (action !== undefined) {
        let actionString = action.func(currPlayer);
        paused = action.needPause;

        if (actionString.length > 0) {
            bot.channels.cache.get(channelID).send(actionString);
            return;
        }
    }

    bot.channels.cache
        .get(channelID)
        .send(`There was a bug with the bot, everyone drink one anyway !`);
}

function startGame(bot) {
    idInterval = setInterval(() => {
        if (!paused && started && players.length > 0) {
            let currPlayer = players[randomize(players.length, -1)];
            let currentGame = randomize(actionsArray.length, -1);
            playAGame(bot, currPlayer, currentGame);
        }
    }, 1000);
}

module.exports.addUser = function(msgObj) {
    if (started && !players.includes(msgObj.author.id)) {
        players = [msgObj.author.id, ...players];
        msgObj.reply(` welcome to the game`);
        return true;
    }

    return false;
};

module.exports.play = function(bot, pChannelId, pUserList = []) {
    if (!started) {
        started = true;
        players = [...pUserList];
        channelID = pChannelId;

        deleteAnswer();

        startGame(bot);

        if (players.length === 0) {
            bot.channels.cache
                .get(channelID)
                .send(
                    `The game have been started` +
                    '\n' +
                    `type !join to join the game, !stop to stop it.`
                );
        }

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
        deleteAnswer();
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
        deleteAnswer();
        bot.channels.cache.get(channelID).send(`The game have resumed.`);
        return true;
    } else {
        return false;
    }
};

module.exports.tryAnswer = (pAnswer, msgObj) => {
    let idResult = tryAnswer(pAnswer);
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