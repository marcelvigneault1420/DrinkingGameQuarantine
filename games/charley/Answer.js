const { randomize } = require('../../helpers/math');
const ActionType = require('./ActionTypeEnum');

//Class dealing with answers from the users. They save an answer and deal with the guesses until someone win.
module.exports = class Answer {
    //Take a type of answer and the answer to guess if we wait for a specific answer.
    constructor(pType, pAnswer = null) {
        this.type = pType;
        this.answer = pAnswer;
    }

    //Get an answer and return if it's the end of the game with the message to write.
    tryAnswer(pMessageObj) {
        //If we wait for a specific answer.
        if (this.type === ActionType.FIRST_ANSWER || ActionType.LAST_ANSWER) {
            //The answer shouldn't be null. We stop the Answer game.
            if (this.answer === null) {
                return {
                    end: true,
                    message: `There was an error with the game. Everyone drink 1 sip instead.`
                };
            }
            //Look if the answer is the right one.
            else if (this.answer == pMessageObj.content) {
                this.answer = null;
                return {
                    end: true,
                    message: `<@${
                        pMessageObj.author.id
                    }> you won, give ${randomize(3, 1)} sips`
                };
            }
            //The answer isn't right. We don't stop the game.
            else {
                return {
                    end: false,
                    message: `<@${
                        pMessageObj.author.id
                    }> wrong answer, take ${randomize(3, 1)} sips`
                };
            }
        }
    }
};
