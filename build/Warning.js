System.register(['rodin/core', './commitment/commitment.js', './Father.js'], function (_export, _context) {
    "use strict";

    var R, showModal, father;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }, function (_commitmentCommitmentJs) {
            showModal = _commitmentCommitmentJs.showModal;
        }, function (_FatherJs) {
            father = _FatherJs.father;
        }],
        execute: function () {

            let listenerAdded = false;
            let instance = null;

            class Warning extends R.Sculpt {
                constructor() {
                    super();

                    R.Scene.active.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
                        father.remove(this);
                    });

                    const messageMaterial = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: R.Loader.loadTexture('./res/img/warning.png'),
                        transparent: true
                    });

                    const message = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(2, 1.33), messageMaterial));
                    message.position.set(0, 1.6, -1.5);
                    this.message = message;
                    this.add(message);
                }

                static getInstance() {
                    if (!instance) {
                        instance = new Warning();
                    }

                    const presentchangeListener = evt => {
                        showModal(true);
                        document.addEventListener('modalClose', function (e) {
                            console.log(e);
                            if (e.type === 'modalClose') {
                                listenerAdded = false;
                            }
                        }, false);
                        // when modal closes, remove this listener
                    };

                    if (R.Scene.webVRmanager.hmd && R.Scene.webVRmanager.hmd.isPresenting) {
                        if (!listenerAdded) {
                            window.addEventListener('vrdisplaypresentchange', presentchangeListener);
                            listenerAdded = true;
                            instance.message.visible = true;
                        }
                    } else {
                        instance.message.visible = false;
                        showModal(true);
                    }

                    return instance;
                }
            }

            _export('Warning', Warning);
        }
    };
});