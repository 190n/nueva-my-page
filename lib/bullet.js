import BaseEntity from './base-entity';
import Movement from './movement';
import constants from './constants';
import util from './util';
import _ from 'lodash';

const {HEIGHT, BULLET_WIDTH, BULLET_HEIGHT, INVADER_FONT_SIZE, SHIELD_Y, BULLET_Y} = constants;

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
        if (this.y + BULLET_HEIGHT * 2 > SHIELD_Y) {
            let parts = _.flatten(this.manager.getEntitiesByType('shield').map(s => s.getEntitiesByType('shield part')));
            for (let p of parts) {
                if (util.boundingBoxCollide(this, p)) {
                    this.manager.removeEntities(this);
                    p.compound.removeEntities(p);
                    return;
                }
            }
        }

        let im = this.manager.getEntitiesByType('invader manager')[0];
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
