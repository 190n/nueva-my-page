import BaseEntity from './base-entity';
import CompoundEntity from './compound-entity';
import Invader from './invader';
import constants from './constants';
import _ from 'lodash';

const {MARGIN, WIDTH, ESSAY, BOMB_DROP_CHANCE} = constants;

const InvaderManagerProto = _.merge({}, BaseEntity, CompoundEntity, {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,

    turn: 0,

    newDx: null,

    updateAll(dt) {
        this.turn = Math.max(Math.min(this.turn, this.entities.length), 0);
        let e = this.entities[this.turn];
        e.update(dt);
        if (e.x + e.dx <= MARGIN || e.x + e.dx >= WIDTH - MARGIN) {
            this.newDx = -e.dx;
            for (let e2 of this.entities) {
                e2.dx = 0;
                e2.dy = 7;
            }
            this.turn = -1;
        }
        if (this.turn == 0 && typeof this.newDx == 'number') {
            for (let e2 of this.entities) {
                e2.dx = this.newDx;
            }
            this.newDx = null;
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
                let i = Invader(w);
                i.x = x;
                i.y = y;
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
