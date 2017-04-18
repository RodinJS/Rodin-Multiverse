import * as R from 'rodin/core';

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
            map: R.Loader.loadTexture('/res/img/warning.png'),
            transparent: true
        });

        const message = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(2, 1.33), messageMaterial));
        message.position.set(1.5, 1.6, 0);
        message.rotation.y = -Math.PI / 2;
        this.add(message);
    }

    static getInstance() {
        if(!instance) {
            instance = new Warning();
        }

        const presentchangeListener = (evt) => {
            // show modal here;

            // when modal closes, remove this listener
            // window.removeEventListener('vrdisplaypresentchange', presentchangeListener);
        };

        if (R.Scene.webVRmanager.hmd && R.Scene.webVRmanager.hmd.isPresenting) {
            if(!listenerAdded) {
                window.addEventListener('vrdisplaypresentchange', presentchangeListener);
                listenerAdded = true;
            }
        } else {
            // show modal here
        }

        return instance;
    }
}
