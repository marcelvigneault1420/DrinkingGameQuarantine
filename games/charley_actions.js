var { randomize } = require('../helpers/math');
var probabilityArray = [1, 1, 1, 2, 2, 3];
var waitingAnswer = null;
var lastAnswer = new Date();

getNbSips = (add = 0) => {
    return probabilityArray[randomize(probabilityArray.length, -1)] + add;
};

giveSips = currPlayer => {
    return `<@${currPlayer}>, give ${getNbSips()} sips.`;
};
takeSips = currPlayer => {
    return `<@${currPlayer}>, take ${getNbSips()} sips.`;
};

shareSips = currPlayer => {
    // Determines the number of sips to drink
    let nbSips = getNbSips();

    return `<@${currPlayer}>, drink ${nbSips} sips and give ${nbSips} to someone else.`;
};

category = currPlayer => {
    return (
        `<@${currPlayer}>, choose a category game and all the next players must say a word in that category.` +
        '\n' +
        `The first who fail have to drink ${getNbSips(1)} sips.` +
        '\n' +
        `Use the command !resume when you have finish.`
    );
};

rime = currPlayer => {
    return (
        `<@${currPlayer}>, choose a word and all the next players must say a word that rhymes with it.` +
        '\n' +
        `The first who fail have to drink ${getNbSips(1)} sips. ` +
        '\n' +
        `Use the command !resume when you have finish.`
    );
};

rule = currPlayer => {
    return (
        `<@${currPlayer}>, add a new rule everyone have to follow.` +
        '\n' +
        `Anyone who fail to follow the new rule have to drink 1 sip. ` +
        '\n' +
        `Use the command !resume when you have finish.`
    );
};

multiplication = () => {
    let number1 = randomize(12);
    let number2 = randomize(12);
    waitingAnswer = number1 * number2;
    return `${number1}x${number2}. Type the answer in chat before everyone else`;
};

randNumber = () => {
    waitingAnswer = randomize(9500, 10050);
    return `Type the number "${waitingAnswer}" in chat.`;
};

everyoneDrink = () => {
    return `Everyone drink 1 sip.`;
};

module.exports.tryAnswer = pAnswer => {
    if (waitingAnswer !== null) {
        if (waitingAnswer == pAnswer) {
            waitingAnswer = null;
            lastAnswer = new Date();
            return 1;
        } else {
            return 2;
        }
    } else {
        let now = new Date();
        if (now - lastAnswer < 1500) {
            return 2;
        }
    }

    return -1;
};

module.exports.deleteAnswer = () => {
    waitingAnswer = null;
};

module.exports.setAnswer = pAnswer => {
    waitingAnswer = pAnswer;
};

module.exports.actionsArray = [
    { func: giveSips, needPause: false },
    { func: takeSips, needPause: false },
    { func: shareSips, needPause: false },
    { func: everyoneDrink, needPause: false },
    { func: category, needPause: true },
    { func: rime, needPause: true },
    { func: multiplication, needPause: true },
    { func: randNumber, needPause: true },
    { func: rule, needPause: true }
];
