import constants from './constants';

const {ESSAY, SILHOUETTE_SIZE, INTRO} = constants;

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
        } else if (c == '!!saving!!') {
            document.getElementById('saved').textContent = 'Saving...';
        } else if (c == '!!write!!') {
            let chars = ESSAY.split(''),
                page = document.getElementById('intro-content');
            for (let c of chars) {
                await wait(Math.round(Math.random() * 50) + 50);
                page.textContent += c;
            }
        } else if (c == '!!save!!') {
            await wait(Math.round(Math.random() * 1000) + 1000);
            document.getElementById('saved').textContent = 'All changes saved in Drive';
        } else if (c == '!!game!!') {
            document.getElementById('docs-container').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            document.getElementById('cookies').textContent = Math.round(Math.random() * 250 + 250);
        } else if (typeof c == 'string') {
            showCaption(c);
        }
    }
}

export default doIntro;
