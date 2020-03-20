var { randomize } = require('../helpers/math');
var { rollDices } = require('../games/dices');
var probabilityArray = [1, 1, 1, 2, 2, 3];

module.exports.giveSips = (player, playersArray = null) => {
    // Determines the number of sips to drink
    let nbSips = probabilityArray[randomize(probabilityArray.length) - 1];

    // If there's more than one player
    if (playersArray.length > 1) {
        // If playersArray isn't null, determine a player who will not drink
        let otherPlayer = null;
        if (playersArray !== null) {
            do{
                otherPlayer = playersArray[randomize(playersArray.length) - 1];
            } while (otherPlayer !== player);
        }
        
        return `Give ${nbSips} sips${otherPlayer !== null ? ' to someone other than <@${otherPlayer}>' : ''}`;
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

module.exports.shareSips = (player, playersArray = null) => {
    // Determines the number of sips to drink
    let nbSips = probabilityArray[randomize(probabilityArray.length) - 1];

    // If there's more than one player
    if (playersArray.length > 1) {
        // If playersArray isn't null, determine a player who will not drink
        let otherPlayer = null;
        if (playersArray !== null) {
            do{
                otherPlayer = playersArray[randomize(playersArray.length) - 1];
            } while (otherPlayer !== player);
        }
        
        return `Drink ${nbSips} sips and give ${nbSips} sips${otherPlayer !== null ? ' to someone other than <@${otherPlayer}>' : ' to someone else'}`;
    }
    // If your sad and playing alone
    else {
        return `Playing alone is sad... Drink ${nbSips} sips`;
    }
};

module.exports.category = () => {
    let nbSips = randomize(2, 1);
    return `Choose a category. The first who fail have to drink ${nbSips} sips. Use the command !resume when you have finish`;
};
