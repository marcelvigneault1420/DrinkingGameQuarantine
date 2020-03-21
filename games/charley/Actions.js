const { randomize } = require('../../helpers/math');
const probabilityArray = [1, 1, 1, 2, 2, 3];
const ActionType = require('./ActionTypeEnum');

getNbSips = (add = 0) => {
    return probabilityArray[randomize(probabilityArray.length, -1)] + add;
};

giveSips = currPlayer => {
    return {
        string: `<@${currPlayer}>, give ${getNbSips()} sips.`,
        needPause: false,
        type: ActionType.TEXT
    };
};
takeSips = currPlayer => {
    return {
        string: `<@${currPlayer}>, take ${getNbSips()} sips.`,
        needPause: false,
        type: ActionType.TEXT
    };
};

shareSips = currPlayer => {
    // Determines the number of sips to drink
    let nbSips = getNbSips();

    return {
        string: `<@${currPlayer}>, drink ${nbSips} sips and give ${nbSips} to someone else.`,
        needPause: false,
        type: ActionType.TEXT
    };
};

category = currPlayer => {
    return {
        string:
            `<@${currPlayer}>, choose a category game and all the next players must say a word in that category.` +
            '\n' +
            `The first who fail have to drink ${getNbSips(1)} sips.` +
            '\n' +
            `Use the command !resume when you have finish.`,
        needPause: true,
        type: ActionType.TEXT
    };
};

rime = currPlayer => {
    return {
        string:
            `<@${currPlayer}>, choose a word and all the next players must say a word that rhymes with it.` +
            '\n' +
            `The first who fail have to drink ${getNbSips(1)} sips. ` +
            '\n' +
            `Use the command !resume when you have finish.`,
        needPause: true,
        type: ActionType.TEXT
    };
};

rule = currPlayer => {
    return {
        string:
            `<@${currPlayer}>, add a new rule everyone have to follow.` +
            '\n' +
            `Anyone who fail to follow the new rule have to drink 1 sip. ` +
            '\n' +
            `Use the command !resume when you have finish.`,
        needPause: true,
        type: ActionType.TEXT
    };
};

multiplication = () => {
    let number1 = randomize(12);
    let number2 = randomize(12);
    waitingAnswer = number1 * number2;
    return {
        string: `${number1}x${number2}. Type the answer in chat before everyone else`,
        needPause: true,
        answer: waitingAnswer,
        type: ActionType.FIRST_ANSWER
    };
};

randNumber = () => {
    waitingAnswer = randomize(9500, 10050);
    return {
        string: `Type the number "${waitingAnswer}" in chat.`,
        needPause: true,
        answer: waitingAnswer,
        type: ActionType.LAST_ANSWER
    };
};

everyoneDrink = () => {
    return {
        string: `Everyone drink 1 sip.`,
        needPause: false,
        type: ActionType.TEXT
    };
};

module.exports.actionsArray = [
    { func: giveSips },
    { func: takeSips },
    { func: shareSips },
    { func: everyoneDrink },
    { func: category },
    { func: rime },
    { func: multiplication },
    { func: randNumber },
    { func: rule }
];
