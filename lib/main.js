import _babelPolyfill from 'babel-polyfill';
import Manager from './manager';
import InvaderManager from './invader-manager';
import Tank from './tank';

window.addEventListener('load', function() {
    const manager = new Manager(document.getElementById('canvas')),
        im = InvaderManager(),
        tank = Tank();

    manager.addEntities(im, tank);
    
    manager.start();
}, false);
