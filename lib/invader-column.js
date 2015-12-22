import BaseEntity from './base-entity';
import Movement from './movement';
import CompoundEntity from './compound-entity';
import _ from 'lodash';

const InvaderColumnProto = _.merge({}, BaseEntity, Movement, CompoundEntity, {
    type: 'invader column',

    x: 0,
    y: 0,
    dx: 0,
    dy: 0,

    getBomber() {
        return this.entities.map(a => a).sort((a, b) => b.y - a.y)[0];
    },

    draw(ctx) {
        this.drawAll(ctx);
    },

    update(dt) {
        this.updateAll(dt);
        if (this.entities.length === 0) return this.compound.removeEntities(this);
    }
});

export default function InvaderColumn() {
    let ic = _.cloneDeep(InvaderColumnProto);
    return ic;
}
