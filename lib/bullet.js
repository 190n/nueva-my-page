import BaseEntity from './base-entity';
import Movement from './movement';
import constants from './constants';
import util from './util';
import _ from 'lodash';

const {HEIGHT, BULLET_WIDTH, BULLET_HEIGHT, INVADER_FONT_SIZE} = constants,
    BULLET_Y = HEIGHT - BULLET_HEIGHT;

const BulletProto = _.merge({}, BaseEntity, Movement, {
    type: 'bullet',

    dy: -0.5,
    y: BULLET_Y,
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT,

    update(dt) {
        this.move(dt);
        if (this.y < BULLET_HEIGHT * -0.5) return this.manager.removeEntities(this);
        this.collideAll();
    },

    collideAll() {
        let im = this.manager.entities.filter(e => typeof e.turn == 'number')[0];
        for (let i of im.entities) {
            if (this.collideSingle(i)) {
                im.removeEntities(i);
                return this.manager.removeEntities(this);
            }
        }
    },

    collideSingle(i) {
        return util.boundingBoxCollide(this, i);
    },

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - (BULLET_WIDTH / 2), this.y - (BULLET_HEIGHT / 2), BULLET_WIDTH, BULLET_HEIGHT);
        ctx.restore();
    }
});

export default function Bullet(x) {
    let b = _.cloneDeep(BulletProto);
    b.x = x;
    return b;
}
