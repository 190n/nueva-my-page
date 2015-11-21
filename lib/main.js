const _babelPolyfill = require('babel-polyfill');

import Manager from './manager';
import Invader from './invader';

window.addEventListener('load', function() {
    const manager = new Manager(document.getElementById('canvas')),
        invader = Invader('pet');

    manager.entities.add(invader);

    manager.start();
}, false);
