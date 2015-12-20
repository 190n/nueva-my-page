import BaseEntity from './base-entity';
import Movement from './movement';
import ImageEntity from './image-entity';
import constants from './constants';
import util from './util';
import _ from 'lodash';

const {BOMB_FALL_SPEED, INVADER_FONT_SIZE, BOMB_WIDTH, BOMB_HEIGHT, HEIGHT, SHIELD_Y} = constants;

const BombProto = _.merge({}, BaseEntity, Movement, ImageEntity, {
    type: 'bomb',

    dy: BOMB_FALL_SPEED,
    width: BOMB_WIDTH,
    height: BOMB_HEIGHT,

    init() {
        this.image = new Image();
        this.image.src = 'assets/img/bomb.png';
    },

    draw(ctx) {
        this.drawImage(ctx);
    },

    update(dt) {
        this.move(dt);
        if (this.y >= HEIGHT - BOMB_HEIGHT) return this.manager.removeEntities(this);
        if (this.y + BOMB_HEIGHT * 2 >= SHIELD_Y) {
            let parts = _.flatten(this.manager.getEntitiesByType('shield').map(s => s.getEntitiesByType('shield part')));
            for (let p of parts) {
                if (util.boundingBoxCollide(this, p)) {
                    this.manager.removeEntities(this);
                    p.compound.removeEntities(p);
                    return;
                }
            }
        }
    }
});

export default function Bomb(i) {
    let b = _.cloneDeep(BombProto);
    b.x = i.x + (INVADER_FONT_SIZE / 2);
    b.y = i.y;
    return b;
}
