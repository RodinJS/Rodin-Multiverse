System.register(['rodin/core', './commitment/commitment.js'], function (_export, _context) {
    "use strict";

    var R, showModal;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }, function (_commitmentCommitmentJs) {
            showModal = _commitmentCommitmentJs.showModal;
        }],
        execute: function () {

            const listenerAdded = false;

            class Warning extends R.Sculpt {
                constructor() {
                    super();

                    const presentchangeListener = evt => {
                        showModal(true);
                        document.addEventListener('modalClose', function (e) {
                            console.log(e);
                            if (e.type === 'modalClose') {}
                        }, false);
                        // when modal closes, remove this listener
                    };

                    if (R.Scene.webVRmanager.hmd && R.Scene.webVRmanager.hmd.isPresenting) {
                        if (!listenerAdded) {
                            window.addEventListener('vrdisplaypresentchange', presentchangeListener);
                        }
                    } else {
                        showModal(true);
                    }

                    const listener = evt => {
                        evt.stopPropagation();
                        this.parent = null;
                        R.Scene.active.removeEventListener(R.CONST.GAMEPAD_BUTTON_DOWN, listener);
                        // showModal(false);
                        // close modal here
                    };

                    R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_DOWN, listener);

                    const messageMaterial = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: R.Loader.loadTexture('/res/img/warning.png'),
                        transparent: true
                    });

                    const message = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(2, 1.33), messageMaterial));
                    message.position.set(1.5, 1.6, 0);
                    message.rotation.y = -Math.PI / 2;
                    this.add(message);
                    showModal(true);
                }
            }

            _export('Warning', Warning);
        }
    };
});