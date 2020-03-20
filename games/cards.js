var { randomize } = require('../helpers/math');
var emojis = require('../helpers/emojis');

module.exports = function(message, msgObj) {
    if (message === '!c' || message === '!card') {
        msgObj.reply(` draw a card: ${drawCard()}`);
        return true;
    }

    return false;
};

module.exports.drawCard = drawCard = () => {
    return `${randomize(13)}${emojis(`suit_${randomize(4)}`)}`;
};
