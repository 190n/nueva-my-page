import constants from './constants';

const {ESSAY, SILHOUETTE_SIZE, INTRO} = constants;

function wait(ms) {
    return new Promise(function(res, rej) {
        setTimeout(function() {
            res();
        }, ms);
    });
}

function drawSilhouette() {
    let sc = document.getElementById('silhouette-canvas'),
        ctx = sc.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.arc(SILHOUETTE_SIZE / 2, SILHOUETTE_SIZE * 0.375, SILHOUETTE_SIZE * 0.375, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(SILHOUETTE_SIZE / 2, SILHOUETTE_SIZE * 0.375 + 20, SILHOUETTE_SIZE * 0.375, Math.PI / 3, Math.PI / 1.5);
    ctx.lineTo(0, SILHOUETTE_SIZE);
    ctx.lineTo(SILHOUETTE_SIZE, SILHOUETTE_SIZE);
    ctx.closePath();
    ctx.fill();
}

function showCaption(text) {
    let captionElem = document.getElementById('caption');
    captionElem.textContent = text;
}

async function doIntro() {
    drawSilhouette();
    for (let c of INTRO) {
        if (typeof c == 'number') {
            await wait(c);
        } else if (c == '!!write!!') {
            let chars = ESSAY.split(''),
                page = document.getElementById('intro-content');
            for (let c of chars) {
                await wait(Math.round(Math.random() * 25) + 25);
                page.textContent += c;
            }
        } else if (typeof c == 'string') {
            showCaption(c);
        }
    }
}

export default doIntro;
