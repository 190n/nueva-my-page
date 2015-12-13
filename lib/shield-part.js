import BaseEntity from './base-entity';
import Movement from './movement';
import constants from './constants';
import _ from 'lodash';

const {SHIELD_PART_SIZE} = constants;

const ShieldPartProto = _.merge({}, BaseEntity, Movement, {
    type: 'shield part',

    update(dt) {

    },

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - SHIELD_PART_SIZE / 2, this.y - SHIELD_PART_SIZE / 2, SHIELD_PART_SIZE, SHIELD_PART_SIZE);
        ctx.restore();
    }
});

export default function ShieldPart(x, y) {
    let sp = _.cloneDeep(ShieldPartProto);
    sp.x = x;
    sp.y = y;
    return sp;
}
