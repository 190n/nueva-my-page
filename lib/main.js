import _babelPolyfill from 'babel-polyfill';
import Manager from './manager';
import InvaderManager from './invader-manager';
import Shield from './shield';
import Tank from './tank';
import Scorekeeper from './scorekeeper';
import doIntro from './intro';
import constants from './constants';

const {SHIELD_COUNT, SHIELD_PART_SIZE, WIDTH, HEIGHT, MARGIN, SHIELD_WIDTH, SHIELD_HEIGHT, SHIELD_Y} = constants;

function makeShields() {
    let x = MARGIN, shields = [];
    for (let i = 0; i < SHIELD_COUNT; i++) {
        let s = Shield(Math.round(x), SHIELD_Y);
        shields.push(s);
        x += (WIDTH - MARGIN * 2 - SHIELD_WIDTH) / (SHIELD_COUNT - 1);
    }
    return shields;
}

window.addEventListener('load', async function() {
    await doIntro();
}, false);

function startGame() {
    const manager = new Manager(document.getElementById('canvas')),
        im = InvaderManager(),
        tank = Tank(),
        sk = Scorekeeper();

    manager.addEntities(im, tank, sk, ...makeShields());

    manager.start();
}
