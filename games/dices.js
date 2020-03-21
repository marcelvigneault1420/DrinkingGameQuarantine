const { randomize } = require('../helpers/math');
const emojis = require('../helpers/emojis');

module.exports = function(pMessage, pMsgObj) {
    let info = pMessage.split('d');
    let returnString = '';

    if (info.length === 3) {
        returnString = rollDices(info[1], info[2]);
    } else if (info.length <= 2) {
        returnString = rollDices(2, 6);
    }

    if (returnString.length > 0) {
        pMsgObj.reply(` rolling dices: ${returnString}`);
        return true;
    }

    return false;
};

module.exports.rollDices = rollDices = (pNbDices, pSize) => {
    let string = '';
    if (pNbDices > 0 && pNbDices <= 10 && pSize > 0 && pSize < 100) {
        for (let i = 0; i < pNbDices; ++i) {
            string = `${string} ${emojis(`dice_${randomize(pSize)}`)}`;
        }
    }

    return string.trimLeft();
};
