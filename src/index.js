import * as R from 'rodin/core';

R.start();
R.Scene.active._scene.remove(R.Scene.active._scene.children.filter(i => i.type === "AmbientLight")[0]);

import { SkySphere } from './SkySphere.js';
import { Earth } from './Earth.js';
import { father } from './Father.js';
import { About } from './About.js';

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