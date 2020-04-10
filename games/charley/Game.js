const { randomize } = require('../../helpers/math');
const { actionsArray } = require('./Actions');
const Answer = require('./Answer');

const GameState = {
    STOPPED: 0,
    PLAYING: 1,
    PAUSED: 2
};

let lastGames = [100, 101];
module.exports = class Game {
    constructor(pChannel, pPlayers = []) {
        this.players = pPlayers;
        this.gameState = GameState.STOPPED;
        this.channel = pChannel;
        this.idInterval = null;
        this.actions = actionsArray;
    }

    startGame() {
        if (this.gameState === GameState.STOPPED) {
            this.gameState = GameState.PLAYING;
            this.idInterval = setInterval(() => {
                if (
                    this.gameState === GameState.PLAYING &&
                    this.players.length > 0
                ) {
                    let currPlayer = this.players[
                        randomize(this.players.length, -1)
                    ];
                    let currentGame = randomize(this.actions.length, -1);

                    while (lastGames.includes(currentGame)) {
                        currentGame = randomize(this.actions.length, -1);
                    }

                    lastGames.shift();
                    lastGames.push(currentGame);
                    this.playAction(currentGame, currPlayer);
                }
            }, 18000);

            if (this.players.length === 0) {
                this.channel.send(
                    `The game have been started` +
                        '\n' +
                        `type !join to join the game, !stop to stop it.`
                );
            }
        }
    }

    stopGame() {
        if (this.gameState !== GameState.STOPPED) {
            if (idInterval !== null) {
                clearInterval(idInterval);
                this.idInterval = null;
            }

            this.gameState = GameState.STOPPED;
        }
    }

    resumeGame() {
        if (this.gameState === GameState.PAUSED) {
            this.gameState = GameState.PLAYING;
            this.channel.send(`The game have resumed.`);
        }
    }

    isPlaying() {
        return this.gameState !== GameState.STOPPED;
    }

    playAction(pCurrGame, pCurrPlayer = '') {
        let action = this.actions[pCurrGame];

        if (action !== undefined) {
            let result = action.func(pCurrPlayer);
            if (result.needPause) {
                this.gameState = GameState.PAUSED;
                this.answer = new Answer(result.type, result.answer);
            }

            this.channel.send(result.string);
        } else {
            this.channel.send(
                `There was a bug with the bot, everyone drink one anyway !`
            );
        }
    }

    addPlayer(pMsgObj) {
        if (
            this.gameState !== GameState.STOPPED &&
            !this.players.includes(pMsgObj.author.id)
        ) {
            this.players.push(pMsgObj.author.id);
            pMsgObj.reply(` welcome to the game`);
        }
    }

    logCurrentGame() {
        console.log(this.channel.id);
        console.log(this.players);
    }

    testGame() {
        for (let i = 0; i < this.actions.length; ++i) {
            this.channel.send(`TEST ACTION ${i + 1}`);
            this.playAction(i);
        }

        this.channel.send(`TEST WRONG ACTION`);
        this.playAction(this.actions.length);
    }

    tryAnswer(pMessageObj) {
        if (this.gameState === GameState.PAUSED && this.answer !== null) {
            let result = this.answer.tryAnswer(pMessageObj);

            if (result.end) {
                this.answer = null;
                this.channel.send(result.message);
                this.gameState = GameState.PLAYING;
            }
        }
    }
};
