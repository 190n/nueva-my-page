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
    STARTING_TANK_AMOUNT: 2,
    TANK_RESPAWN_TIME: 1000,
    COOKIES_ADDED: 80,
    INTRO: [
        8000,
        'Ugh. I can\'t believe I have to write this stupid essay.',
        4000,
        'What\'s the prompt again? Oh, right.',
        4000,
        'What is my favorite kind of pet, anyway?',
        4000,
        'Hmm...',
        10000,
        'Well, I guess cats will have to do.',
        4000,
        '',
        '!!saving!!',
        '!!write!!',
        '!!save!!',
        1000,
        'I did it! I\'m gonna get in to Nueva!',
        4000,
        'This is getting boring. I wonder if I can beat my highscore on CookieClicker?',
        3000,
        '!!game!!',
        3000,
        '',
        1000,
        '!!cookies!!',
        1000,
        'What\'s that, Mom? Am I working on my essay?',
        1500,
        '!!show-game!!',
        500,
        '!!docs!!',
        2000,
        'Umm...yeah!',
        4000,
        'Wait...what?!',
        6000,
        '!!hide-silhouette!!',
        '!!start!!',
        '!!hide-skip!!',
        'Arrow keys to move left and right. Space to shoot.',
        4000,
        'Shoot the words of the bad essay. Don\'t get hit by bombs!',
        4000,
        'Good luck!',
        4000,
        '!!hide-caption!!'
    ],
    SKIP_INTRO: [
        '!!quick-hide-silhouette!!',
        '!!hide-skip!!',
        '!!show-game!!',
        '!!start!!',
        'Arrow keys to move left and right. Space to shoot.',
        3000,
        'Shoot the words of the bad essay. Don\'t get hit by bombs!',
        3000,
        'Good luck!',
        2000,
        '!!hide-caption!!'
    ],
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
