import p5 from 'p5'
import p5nh0 from './P5Sketches/nh0.js'
import p5nh1 from './P5Sketches/nh1.js'

let sketches = [p5nh1];//[p5nh0, p5nh1];
let sketch = sketches[Math.floor(sketches.length * Math.random())];

export default function initP5() {
    return new p5(sketch);
}
