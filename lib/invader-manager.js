import BaseEntity from './base-entity';
import CompoundEntity from './compound-entity';
import Invader from './invader';
import util from './util';
import constants from './constants';
import _ from 'lodash';

const {MARGIN, WIDTH, HEIGHT, ESSAY, BOMB_DROP_CHANCE} = constants;

const InvaderManagerProto = _.merge({}, BaseEntity, CompoundEntity, {
    type: 'invader manager',

    x: 0,
    y: 0,
    dx: 0,
    dy: 0,

    turn: 0,
    shiftFlag: false,

    updateAll(dt) {
        this.entities = this.entities.filter(e => e);
        this.turn = Math.max(Math.min(this.turn, this.entities.length), 0);
        let e = this.entities[this.turn];
        e.update(dt);
        if (e.x + e.dx >= WIDTH - MARGIN || e.x + e.dx <= MARGIN) {
            this.shiftFlag = true;
        }
        if (this.shiftFlag && this.turn === this.entities.length - 1) {
            for (let e2 of this.entities) {
                e2.dx = -e2.dx;
                e2.y += 7;
            }
            this.shiftFlag = false;
        }
        this.turn++;
        this.turn = this.turn % this.entities.length;
        this.dropBomb();
    },

    dropBomb() {
        let last = this.entities[this.entities.length - 1];
        for (let i = this.entities.length - 1; this.entities[i].y == last.y && i >= 0; i--) {
            if (Math.random() < BOMB_DROP_CHANCE) {
                return this.entities[i].dropBomb();
            }
        }
    },

    update(dt) {
        this.updateAll(dt);
    },

    draw(ctx) {
        this.drawAll(ctx);
    },

    init() {
        let lines = ESSAY.split('\n'),
            x = MARGIN,
            y = 14;
        for (let l of lines) {
            for (let w of l.split(' ')) {
                let i = Invader(w, x, y);
                x += 100;
                i.dx = 8;
                i.dy = 0;
                this.addEntities(i);
            }

            x = MARGIN;
            y += 14;
        }
    }
});

export default function InvaderManager() {
    let im = _.cloneDeep(InvaderManagerProto);
    return im;
}
