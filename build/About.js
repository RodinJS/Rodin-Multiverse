System.register(["rodin/core"], function (_export, _context) {
        "use strict";

        var R;
        return {
                setters: [function (_rodinCore) {
                        R = _rodinCore;
                }],
                execute: function () {
                        class About extends R.Sculpt {
                                constructor() {
                                        super();

                                        this.position.set(0, 1.6, -3);

                                        const params = {
                                                width: 1.7,
                                                text: "Rodin comes with a selection of controls and libraries if they aren`t enough, you can install modules created by members of the Rodin community and third-party vendors",
                                                color: 0xffffff,
                                                fontFamily: "Arial",
                                                fontSize: 0.1
                                        };
                                        const text = new R.DynamicText(params);

                                        this.add(text);

                                        const plane = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), new THREE.MeshBasicMaterial()));
                                        plane.position.set(0, 0, -.05);
                                        this.add(plane);
                                }
                        }

                        _export("About", About);
                }
        };
});