System.register(['rodin/core', './DynamicText.js'], function (_export, _context) {
    "use strict";

    var R, DynamicText;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }, function (_DynamicTextJs) {
            DynamicText = _DynamicTextJs.DynamicText;
        }],
        execute: function () {
            class About extends R.Sculpt {
                constructor() {
                    const material = new THREE.MeshBasicMaterial({
                        map: R.Loader.loadTexture('/res/img/about.png'),
                        transparent: true
                    });

                    super(new THREE.Mesh(new THREE.PlaneGeometry(2, 1.715), material));
                    this.position.set(0, 1.6, -3);
                }
            }

            _export('About', About);
        }
    };
});