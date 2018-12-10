import p5 from 'p5'

module.exports = (p) => {
    p.preload = () => {

    }

    let points = [];
    p.setup = () => {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight).parent('p5canvas');
        p.background(240);
        p.frameRate(30);

        let n = 30;
        for(let i = 0; i < n; i++) {
            let x = p.random(p.width);
            let y = p.random(p.height);
            x = Math.floor(x * 0.01) / 0.01;
            y = Math.floor(y * 0.01) / 0.01;
            points.push({x: x, y: y, target: Math.floor(p.random(n))});
        }
    }

    p.draw = () => {
        p.background(240);
        p.fill(0);

        if(p.frameCount % 120 == 0) {
            for(let pt of points) {
                pt.target = Math.floor(p.random(points.length));
            }
        }

        let t = (p.frameCount / 30.0) * 0.25;
        t = t - Math.floor(t);
        let t0 = t > 0.5 ? (t - 0.5) * 2 : 0;
        let t1 = t < 0.5 ? t * 2 : 1;
        for(let pt of points) {
            let ptt = points[pt.target];
            // p.ellipse(pt.x, pt.y, 10);
            let x0 = p.lerp(pt.x, ptt.x, t0);
            let y0 = p.lerp(pt.y, ptt.y, t0);
            let x1 = p.lerp(pt.x, ptt.x, t1);
            let y1 = p.lerp(pt.y, ptt.y, t1);
            p.stroke(81,97,242, (0.5 - Math.abs(t - 0.5)) * 32);
            p.line(pt.x, pt.y, ptt.x, ptt.y);
            p.stroke(81,97,242, 32);
            p.line(x0, y0, x1, y1);
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    }

}

// export default function initP5() {
//     return new p5(sketch);
// }
