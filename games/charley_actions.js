var { randomize } = require('../helpers/math');
var { rollDices } = require('../games/dices');
var probabilityArray = [1, 1, 1, 2, 2, 3];

module.exports.giveSips = (nbPlayer) => {
    // Determines the number of sips to drink
    let nbSips = probabilityArray[randomize(probabilityArray.length) - 1];

    if (nbPlayer > 1) {
        return `Give ${nbSips} sips`;
    }
    // If your sad and playing alone
    else {
        return `Playing alone is sad... Drink ${nbSips} sips`;
    }
};

module.exports.takeSips = () => {
    return `Take ${probabilityArray[randomize(probabilityArray.length) - 1]} sips`;
};

module.exports.rollDices = () => {
    return `You rolled: ${rollDices(2, 6)}`;
};

module.exports.shareSips = (nbPlayer) => {
    // Determines the number of sips to drink
    let nbSips = probabilityArray[randomize(probabilityArray.length) - 1];

    if (nbPlayer > 1) {
        return `Drink ${nbSips} sips and give ${nbSips} to someone else`;
    }
    // If your sad and playing alone
    else {
        return `Playing alone is sad... Drink ${nbSips} sips and give ${nbSips} to yourself`;
    }
};

module.exports.category = () => {
    let nbSips = randomize(2, 1);
    return `Choose a category. The first who fail have to drink ${nbSips} sips. Use the command !resume when you have finish`;
};

module.exports.rime = () => {
    let nbSips = randomize(2, 1);
    return `Choose a word and all the next players must say a word that rhymes with it.`
     + `The first who fail have to drink ${nbSips} sips. Use the command !resume when you have finish`;
};

module.exports.rule = () => {
    return `Think of a rule and say it to the other players. Once done, use the command !resume to continue playing`;
};
