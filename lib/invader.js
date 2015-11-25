import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import _ from 'lodash';


const InvaderProto = _.merge({}, BaseEntity, Movement, TextEntity, {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,

    textEntityOptions: {
        font: 'bold 12px Courier, "Liberation Mono", Cousine, monospace'
    },

    update(dt) {
        this.move(dt);
    },

    draw(ctx) {
        this.drawText(ctx);
    }
});

function Invader(text) {
    let i = _.cloneDeep(InvaderProto);
    i.textEntityOptions.text = text;
    return i;
}

export default Invader;
