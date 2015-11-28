import BaseEntity from './base-entity';
import Movement from './movement';
import constants from './constants';
import _ from 'lodash';

const {HEIGHT, BULLET_WIDTH, BULLET_HEIGHT} = constants,
    BULLET_Y = HEIGHT - BULLET_HEIGHT;

const BulletProto = _.merge({}, BaseEntity, Movement, {
    dy: -0.5,
    y: BULLET_Y,

    update(dt) {
        this.move(dt);
    },

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - (BULLET_WIDTH / 2), this.y - (BULLET_HEIGHT / 2), BULLET_WIDTH, BULLET_HEIGHT);
        ctx.restore();
    }
});

function Bullet(x) {
    let b = _.cloneDeep(BulletProto);
    b.x = x;
    return b;
}

export default Bullet;
