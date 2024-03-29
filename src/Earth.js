import * as R from 'rodin/core';
import {Warning} from './Warning.js';
import {father} from './Father.js';

export class Earth extends R.Sculpt {
    constructor() {
        super();
        const globe = new R.Sculpt('./res/models/earth1/earth.obj');
        globe.on(R.CONST.READY, () => {
            this.add(globe);
        });

        this.on(R.CONST.READY, () => {
            this.position.set(0, 1.6, -3);
        });

        globe.on(R.CONST.UPDATE, () => {
            globe.rotation.y += R.Time.delta * .001 * .25;
        });

        const eventHandler = new R.Sphere(.9, new THREE.MeshBasicMaterial({transparent: true, opacity: 0, side: THREE.DoubleSide}));
        this.add(eventHandler);

        let lastDown = R.Time.now;
        eventHandler.on(R.CONST.GAMEPAD_BUTTON_DOWN, (evt) => {
            lastDown = R.Time.now;
        });

        eventHandler.on(R.CONST.GAMEPAD_BUTTON_UP, (evt) => {
            if(R.Time.now - lastDown > 400)
                return;

            const warning = Warning.getInstance();
            father.add(warning);
        });

        const pulseMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: R.Loader.loadTexture('./res/img/pulse.png'),
            transparent: true
        });

        const pulse = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(1.5, .15), pulseMaterial));
        pulse.position.set(0, -1.25, 0);
        this.add(pulse);

        const fadeAnim = new R.AnimationClip('fade', {
            _threeObject: {
                material: {
                    opacity: {
                        from: .2,
                        to: 1
                    }
                }
            }
        });
        fadeAnim.duration(1000);

        const fadeOutAnim = new R.AnimationClip('fadeout', {
            _threeObject: {
                material: {
                    opacity: {
                        from: 1,
                        to: .2
                    }
                }
            }
        });
        fadeOutAnim.duration(1000);

        pulse.animation.add(fadeAnim, fadeOutAnim);

        pulse.on(R.CONST.ANIMATION_COMPLETE, (evt) => {
            if (evt.animation === 'fade')
                pulse.animation.start('fadeout');

            if (evt.animation === 'fadeout')
                pulse.animation.start('fade');
        });

        pulse.animation.start('fade');
    }
}