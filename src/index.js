import * as R from 'rodin/core';

R.start();
R.Scene.active._scene.remove(R.Scene.active._scene.children.filter(i => i.type === "AmbientLight")[0]);

import {SkySphere} from './SkySphere.js';
import {Earth} from './Earth.js';
import {father} from './Father.js';
import {About} from './About.js';

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

setTimeout(() => {
    const intro = document.getElementById('intro');
    intro.parentNode.removeChild(intro);
}, 4000);


const responsive = () => {
    const img = document.getElementById('img');
    const width = window.innerWidth;
    const height = window.innerHeight;

    let imgWidth = 0;
    if (width < 1000 && width < height)
        imgWidth = 40;
    else if (width < 1000 && width > height)
        imgWidth = 20;
    else
        imgWidth = 15;

    const imgWidthPx = width * imgWidth / 100;

    img.style.width = `${imgWidthPx}px`;
    img.style.height = `${imgWidthPx}px`;
    img.style['margin-top'] = `${-imgWidthPx / 2}px`;
    img.style['margin-left'] = `${-imgWidthPx / 2}px`;
    img.style.display = 'block';
};

responsive();
window.addEventListener('resize', responsive);