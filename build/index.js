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
            const skySphere = new SkySphere();
            R.Scene.add(skySphere);

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

            // const rotateFather = () => {
            //     const cameraY = getCameraY();
            //
            //     const fatherY = father.rotation.y;
            //     const diff = cameraY - fatherY;
            //     father.rotation.y += diff * .02;
            //
            //     if (Math.abs(cameraY - father.rotation.y) > .01)
            //         requestAnimationFrame(rotateFather);
            // };
            //
            // setTimeout(() => {
            //     rotateFather();
            // }, 10000);
            //
            // const dotAngle = (a, b) => {
            //     return Math.acos((a.x * b.x + a.y * b.y) / a.length() / b.length());
            // };
            //
            // export const getAngle = (a, b) => {
            //     a = a.sub(b);
            //     if (a.x >= 0 && a.y >= 0) {
            //         return dotAngle(a, new THREE.Vector2(1, 0));
            //     } else if (a.x >= 0 && a.y < 0) {
            //         return Math.PI * 2.0 - dotAngle(a, new THREE.Vector2(1, 0));
            //     } else if (a.x < 0 && a.y < 0) {
            //         return Math.PI * 2.0 - dotAngle(a, new THREE.Vector2(1, 0));
            //     } else {
            //         return dotAngle(a, new THREE.Vector2(1, 0));
            //     }
            // };
            //
            // const getCameraY = () => {
            //     const worldDirection = R.Scene.activeCamera.getWorldDirection();
            //     const yRotation = new THREE.Vector2(worldDirection.x, worldDirection.z).normalize();
            //     let yAngle = -getAngle(new THREE.Vector2(0, 0), yRotation);
            //
            //     yAngle += Math.PI;
            //
            //     return yAngle;
            // };
        }
    };
});