import p5 from 'p5'

const sketch = (p) => {
    let points = [];
    let funcs = [
        // function (x, y) {
        //     return p.random(-100, 100);
        // },
        function (x, y) {
            return Math.sin(x * params.cx.value + y * params.cy.value) * 100 * Math.sin(y * params.cy2.value);
        }
    ]
    let func = funcs[0];
    let params = {
        cx: {
            min: -0.02, max: 0.02, value: 0
        },
        cy: {
            min: -0.02, max: 0.02, value: 0
        },
        cy2: {
            min: -0.02, max: 0.02, value: 0
        },
    }

    function init () {
        // p.background(bgColor);
        func = p.random(funcs);

        for(let key in params) {
            let param = params[key];
            param.value = p.random(param.min, param.max);
        }
    }

    p.preload = () => {

    }

    p.setup = () => {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight).parent('p5canvas');
        p.background(240);

        for(let i = 0; i <= 100; i++) {
            points.push({x: p.map(i, 0, 100, -p.width/2, p.width/2), y: 0});
        }
        init();
    }

    let bgColor = 240;
    p.draw = () => {
        if(p.frameCount % 1000 == 0) {
            init();
        }
        p.translate(p.width / 2, 0);
        let gy = p.map(p.frameCount % 1000, 0, 1000, -200, p.height + 200);
        p.translate(0, gy);
        for(let i = 0; i < points.length; i++) {
            let pt = points[i];
            pt.y = p.lerp(pt.y, func(pt.x, gy), 0.1);
        }
        p.stroke(0, 20);
        p.noFill();
        p.beginShape();
        for(let i = 0; i < points.length-1; i++) {
            let pt0 = points[i];
            let pt1 = points[i+1];
            let d = p.constrain(p.map(pt1.y - pt0.y, -20, 20, 0, 1), 0, 1);
            p.stroke(d * 255, 0, 255 - d * 255, 20);
            p.vertex(pt0.x, pt0.y);
        }
        p.endShape();

        p.noStroke();
        p.fill(bgColor);
        p.rect(-p.width / 2, 100, p.width, 50);
    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    }

}

export default function initP5() {
    return new p5(sketch);
}
