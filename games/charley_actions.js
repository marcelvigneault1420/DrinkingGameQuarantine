var { randomize } = require('../helpers/math');
var probabilityArray = [1, 1, 1, 2, 2, 3];
var categoryArray = ['Car brand', 'Color', '', '', '', '', '', '', ''];
var { rollDices } = require('../games/dices');
var waitingAnswer = null;
var lastAnswer = new Date();

getNbSips = (add = 0) => {
    return probabilityArray[randomize(probabilityArray.length) - 1] + add;
};
module.exports.giveSips = (currPlayer, nbPlayer) => {
    let sentence = '';
    if (nbPlayer > 1) {
        sentence = `give ${getNbSips()} sips`;
    }
    // If your sad and playing alone
    else {
        sentence = `playing alone is sad... Drink ${getNbSips()} sips`;
    }

    return `<@${currPlayer}>, ${sentence}.`;
};
module.exports.takeSips = currPlayer => {
    return `<@${currPlayer}>, take ${getNbSips()} sips.`;
};

module.exports.shareSips = (currPlayer, nbPlayer) => {
    // Determines the number of sips to drink
    let nbSips = getNbSips();
    let sentence = '';
    if (nbPlayer > 1) {
        sentence = `drink ${nbSips} sips and give ${nbSips} to someone else`;
    }
    // If your sad and playing alone
    else {
        sentence = `playing alone is sad... Drink ${nbSips} sips and give ${nbSips} to yourself`;
    }

    return `<@${currPlayer}>, ${sentence}.`;
};

module.exports.category = currPlayer => {
    return (
        `<@${currPlayer}>, choose a category game and all the next players must say a word in that category.` +
        '\n' +
        `The first who fail have to drink ${getNbSips(1)} sips.` +
        '\n' +
        `Use the command !resume when you have finish.`
    );
};

module.exports.rime = currPlayer => {
    return (
        `<@${currPlayer}>, choose a word and all the next players must say a word that rhymes with it.` +
        '\n' +
        `The first who fail have to drink ${getNbSips(1)} sips. ` +
        '\n' +
        `Use the command !resume when you have finish.`
    );
};

module.exports.rule = currPlayer => {
    return (
        `<@${currPlayer}>, add a new rule everyone have to follow.` +
        '\n' +
        `Anyone who fail to follow the new rule have to drink 1 sips. ` +
        '\n' +
        `Use the command !resume when you have finish.`
    );
};

module.exports.multiplication = () => {
    let number1 = randomize(12);
    let number2 = randomize(12);
    waitingAnswer = number1 * number2;
    return `${number1}x${number2}. Type the answer in chat before everyone else`;
};

module.exports.randNumber = () => {
    waitingAnswer = randomize(9500, 10050);
    return `Type the number "${waitingAnswer}" in chat.`;
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