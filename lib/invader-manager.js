import BaseEntity from './base-entity';
import Movement from'./movement';
import CompoundEntity from './compound-entity';
import Invader from './invader';
import InvaderColumn from './invader-column';
import util from './util';
import constants from './constants';
import _ from 'lodash';

const {MARGIN, WIDTH, HEIGHT, ESSAY, INVADER_FONT_SIZE, BOMB_DROP_CHANCE} = constants;

const InvaderManagerProto = _.merge({}, BaseEntity, Movement, CompoundEntity, {
    type: 'invader manager',

    x: 0,
    y: 0,
    dx: 0,
    dy: 0,

    turn: 0,
    shiftFlag: false,

    updateAll(dt) {
        let invaders = _.flatten(this.entities.map(c => c.entities));
        this.turn = Math.max(Math.min(this.turn, invaders.length - 1), 0);
        let e = invaders[this.turn];
        e.update(dt);
        if (e.x + e.dx >= WIDTH - MARGIN || e.x + e.dx <= MARGIN) {
            this.shiftFlag = true;
        }
        if (this.shiftFlag && this.turn === invaders.length - 1) {
            for (let e2 of invaders) {
                e2.dx = -e2.dx;
                e2.y += INVADER_FONT_SIZE / 2 + 1;
            }
            this.shiftFlag = false;
        }
        this.turn++;
        this.turn = this.turn % invaders.length;
        this.dropBomb();
    },

    dropBomb() {
        if (Math.random() > BOMB_DROP_CHANCE) return;
        let column = this.entities[Math.floor(Math.random() * this.entities.length)];
        column.getBomber().dropBomb();
    },

    update(dt) {
        this.updateAll(dt);
    },

    draw(ctx) {
        this.drawAll(ctx);
    },

    init() {
        let lines = ESSAY.split('\n').map(l => l.split(' ')),
            x = MARGIN,
            y = INVADER_FONT_SIZE + 2,
            columns = [];

        for (let i = 0; i < lines.sort((a, b) => b.length - a.length)[0].length; i++) {
            columns.push([]);
            for (let l of lines) {
                if (l[i] !== undefined) {
                    columns[i].push(l[i]);
                }
            }
        }

        for (let c of columns) {
            let invaders = [];
            for (let w of c) {
                let i = Invader(w, x, y);
                i.dx = 7;
                invaders.push(i);
                y += INVADER_FONT_SIZE + 2;
            }

            let ic = InvaderColumn();
            this.addEntities(ic);
            ic.addEntities(...invaders);
            x += MARGIN * 2;
            y = INVADER_FONT_SIZE + 2;
        }
    }
});

export default function InvaderManager() {
    let im = _.cloneDeep(InvaderManagerProto);
    return im;
}
