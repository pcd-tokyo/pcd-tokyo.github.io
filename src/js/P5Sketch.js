import p5 from 'p5'

const sketch = (p) => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    p.preload = () => {

    }

    p.setup = () => {
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('p5canvas');
        p.background(240);

    }

    p.draw = () => {


    }
}

export default function initP5() {
    return new p5(sketch);
}
