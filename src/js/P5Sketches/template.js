module.exports = (p) => {
    p.preload = () => {

    }

    let points = [];
    p.setup = () => {
        let canvas = p.createCanvas(window.innerWidth, window.innerHeight).parent('p5canvas');
        p.background(240);
    }

    p.draw = () => {
    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    }

}
