System.register(['rodin/core'], function (_export, _context) {
    "use strict";

    var R;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }],
        execute: function () {

            class Father extends R.Sculpt {
                constructor() {
                    super();
                }
            }

            const father = new Father();

            _export('father', father);
        }
    };
});