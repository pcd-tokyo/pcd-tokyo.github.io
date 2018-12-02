import p5 from 'p5'

const sketch = (p) => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    p.preload = () => {

    }

    p.setup = () => {
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        p5.background(200);

    }

    p.draw = () => {


    }
}

export default function initP5() {
    return new p5(sketch);
}
