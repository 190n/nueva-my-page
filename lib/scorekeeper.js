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

    draw(ctx) {
        this.scoreElem.textContent = this.score;
        this.invaderCountElem.textContent = this.manager.getEntitiesByType('invader manager')[0].entities.map(c => c.entities.length).reduce((a, b) => a + b);
    },

    update(dt) {

    },

    addToScore(s) {
        this.score += s;
    },

    init() {
        this.scoreElem = document.getElementById('score');
        this.invaderCountElem = document.getElementById('invader-count');
    }
});

export default function Scorekeeper() {
    return _.cloneDeep(ScorekeeperProto);
}
