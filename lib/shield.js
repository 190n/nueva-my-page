import BaseEntity from './base-entity';
import Movement from './movement';
import CompoundEntity from './compound-entity';
import ShieldPart from './shield-part';
import constants from './constants';
import _ from 'lodash';

const {SHIELD_PART_SIZE, SHIELD_PATTERN} = constants;

const ShieldProto = _.merge({}, BaseEntity, Movement, CompoundEntity, {
    type: 'shield',

    update(dt) {
        this.updateAll(dt);
    },

    draw(ctx) {
        this.drawAll(ctx);
    },

    init() {
        let spx = this.x + SHIELD_PART_SIZE / 2, spy = this.y + SHIELD_PART_SIZE / 2;
        for (let c of SHIELD_PATTERN) {
            if (c == ' ') {
                spx += SHIELD_PART_SIZE;
            } else if (c == '\n') {
                spx = this.x + SHIELD_PART_SIZE / 2;
                spy += SHIELD_PART_SIZE;
            } else if (c == '@') {
                let sp = ShieldPart(spx, spy);
                spx += SHIELD_PART_SIZE;
                this.addEntities(sp);
            }
        }
    }
});

export default function Shield(x, y) {
    let s = _.cloneDeep(ShieldProto);
    s.x = x;
    s.y = y;
    return s;
}
