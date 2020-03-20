var { runAllText } = require('../games/charley');
var gameActions = require('../games/charley_actions');
module.exports.basicTests = (pBot, pCurrUser, pChannel) => {
    runAllText(pBot, pCurrUser, pChannel);

    gameActions.deleteAnswer();
    pBot.channels.cache.get(pChannel).send(`TEST: Write !t1 in the chat`);
};

module.exports.wrintingTests = (pBot, pChannel, pTestNumber) => {
    if (pTestNumber == 1) {
        if (gameActions.tryAnswer(pTestNumber) == -1) {
            gameActions.setAnswer(3);
            pBot.channels.cache
                .get(pChannel)
                .send(`SUCCEED: Write !t2 in the chat`);
        } else {
            pBot.channels.cache.get(pChannel).send(`BUG WITH TEST WRITING 1`);
        }
    } else if (pTestNumber == 2) {
        if (gameActions.tryAnswer(pTestNumber) == 2) {
            pBot.channels.cache
                .get(pChannel)
                .send(`SUCCEED: Write !t3 in the chat`);
        } else {
            pBot.channels.cache.get(pChannel).send(`BUG WITH TEST WRITING 2`);
        }
    } else if (pTestNumber == 3) {
        if (gameActions.tryAnswer(pTestNumber) == 1) {
            pBot.channels.cache.get(pChannel).send(`SUCCEED: All tests done`);
        } else {
            pBot.channels.cache.get(pChannel).send(`BUG WITH TEST WRITING 3`);
        }
    }
};