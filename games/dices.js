const { randomize } = require('../helpers/math');
const emojis = require('../helpers/emojis');

module.exports = function(message, msgObj) {
    let info = message.split('d');
    let returnString = '';

    if (info.length === 3) {
        returnString = rollDices(info[1], info[2]);
    } else if (info.length <= 2) {
        returnString = rollDices(2, 6);
    }

    if (returnString.length > 0) {
        msgObj.reply(` rolling dices: ${returnString}`);
        return true;
    }

    return false;
};

module.exports.rollDices = rollDices = (nbDices, size) => {
    let string = '';
    if (nbDices > 0 && nbDices <= 10 && size > 0 && size < 100) {
        for (let i = 0; i < nbDices; ++i) {
            string = `${string} ${emojis(`dice_${randomize(size)}`)}`;
        }
    }

    return string.trimLeft();
};
