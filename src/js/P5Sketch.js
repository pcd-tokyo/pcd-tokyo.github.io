import p5 from 'p5'

const sketch = (p5) => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // setup
    p5.setup = () => {
        let canvas = p5.createCanvas(canvasWidth, canvasHeight);
        p5.background(200);
    }

    // draw
    p5.draw = () => {

    }
}

export default function initP5() {
    return new p5(sketch);
};
