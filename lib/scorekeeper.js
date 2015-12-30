import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import Tank from './tank';
import _ from 'lodash';
import constants from './constants';

const {FONTS, STARTING_TANK_AMOUNT, TANK_RESPAWN_TIME} = constants;

const ScorekeeperProto = _.merge({}, BaseEntity, {
    type: 'scorekeeper',

    score: 0,
    tanks: STARTING_TANK_AMOUNT,
    saving: false,
    scoreElem: null,
    invaderCountElem: null,
    tanksElem: null,
    savingElem: null,

    draw(ctx) {
        this.scoreElem.textContent = this.score;
        this.invaderCountElem.textContent = this.manager.getEntitiesByType('invader manager')[0].entities.map(c => c.entities.length).reduce((a, b) => a + b);
        this.savingElem.textContent = this.saving ? 'Saving...' : 'All changes saved in Drive';
        this.tanksElem.textContent = this.tanks;
    },

    update(dt) {
        if (this.manager.getEntitiesByType('invader manager')[0].entities.map(c => c.entities.length).reduce((a, b) => a + b) == 0) {
            this.win();
        }
    },

    addToScore(s) {
        this.score += s;
    },

    removeTank() {
        this.tanks--;
        if (this.tanks <= 0) {
            return this.gameOver();
        }
        setTimeout(function() {
            this.manager.addEntities(Tank());
        }.bind(this), TANK_RESPAWN_TIME);
    },

    gameOver() {
        this.manager.paused = true;
        let dialog = document.getElementById('game-over-dialog'),
            title = document.getElementById('game-over-title'),
            message = document.getElementById('game-over-message'),
            overlay = document.getElementById('modal-overlay'),
            playAgain = document.getElementById('play-again-button');

        dialog.style.display = 'block';
        overlay.style.display = 'block';
        title.textContent = 'Game over';
        message.textContent = `You ran out of tanks! Your score was ${this.score}.`;
        playAgain.onclick = function() {
            localStorage.skipping = 'true';
            location.reload();
        };
    },

    win() {
        this.manager.paused = true;
        let dialog = document.getElementById('game-over-dialog'),
            title = document.getElementById('game-over-title'),
            message = document.getElementById('game-over-message'),
            overlay = document.getElementById('modal-overlay'),
            finalScore = document.getElementById('final-score'),
            playAgain = document.getElementById('play-again-button');

        dialog.style.display = 'block';
        overlay.style.display = 'block';
        title.textContent = 'You won';
        message.textContent = `You won! You had ${this.tanks} tank${this.tanks === 1 ? '' : 's'} left, and your score was ${this.score}.`;
        playAgain.onclick = function() {
            localStorage.skipping = 'true';
            location.reload();
        };
    },

    save() {
        let saveTime = Math.round(Math.random() * 1000) + 1000;
        setTimeout(function() {
            this.saving = false;
        }.bind(this), saveTime);
        this.saving = true;
    },

    init() {
        this.scoreElem = document.getElementById('score');
        this.invaderCountElem = document.getElementById('invader-count');
        this.savingElem = document.getElementById('saved');
        this.tanksElem = document.getElementById('tank-count');
    }
});

export default function Scorekeeper() {
    return _.cloneDeep(ScorekeeperProto);
}
