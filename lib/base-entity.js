const BaseEntity = {
    update(dt) {
        throw new Error('Please define update(dt) on entity objects!');
    },

    draw(ctx) {
        throw new Error('Please define draw(ctx) on entity objects!');
    }
};

export default BaseEntity
