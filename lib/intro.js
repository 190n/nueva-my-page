function wait(ms) {
    return new Promise(function(res, rej) {
        setTimeout(function() {
            res();
        }, ms);
    });
}

async function doIntro() {
    let sc = document.getElementById('silhouette-canvas'),
        ctx = sc.getContext('2d'),
        SIZE = 600;

    ctx.fillStyle = 'black';
    ctx.arc(SIZE / 2, SIZE * 0.375, SIZE * 0.375, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE * 0.375 + 20, SIZE * 0.375, Math.PI / 3, Math.PI / 1.5);
    ctx.lineTo(0, SIZE);
    ctx.lineTo(SIZE, SIZE);
    ctx.closePath();
    ctx.fill();
}

export default doIntro;
