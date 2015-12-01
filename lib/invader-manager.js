import BaseEntity from './base-entity';
import CompoundEntity from './compound-entity';
import Invader from './invader';
import constants from './constants';
import _ from 'lodash';

const {MARGIN, WIDTH, ESSAY} = constants;

const InvaderManagerProto = _.merge({}, BaseEntity, CompoundEntity, {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,

    turn: 0,

    updateAll(dt) {
        while (!(this.turn in this.entities)) this.turn++;
        let e = this.entities[this.turn];
        e.update(dt);
        if (e.x + e.dx <= MARGIN || e.x + e.dx >= WIDTH - MARGIN) {
            for (let e2 of this.entities) {
                if (this.entities.indexOf(e2) > this.turn) {
                    e2.update(dt);
                }
                e2.dx = -e2.dx;
                e2.dy = 7;
            }
            this.turn = -1;
        }
        this.turn++;
        this.turn = this.turn % this.entities.length;
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
                this.entities.push(i);
            }

            x = MARGIN;
            y += 14;
        }
    }
});

function InvaderManager() {
    let im = _.cloneDeep(InvaderManagerProto);
    im.init();
    return im;
}

export default InvaderManager;
