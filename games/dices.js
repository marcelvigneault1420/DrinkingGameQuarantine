var { randomize } = require('../helpers/math');
var emojis = require('../helpers/emojis');

// !d[dice_count]d[face_count]
module.exports = function(message, msgObj) {
    let info = message.split('d');
    let returnString = '';

    if (info.length === 3) {
        returnString = rollDices(info[1], info[2]);
    // If If the format of the command is not respected, by default uses 2 dice of 6 faces
    } else if (info.length <= 2) {
        returnString = rollDices(2, 6);
    }

    if (returnString.length > 0) {
        msgObj.reply(` rolling dices: ${returnString}`);
        return true;
    }

    return false;
};

module.exports.rollDices = rollDices = (nbDices, nbFaces) => {
    let string = '';
    if (nbDices > 0 && nbDices <= 10 && nbFaces > 0 && nbFaces < 100) {
        for (let i = 0; i < nbDices; ++i) {
            string = `${string} ${emojis(`dice_${randomize(nbFaces)}`)}`;
        }
    }

    // Remove the space character at the begining of the string
    return string.trimLeft();
};
