import BaseEntity from './base-entity';
import Movement from './movement';
import TextEntity from './text-entity';
import _ from 'lodash';
import constants from 'constants';

const {FONTS} = constants;

const FPSDisplayProto = _.merge({}, BaseEntity, Movement, TextEntity, {
    type: 'fps display',

    x: 0,
    y: 0,

    textEntityOptions: {
        font: `bold 12px ${FONTS}`,
        align: 'left',
        baseline: 'top',
        text: '0 FPS'
    },

    update(dt) {
        this.textEntityOptions.text = `${Math.round(1000 / dt)} FPS`;
    },

    draw(ctx) {
        this.drawText(ctx);
    }
});

export default function FPSDisplay() {
    let fd = _.cloneDeep(FPSDisplayProto);
    return fd;
}
