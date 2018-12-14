import p5 from 'p5'
import p5nh0 from './P5Sketches/nh0.js'
import p5nh1 from './P5Sketches/nh1.js'
import p5kh0 from './P5Sketches/kh0.js'

let sketches = [p5nh0, p5nh1, p5kh0];
let sketch = sketches[Math.floor(sketches.length * Math.random())];

export default function initP5() {
    return new p5(sketch);
}
