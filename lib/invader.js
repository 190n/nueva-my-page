import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import Bomb from './bomb';
import constants from './constants';
import _ from 'lodash';

const {INVADER_FONT_SIZE, FONTS, GET_SCORE_FOR_INVADER} = constants;

const InvaderProto = _.merge({}, BaseEntity, Movement, TextEntity, {
    type: 'invader',

    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    height: INVADER_FONT_SIZE,

    textEntityOptions: {
        font: `bold ${INVADER_FONT_SIZE}px ${FONTS}`
    },

    update(dt) {
        this.x += this.dx;
    },

    draw(ctx) {
        this.drawText(ctx);
    },

    dropBomb() {
        let b = Bomb(this);
        this.manager.addEntities(b);
    },

    onDeath() {
        let sk = this.manager.getEntitiesByType('scorekeeper')[0];
        sk.addToScore(GET_SCORE_FOR_INVADER(this));
        sk.save();
    }
});

export default function Invader(text, x, y) {
    let i = _.cloneDeep(InvaderProto);
    i.textEntityOptions.text = text;
    i.x = x;
    i.y = y;
    let ctx = document.createElement('canvas').getContext('2d');
    ctx.font = i.textEntityOptions.font;
    i.width = ctx.measureText(text).width;
    return i;
}
