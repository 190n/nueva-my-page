import BaseEntity from './base-entity';
import Movement from './movement';
import ImageEntity from './image-entity';
import Bullet from './bullet';
import constants from './constants';
import _ from 'lodash';

const {MARGIN, WIDTH, TANK_WIDTH, HEIGHT, TANK_HEIGHT, MOVE_LEFT_KEY, MOVE_RIGHT_KEY, SHOOT_KEY, TANK_SPEED, BULLET_MAX} = constants,
    TANK_MIN_X = TANK_WIDTH / 2,
    TANK_MAX_X = WIDTH - (TANK_WIDTH / 2),
    TANK_Y = HEIGHT - (TANK_HEIGHT / 2);


const TankProto = _.merge({}, BaseEntity, Movement, ImageEntity, {
    type: 'tank',

    lives: 3,

    x: TANK_MIN_X,
    y: TANK_Y,

    init() {
        this.image = new Image();
        this.image.src = 'assets/img/tank.png';

        window.addEventListener('keydown', e => {
            if (e.keyCode == MOVE_LEFT_KEY) {
                this.dx = -TANK_SPEED;
            }

            if (e.keyCode == MOVE_RIGHT_KEY) {
                this.dx = TANK_SPEED;
            }

            if (e.keyCode == SHOOT_KEY) {
                if (this.manager.getEntitiesByType('bullet').length < BULLET_MAX) {
                    this.lastShot = Date.now();
                    this.shoot();
                }
            }
        }, false);

        window.addEventListener('keyup', e => {
            if (e.keyCode == MOVE_LEFT_KEY && this.dx < 0) {
                this.dx = 0;
            }
            if (e.keyCode == MOVE_RIGHT_KEY && this.dx > 0) {
                this.dx = 0;
            }
        });
    },

    draw(ctx) {
        this.drawImage(ctx);
    },

    update(dt) {
        this.move(dt);
        this.x = Math.max(Math.min(this.x, TANK_MAX_X), TANK_MIN_X);
    },

    shoot() {
        let b = Bullet(this.x);
        this.manager.addEntities(b);
    }
});

export default function Tank() {
    let t = _.cloneDeep(TankProto);
    return t;
}
