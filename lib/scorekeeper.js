import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import _ from 'lodash';
import constants from './constants';

const {HEIGHT, MARGIN, FONTS} = constants;

const ScorekeeperProto = _.merge({}, BaseEntity, {
    type: 'scorekeeper',

    score: 0,
    scoreElem: null,
    invaderCountElem: null,
    savingElem: null,
    saving: false,

    draw(ctx) {
        this.scoreElem.textContent = this.score;
        this.invaderCountElem.textContent = this.manager.getEntitiesByType('invader manager')[0].entities.map(c => c.entities.length).reduce((a, b) => a + b);
        this.savingElem.textContent = this.saving ? 'Saving...' : 'All changes saved in Drive';
    },

    update(dt) {

    },

    addToScore(s) {
        this.score += s;
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
    }
});

export default function Scorekeeper() {
    return _.cloneDeep(ScorekeeperProto);
}
