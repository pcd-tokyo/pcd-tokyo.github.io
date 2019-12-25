# pcd-tokyo.github.io
Processing Community Day Tokyo Website

# Build
required: node.js
```
$ cd root-of-repo
$ npm install -g gulp-cli
$ npm i
$ gulp release
```
## gulp command
* `gulp release` : build js and sass into bundle files and put them in `/dist`
* `gulp watch` : watch js and sass files and build them when they're updated (not into `/dist` but into `/src/assets` for debug purpose)

# p5 sketch
Your sketch submitting (by fork and pull request) would be welcomed and appreciated!
1. copy `template.js` in `src/js/P5Sketches/` and rename it
2. write your code :)
    * can export p5 object with ECMA Script support

    ```js
    module.exports = (p) => {
        p.preload = () => {

        }

        let points = [];
        p.setup = () => {
            let canvas = p.createCanvas(p.createCanvas(screen.width, screen.height)).parent('p5canvas');
        }

        p.draw = () => {

        }

        p.windowResized = () => {
            p.resizeCanvas(p.createCanvas(screen.width, screen.height));
        }

    }

    ```

2. import your sketch in `P5scketch.js` in `src/js/` like below

    ```js
    import p5 from 'p5'
    import p5nh0 from './P5Sketches/nh0.js'
    import p5nh1 from './P5Sketches/nh1.js'
    import p5kh0 from './P5Sketches/kh0.js'
    //import mySketch from './P5Sketches/mySketch.js'

    let sketches = [p5nh0, p5nh1, p5kh0 /*, mySketch*/ ];
    let sketch = sketches[Math.floor(sketches.length * Math.random())];

    export default function initP5() {
        return new p5(sketch);
    }

    ```


3. rebuild `bundle` by the command above
