const BaseEntity = {
    type: 'generic',

    frozen: false,
    invisible: false,

    update(dt) {
        throw new Error('Please define update(dt) on entity objects!');
    },

    draw(ctx) {
        throw new Error('Please define draw(ctx) on entity objects!');
    },

    onDeath() {
        console.log('The onDeath() method on an entity is called when that entity is removed.');
    }
};

export default BaseEntity
