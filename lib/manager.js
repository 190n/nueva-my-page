export default class Manager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.entities = [];
    }

    start() {
        this.lastUpdate = Date.now();
        requestAnimationFrame(this.update.bind(this));
        requestAnimationFrame(this.draw.bind(this));
    }

    addEntities(...es) {
        this.entities = this.entities.concat(es);
        for (let e of es) {
            e.manager = this;
            if (typeof e.init == 'function') e.init();
        }
    }

    removeEntities(...es) {
        this.entities = this.entities.filter(e => !es.includes(e));
    }

    getEntitiesByType(type) {
        return this.entities.filter(e => e.type == type);
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        let dt = Date.now() - this.lastUpdate;
        for (let e of this.entities) {
            e.update(dt);
        }
        this.lastUpdate = Date.now();
    }

    draw() {
        requestAnimationFrame(this.draw.bind(this));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let e of this.entities) {
            e.draw(this.ctx);
        }
    }
}
