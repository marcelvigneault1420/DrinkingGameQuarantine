const { randomize } = require('../../helpers/math');
const ActionType = require('./ActionTypeEnum');

module.exports = class Answer {
    constructor(pType, pAnswer = null) {
        this.type = pType;

        if (this.type === ActionType.FIRST_ANSWER || ActionType.LAST_ANSWER)
            this.answer = pAnswer;
    }

    tryAnswer(pMessageObj) {
        if (this.type === ActionType.FIRST_ANSWER || ActionType.LAST_ANSWER) {
            if (this.answer !== null && this.answer == pMessageObj.content) {
                this.answer = null;
                return {
                    end: true,
                    message: `<@${
                        pMessageObj.author.id
                    }> you won, give ${randomize(3, 1)} sips`
                };
            } else {
                return { end: false };
            }
        }
    }
};
