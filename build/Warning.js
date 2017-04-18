System.register(['rodin/core'], function (_export, _context) {
    "use strict";

    var R;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }],
        execute: function () {
            class Warning extends R.Sculpt {
                constructor() {
                    super();

                    const listener = evt => {
                        evt.stopPropagation();
                        this.parent = null;
                        R.Scene.active.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
                    };

                    R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);

                    const messageMaterial = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: R.Loader.loadTexture('/res/img/warning.png'),
                        transparent: true
                    });

                    const message = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(1, .229), messageMaterial));
                    message.position.set(1.5, 1.6, 0);
                    message.rotation.y = -Math.PI / 2;
                    this.add(message);
                }
            }

            _export('Warning', Warning);
        }
    };
});