import _babelPolyfill from 'babel-polyfill';
import Manager from './manager';
import InvaderManager from './invader-manager';

window.addEventListener('load', function() {
    const manager = new Manager(document.getElementById('canvas')),
        im = InvaderManager();

    manager.entities.push(im);

    manager.start();
}, false);
