import BaseEntity from './base-entity';
import Movement from './movement';
import ImageEntity from './image-entity';
import {WIDTH, HEIGHT, MARGIN, TANK_WIDTH, TANK_HEIGHT} from './constants';
import _ from 'lodash';

const TANK_MIN_X = MARGIN + TANK_WIDTH / 2;
const TANK_MAX_X = WIDTH - MARGIN - TANK_WIDTH / 2;
const TANK_Y = HEIGHT - TANK_WIDTH / 2;

const TankProto = _.merge({}, BaseEntity, Movement, ImageEntity, {
    x: TANK_MIN_X,
    y: TANK_Y,

    init() {
        this.image = new Image();
        this.image.src = 'assets/tank.png';
    },

    draw(ctx) {
        this.drawImage(ctx);
    },

    update(dt) {
        this.move(dt);
    }
});

function Tank() {
    let t = _.cloneDeep(TankProto);
    t.init();
    return t;
}

export default Tank;
