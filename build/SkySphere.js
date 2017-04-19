System.register(['rodin/core'], function (_export, _context) {
    "use strict";

    var R;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }],
        execute: function () {
            class SkySphere extends R.Sphere {
                constructor() {
                    const material = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: R.Loader.loadTexture('./res/img/skySphere.jpg')
                    });

                    super(50, 20, 20, material);
                }
            }

            _export('SkySphere', SkySphere);
        }
    };
});