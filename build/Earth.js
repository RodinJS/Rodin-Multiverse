System.register(['rodin/core'], function (_export, _context) {
    "use strict";

    var R;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }],
        execute: function () {
            class Earth extends R.Sculpt {
                constructor() {
                    super('/res/models/earth/earth.obj');

                    this.on(R.CONST.READY, () => {
                        this.position.set(3, 1.6, 0);
                    });

                    this.on(R.CONST.UPDATE, () => {
                        this.rotation.y += R.Time.delta * .001 * .25;
                    });
                }
            }

            _export('Earth', Earth);
        }
    };
});