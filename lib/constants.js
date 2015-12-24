import _ from 'lodash';

const constants = {
    WIDTH: 512,
    HEIGHT: 512,
    MARGIN: 38,
    TANK_WIDTH: 64,
    TANK_HEIGHT: 32,
    TANK_SPEED: 0.2,
    MOVE_LEFT_KEY: 37,
    MOVE_RIGHT_KEY: 39,
    SHOOT_KEY: 32,
    BULLET_MAX: 4,
    BULLET_WIDTH: 2,
    BULLET_HEIGHT: 16,
    INVADER_FONT_SIZE: 12,
    FONTS: 'Hack, Courier, \'Liberation Mono\', Cousine, monospace',
    GET_SCORE_FOR_INVADER(i) {
        let letters = i.textEntityOptions.text.length;
        return 100 - (letters * 10);
    },
    BOMB_FALL_SPEED: 0.25,
    BOMB_DROP_CHANCE: 0.0025,
    BOMB_WIDTH: 8,
    BOMB_HEIGHT: 16,
    BOMB_SCORE: 150,
    SHIELD_PART_SIZE: 8,
    SHIELD_PATTERN: ' @@@@@@ \n@@@@@@@@\n@@@  @@@\n @    @ '.split(''),
    SHIELD_COUNT: 4,
    STARTING_TANK_AMOUNT: 3,
    TANK_RESPAWN_TIME: 1000,
    ESSAY: `My favorite type of
pet is a cat.
I like cats because
they are cute and
smart. There are many
videos of cute cats,
especially kittens, on the
Internet. That is why
I like cats so
much.`
};

_.extend(constants, {
    SHIELD_WIDTH: constants.SHIELD_PATTERN.join('').split('\n')[0].length * constants.SHIELD_PART_SIZE,
    SHIELD_HEIGHT: constants.SHIELD_PATTERN.join('').split('\n').length * constants.SHIELD_PART_SIZE,
    BULLET_Y: constants.HEIGHT - constants.BULLET_HEIGHT
});

_.extend(constants, {
    SHIELD_Y: constants.HEIGHT - constants.MARGIN - constants.SHIELD_HEIGHT
});

export default constants;
