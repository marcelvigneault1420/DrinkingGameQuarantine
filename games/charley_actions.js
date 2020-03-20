var { randomize } = require('../helpers/math');
var probabilityArray = [1, 1, 1, 2, 2, 3];
var categoryArray = ['Car brand', 'Color', '', '', '', '', '', '', ''];
var { rollDices } = require('../games/dices');
module.exports.giveSips = (playersArray = null) => {
    let currString = `give ${
        probabilityArray[randomize(probabilityArray.length) - 1]
    } sips`;

    if (playersArray !== null)
        currString =
            currString +
            ` to someone else than <@${
                playersArray[randomize(playersArray.length) - 1]
            }>`;
    return currString;
};
module.exports.takeSips = () => {
    return `take ${
        probabilityArray[randomize(probabilityArray.length) - 1]
    } sips`;
};
module.exports.rollDices = () => {
    return `you have rolled: ${rollDices(2, 6)}`;
};
module.exports.shareSips = (playersArray = null) => {
    let nbSips = probabilityArray[randomize(probabilityArray.length) - 1];
    let currString = `share ${nbSips * 2} sips`;

    if (playersArray !== null)
        currString =
            currString +
            ` with someone else than <@${
                playersArray[randomize(playersArray.length) - 1]
            }>`;

    currString = `${currString} (${nbSips} each)`;

    return currString;
};

module.exports.category = () => {
    return `choose a category game. The first who fail have to drink ${randomize(
        3,
        1
    )} sips. Use the command !resume when you have finish`;
};
