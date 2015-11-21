import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import merge from 'lodash/object/merge';


const InvaderProto = merge({}, BaseEntity, Movement, TextEntity, {
    x: 50,
    y: 50,
    dx: 0,
    dy: 0,

    textEntityOptions: {
        font: 'normal 24px Courier, "Liberation Mono", Cousine, monospace'
    },

    update(dt) {
        this.move(dt);
    },

    draw(ctx) {
        this.drawText(ctx);
    }
});

function Invader(text) {
    let i = Object.create(InvaderProto);
    i.textEntityOptions.text = text;
    return i;
}

export default Invader;
