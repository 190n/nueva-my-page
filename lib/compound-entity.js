import Movement from './movement';
import _ from 'lodash';

const CompoundEntity = _.merge({}, Movement, {
    entities: [],

    updateAll(dt) {
        for (let e of this.entities) {
            e.x -= this.x;
            e.y -= this.y;
            e.update(dt);
            e.x += this.x;
            e.y += this.y;
        }
    },

    drawAll(ctx) {
        for (let e of this.entities) {
            e.draw(ctx);
        }
    }
});

export default CompoundEntity;
