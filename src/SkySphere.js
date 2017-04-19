import * as R from 'rodin/core';

export class SkySphere extends R.Sphere {
    constructor() {
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: R.Loader.loadTexture('./res/img/skySphere.jpg')
        });

        super(50, 20, 20, material);
    }
}
