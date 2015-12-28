import constants from './constants';

const {ESSAY, SILHOUETTE_SIZE, COOKIES_ADDED, INTRO} = constants;

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

async function doIntro() {
    blinkCursor();
    for (let c of INTRO) {
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
                case '!!docs!!':
                    document.getElementById('docs-container').style.display = 'block';
                    document.getElementById('game-container').style.display = 'none';
                    break;
                default:
                    showCaption(c);
                    break;
            }
        }
    }
}

export default doIntro;
