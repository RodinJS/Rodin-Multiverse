import * as R from 'rodin/core';
import {DynamicText} from './DynamicText.js';

const fadeInAnimation = new R.AnimationClip('fadein', {
    _threeObject: {
        material: {
            opacity: {
                from: 0,
                to: 1
            }
        }
    }
});
fadeInAnimation.duration(500);


const fadeOutAnimation = new R.AnimationClip('fadeout', {
    _threeObject: {
        material: {
            opacity: {
                from: 1,
                to: 0
            }
        }
    }
});
fadeOutAnimation.duration(500);

export class About extends R.Sculpt {
    constructor() {
        super();
        const lessMaterial = new THREE.MeshBasicMaterial({
            map: R.Loader.loadTexture('./res/img/about.png'),
            transparent: true,
            opacity: 1
        });
        const less = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(3.5, 2.17875), lessMaterial));
        this.add(less);
        less.position.set(0, 1.6, -3);
        this.less = less;

        const moreMaterial = new THREE.MeshBasicMaterial({
            map: R.Loader.loadTexture('./res/img/about_more.png'),
            transparent: true,
            opacity: 0
        });

        const more = new R.Sculpt(new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.248), moreMaterial));
        this.add(more);
        more.position.set(0, 1.6, -3);
        this.more = more;

        more.animation.add(fadeInAnimation, fadeOutAnimation);
        less.animation.add(fadeInAnimation, fadeOutAnimation);

        this.rotation.y = Math.PI / 3;
        this.mode = 'less';

        more.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
            if(this.started)
                return;

            this.toggle();
        });

        less.on(R.CONST.GAMEPAD_BUTTON_DOWN, () => {
            if(this.started)
                return;

            this.toggle();
        });

        this.started = false;
        less.on(R.CONST.ANIMATION_COMPLETE, (evt) => {
            this.started = false;
            if(evt.animation === 'fadein') {
                this.remove(more);
            } else {
                this.remove(less);
            }
        })
    }

    toggle() {
        this.started = true;
        if (this.more.animation.isPlaying() || this.less.animation.isPlaying())
            return;

        if (this.mode === 'less') {
            this.add(this.more);
            this.more.animation.start('fadein');
            this.less.animation.start('fadeout');
            this.mode = 'more';
        } else {
            this.add(this.less);
            this.less.animation.start('fadein');
            this.more.animation.start('fadeout');
            this.mode = 'less';
        }
    }
}
