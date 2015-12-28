import _babelPolyfill from 'babel-polyfill';
import Manager from './manager';
import InvaderManager from './invader-manager';
import Shield from './shield';
import Tank from './tank';
import Scorekeeper from './scorekeeper';
import constants from './constants';

const {SHIELD_COUNT, SHIELD_PART_SIZE, WIDTH, HEIGHT, MARGIN, SHIELD_WIDTH, SHIELD_HEIGHT, SHIELD_Y, ESSAY, COOKIES_ADDED, INTRO, SKIP_INTRO} = constants;
let manager;

function wait(ms) {
    return new Promise(function(res, rej) {
        setTimeout(function() {
            res();
        }, ms);
    });
}

function blinkCursor() {
    let cursor = document.getElementById('intro-content');
    if (cursor.style.borderRightColor == 'black') cursor.style.borderRightColor = 'rgba(0, 0, 0, 0)';
    else cursor.style.borderRightColor = 'black';
    wait(500).then(blinkCursor);
}

function showCaption(text) {
    let captionElem = document.getElementById('caption');
    captionElem.textContent = text;
}

function addCookie() {
    let cookies = document.getElementById('cookies');
    cookies.textContent = +cookies.textContent + 1;
}

async function main() {
    blinkCursor();
    let intro = location.hash == '#skip-intro' ? SKIP_INTRO : INTRO;
    document.getElementById('skip-intro-button').onclick = function() {
        location.hash = 'skip-intro';
        location.reload();
    };
    for (let c of intro) {
        if (typeof c == 'number') {
            await wait(c);
        } else if (typeof c == 'string') {
            switch (c) {
                case '!!saving!!':
                    document.getElementById('saved').textContent = 'Saving...';
                    break;
                case '!!write!!':
                    let chars = ESSAY.split(''),
                        page = document.getElementById('intro-content');
                    for (let c of chars) {
                        await wait(Math.round(Math.random() * 50) + 50);
                        page.textContent += c;
                    }
                    break;
                case '!!save!!':
                    await wait(Math.round(Math.random() * 1000) + 1000);
                    document.getElementById('saved').textContent = 'All changes saved in Drive';
                    break;
                case '!!game!!':
                    document.getElementById('docs-container').style.display = 'none';
                    document.getElementById('game-container').style.display = 'block';
                    document.getElementById('cookies').textContent = Math.round(Math.random() * 250 + 250);
                    break;
                case '!!cookies!!':
                    let cookie = document.getElementById('cookie');
                    for (let i = 0; i < COOKIES_ADDED; i++) {
                        cookie.style.transform = cookie.style.webkitTransform = cookie.style.mozTransform = 'scale(0.9)';
                        await wait(50);
                        addCookie();
                        cookie.style.transform = cookie.style.webkitTransform = cookie.style.mozTransform = 'scale(1)';
                        await wait(60);
                    }
                    break;
                case '!!quick-hide-silhouette!!':
                    document.getElementById('silhouette').style.display = 'none';
                    break;
                case '!!hide-skip!!':
                    document.getElementById('skip-intro-button').style.display = 'none';
                    break;
                case '!!show-game!!':
                    startGame();
                    manager.entities.forEach(e => e.frozen = true);
                    document.getElementById('intro-page').style.display = 'none';
                    document.getElementById('page').style.display = 'block';
                    document.getElementById('score-container').style.display = 'block';
                    break;
                case '!!docs!!':
                    document.getElementById('docs-container').style.display = 'block';
                    document.getElementById('game-container').style.display = 'none';
                    break;
                case '!!hide-silhouette!!':
                    document.getElementById('silhouette').style.top = '100%';
                    await wait(2000);
                    break;
                case '!!start!!':
                    manager.entities.forEach(e => e.frozen = false);
                    break;
                case '!!hide-caption!!':
                    document.getElementById('caption-container').style.display = 'none';
                    break;
                default:
                    showCaption(c);
                    break;
            }
        }
    }
}

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
    await main();
}, false);

function startGame() {
    manager = new Manager(document.getElementById('canvas'));
    let im = InvaderManager(),
        tank = Tank(),
        sk = Scorekeeper();

    manager.addEntities(im, tank, sk, ...makeShields());

    manager.start();
}
