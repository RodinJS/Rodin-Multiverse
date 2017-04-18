import * as R from 'rodin/core';

export class Earth extends R.Sculpt {
    constructor() {
        super('/res/models/earth/earth.obj');

        this.on(R.CONST.READY, () => {
            this.position.set(3, 1.6, 0);
        });

        this.on(R.CONST.UPDATE, () => {
            this.rotation.y += R.Time.delta * .001 * .25;
        })
    }
}