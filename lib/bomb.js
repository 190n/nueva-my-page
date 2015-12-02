import BaseEntity from './base-entity';
import Movement from './movement';
import ImageEntity from './image-entity';
import constants from './constants';
import _ from 'lodash';

const {BOMB_FALL_SPEED, INVADER_FONT_SIZE} = constants;

const BombProto = _.merge({}, BaseEntity, Movement, ImageEntity, {
    dy: BOMB_FALL_SPEED,

    init() {
        this.image = new Image();
        this.image.src = 'assets/bomb.png';
    },

    draw(ctx) {
        this.drawImage(ctx);
    },

    update(dt) {
        this.move(dt);
    }
});

export default function Bomb(i) {
    let b = _.cloneDeep(BombProto);
    b.x = i.x + (INVADER_FONT_SIZE / 2);
    b.y = i.y;
    return b;
}
