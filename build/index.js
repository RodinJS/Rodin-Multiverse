System.register(['rodin/core', './SkySphere.js', './Earth.js', './Father.js', './About.js'], function (_export, _context) {
    "use strict";

    var R, SkySphere, Earth, father, About;
    return {
        setters: [function (_rodinCore) {
            R = _rodinCore;
        }, function (_SkySphereJs) {
            SkySphere = _SkySphereJs.SkySphere;
        }, function (_EarthJs) {
            Earth = _EarthJs.Earth;
        }, function (_FatherJs) {
            father = _FatherJs.father;
        }, function (_AboutJs) {
            About = _AboutJs.About;
        }],
        execute: function () {

            R.start();
            R.Scene.active._scene.remove(R.Scene.active._scene.children.filter(i => i.type === "AmbientLight")[0]);

            R.Scene.add(father);
            showModal(true);
            const skySphere = new SkySphere();
            father.add(skySphere);

            const earth = new Earth();
            earth.on(R.CONST.READY, () => {
                father.add(earth);
            });

            const about = new About();
            father.add(about);

            const light = new THREE.DirectionalLight(0xffffff, 2);
            light.position.set(-2, 5, 4);
            R.Scene.add(new R.Sculpt(light));

            const ambientLight = new THREE.AmbientLight(0xffffff, .5);
            R.Scene.add(new R.Sculpt(ambientLight));
        }
    };
});