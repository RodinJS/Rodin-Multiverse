import * as R from 'rodin/core';
import { showModal } from './commitment/commitment.js';

let listenerAdded = false;
let instance = null;

export class Warning extends R.Sculpt {
    constructor() {
        super();

        R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
            this.parent = null;
        });

        const messageMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: R.Loader.loadTexture('./res/img/warning.png'),
            transparent: true
        });

        const message = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(2, 1.33), messageMaterial));
        message.position.set(1.5, 1.6, 0);
        this.add(message);
    }

    static getInstance() {
        if (!instance) {
            instance = new Warning();
        }

        const presentchangeListener = (evt) => {
            showModal(true);
            document.addEventListener('modalClose', function(e) {
                console.log(e)
                if (e.type === 'modalClose') {}
            }, false);
            // when modal closes, remove this listener
        };

        if (R.Scene.webVRmanager.hmd && R.Scene.webVRmanager.hmd.isPresenting) {
            if (!listenerAdded) {
                window.addEventListener('vrdisplaypresentchange', presentchangeListener);
                listenerAdded = true;
            }
        } else {
            showModal(true);
        }


        return instance;
    }
}