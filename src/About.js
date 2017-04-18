import * as R from 'rodin/core';
import {DynamicText} from './DynamicText.js';

export class About extends R.Sculpt {
    constructor() {
        const material = new THREE.MeshBasicMaterial({
            map: R.Loader.loadTexture('/metaverse/res/img/about.png'),
            transparent: true
        });

        super(new THREE.Mesh(new THREE.PlaneGeometry(3, 2.609), material));
        this.position.set(0, 1.6, -3);
    }
}
