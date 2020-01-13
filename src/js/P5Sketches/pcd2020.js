module.exports = (p) => {
    let ns = 80;
    let graphics;

    p.preload = () => {

    }

    let points = [];
    p.setup = () => {
        let canvas = p.createCanvas(screen.width, screen.height).parent('p5canvas');
        p.pixelDensity(1);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.angleMode(p.DEGREES);

        //粒状感のレイヤー
        graphics = p.createGraphics(p.width, p.height);
        graphics.colorMode(p.HSB, 360, 100, 100, 100);

        //画面の15%に粒子を5%の透明度で描画
        graphics.fill(0, 0, 100, 5);
        graphics.noStroke();
        for (let i = 0; i < graphics.width * graphics.height * 5 / 100; i++) {
            graphics.ellipse(
                p.random(graphics.width),
                p.random(graphics.height),
                p.random(3),
                p.random(3)
            );
        }
    }

    p.draw = () => {
        let pagePos = document.documentElement.scrollTop || document.body.scrollTop;
        //画面を覆うため対角線の長さを計算
        let w = p.sqrt(p.sq(p.width) + p.sq(p.height));

        p.background(0)
        p.push();
        p.translate(p.width / 2, p.height / 2);
        //予め画面を回転させておく
        // rotate(int(random(8)) * 360 / 8);
        p.rotate(45);
        //分割
        separateGrid(-w / 2, -w / 2, w, 0);
        p.pop();
        //粒状感を乗せる
        p.image(graphics, 0, 0);
        p.noLoop();
    }

    function separateGrid(x, y, d, depth) {
        let sepNum = p.int(p.random(1, 4));
        let w = d / sepNum;
        for (let i = x; i < x + d - 1; i += w) {
            for (let j = y; j < y + d - 1; j += w) {
                let n = p.noise(i / ns, j / ns, p.frameCount / ns);
                if (depth <= 1 && n > 0.5 && d > p.width / 5) {
                    separateGrid(i, j, w, depth + 1);
                } else {
                    drawWave(i, j, w);
                }
            }
        }
    }

    // @reona396
    function drawWave(x, y, w) {
        const themeColor = p.random(360);

        const wavesNumArray = [5, 10, 20];
        const wavesNum = p.random(wavesNumArray);

        p.push();
        p.translate(x + w / 2, y + w / 2);
        p.rotate(p.int(p.random(4)) * 360 / 4);
        p.translate(-w / 2, -w / 2);
        let g = p.createGraphics(w, w);
        g.colorMode(p.HSB, 360, 100, 100, 100);
        g.fill(themeColor, p.random(30, 100), p.random(80, 100));
        g.noStroke();
        g.rect(0, 0, w, w);

        for (let i = 0; i < wavesNum; i++) {
            const hue = i % 2 ? themeColor : (themeColor + 180) % 360;
            const saturation = p.random(30, 100);
            const brightness = p.random(80, 100);
            const ox = p.random(-w / 2, w / 2);
            const oy = 0;
            let x, y;
            const yStepA = p.floor(p.random(12, 24));
            const yStepB = p.floor(p.random(12, 24));
            let xoff = 0.0;
            let xoffStep = p.random(0.02, 0.08)

            g.noStroke();
            g.fill(hue, saturation, brightness);

            g.push();
            g.translate(ox, oy);
            g.beginShape();
            // 行き
            let offset = w / 10;
            for (y = -offset; y <= w + offset; y += yStepA) {
                x = p.map(p.noise(xoff), 0, 1, 0, w);
                g.curveVertex(x, y);
                xoff += xoffStep;
            }
            xoff = 0.0;
            // 帰り
            for (y = w + offset; y >= -offset; y -= yStepB) {
                x = p.map(p.noise(xoff), 0, 1, 0, w);
                g.curveVertex(x, y);
                xoff += xoffStep;
            }
            g.endShape();
            g.pop();
            let d = 5;
            p.image(g, d, d, w - d * 2, w - d * 2);
            // tint(255,0,0);
            // image(g, 0, 0);
        }
        p.pop();
    }
    p.windowResized = () => {
        p.resizeCanvas(screen.width, screen.height);
    }

}
