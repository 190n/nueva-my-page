import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import _ from 'lodash';
import constants from './constants';

const {HEIGHT, MARGIN, FONTS, SCORE_FONT_SIZE} = constants;

const ScorekeeperProto = _.merge({}, BaseEntity, {
    type: 'scorekeeper',
    score: 0,
    elem: null,

    draw(ctx) {
        this.elem.textContent = this.score;
    },

    update(dt) {

    },

    addToScore(s) {
        this.score += s;
    },

    init() {
        this.elem = document.getElementById('score');
    }
});

export default function Scorekeeper() {
    return _.cloneDeep(ScorekeeperProto);
}
