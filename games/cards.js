const { randomize } = require('../helpers/math');
const emojis = require('../helpers/emojis');

module.exports.drawCard = drawCard = () => {
    return `${randomize(13)}${emojis(`suit_${randomize(4)}`)}`;
};

module.exports = function(pMessage, pMsgObj) {
    if (pMessage === '!c' || pMessage === '!card') {
        pMsgObj.reply(` draw a card: ${drawCard()}`);
        return true;
    }

    return false;
};
