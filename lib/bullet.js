import BaseEntity from './base-entity';
import Movement from './movement';
import constants from './constants';
import _ from 'lodash';

const {HEIGHT, BULLET_WIDTH, BULLET_HEIGHT, INVADER_FONT_SIZE} = constants,
    BULLET_Y = HEIGHT - BULLET_HEIGHT;

const BulletProto = _.merge({}, BaseEntity, Movement, {
    dy: -0.5,
    y: BULLET_Y,

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
        let x1 = this.x - (BULLET_WIDTH / 2),
            x2 = i.x - (i.width / 2),
            y1 = this.y - (BULLET_HEIGHT / 2),
            y2 = i.y - (INVADER_FONT_SIZE / 2),
            w1 = BULLET_WIDTH,
            w2 = i.width,
            h1 = BULLET_HEIGHT,
            h2 = INVADER_FONT_SIZE;

        return x1 < x2 + w2
            && x1 + w1 > x2
            && y1 < y2 + h2
            && y1 + h1 > y2;
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
