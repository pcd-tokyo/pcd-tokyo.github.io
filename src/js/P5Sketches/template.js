module.exports = (p) => {
    p.preload = () => {

    }

    let points = [];
    p.setup = () => {
        let canvas = p.createCanvas(p.createCanvas(screen.width, screen.height)).parent('p5canvas');
    }

    p.draw = () => {
        
    }

    p.windowResized = () => {
        p.resizeCanvas(p.createCanvas(screen.width, screen.height));
    }

}
