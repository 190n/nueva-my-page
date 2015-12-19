import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import _ from 'lodash';
import constants from './constants';

const {HEIGHT, MARGIN, FONTS, SCORE_FONT_SIZE} = constants;

const ScorekeeperProto = _.merge({}, BaseEntity, Movement, TextEntity, {
    type: 'scorekeeper',
    score: 0,
    x: MARGIN / 2,
    y: HEIGHT - (MARGIN / 2),

    textEntityOptions: {
        font: `bold ${SCORE_FONT_SIZE}px ${FONTS}`,
        align: 'left',
        baseline: 'bottom'
    },

    draw(ctx) {
        this.drawText(ctx);
    },

    update(dt) {
        this.textEntityOptions.text = `Score: ${this.score}`;
    },

    addToScore(s) {
        this.score += s;
        console.log(this.score);
    }
});

export default function Scorekeeper() {
    return _.cloneDeep(ScorekeeperProto);
}
