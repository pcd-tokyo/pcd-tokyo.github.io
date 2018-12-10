module.exports = (p) => {
    p.preload = () => {

    }

    let points = [];
    p.setup = () => {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight).parent('p5canvas');
        p.background(240);
        p.frameRate(30);

        let n = 10;
        for(let i = 0; i < n; i++) {
            let qn = Math.pow(2, Math.floor(p.map(i, 0, n, 3, 8)));
            let y = p.map(qn, 0, Math.pow(2, 7), 0, p.height);
            let x = Math.floor(p.random(p.width) / qn) * qn;
            let vx = p.random(1) > 0.5 ? 2 : 0;
            let vy = vx > 0 ? 0 : 2;

            points.push({
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                target0: Math.floor(p.random(n)),
                target1: Math.floor(p.random(n))
            });
        }
    }

    p.draw = () => {
        let pagePos = document.documentElement.scrollTop || document.body.scrollTop;
        p.background(p.constrain(pagePos, 0, 240));
        let alpha = p.constrain(p.map(pagePos, 0.0, 300.0, 1.0, 0.3), 0.3, 1.0);
        p.noFill();

        if(p.frameCount % 120 == 0) {
            for(let pt of points) {
                pt.target0 = Math.floor(p.random(points.length));
                pt.target1 = Math.floor(p.random(points.length));
            }
        }
        for(let pt of points) {
            pt.x = (pt.x + pt.vx + p.width) % p.width;
            pt.y = (pt.y + pt.vy + p.height) % p.height;
        }

        let t = (p.frameCount / 30.0) * 0.25;
        t = t - Math.floor(t);
        let t0 = t > 0.5 ? (t - 0.5) * 2 : 0;
        let t1 = t < 0.5 ? t * 2 : 1;
        for(let pt of points) {
            let ptt0 = points[pt.target0];
            let ptt1 = points[pt.target1];
            p.ellipse(pt.x, pt.y, 10);
            let x00 = p.lerp(pt.x, ptt0.x, t0);
            let y00 = p.lerp(pt.y, ptt0.y, t0);
            let x01 = p.lerp(pt.x, ptt0.x, t1);
            let y01 = p.lerp(pt.y, ptt0.y, t1);
            let x10 = p.lerp(pt.x, ptt1.x, t0);
            let y10 = p.lerp(pt.y, ptt1.y, t0);
            let x11 = p.lerp(pt.x, ptt1.x, t1);
            let y11 = p.lerp(pt.y, ptt1.y, t1);
            let r = p.constrain(p.map(ptt0.y - pt.y, -100, 100, 0, 255), 0, 255);
            let g = 97;
            let b = p.constrain(p.map(ptt0.x - pt.x, -100, 100, 0, 255), 0, 255);
            p.fill(r, g, b, (0.5 - Math.abs(t - 0.5)) * 0.5 * 255 * alpha);
            p.noStroke();
            p.beginShape();
            p.vertex(x00, y00);
            p.vertex(x01, y01);
            p.vertex(x11, y11);
            p.vertex(x10, y10);
            p.endShape();
            p.stroke(r, g, b, 64 * alpha);
            p.beginShape();
            p.vertex(pt.x, pt.y);
            p.vertex(ptt0.x, ptt0.y);
            p.vertex(ptt1.x, ptt1.y);
            p.endShape(p.CLOSE);
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    }

}
