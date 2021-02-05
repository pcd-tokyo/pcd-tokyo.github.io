var sketch = function(p){
  p.grid = [];
  p.noises = [];
  p.col = ["#FF5F5F", "#F8907C", "#FFC2A7", "#FFEC57", "#9EF2BB", "#6CBAF4", "#4AD0E8"];
  p.backCol = ["#2B2F2F", "#4B5353"];
  
  p.xoff = 0.1;
  p.scl = 40;
  p.count;
  
  p.setup = function() {
    p.bg = p.createCanvas(p.windowWidth, p.windowHeight);
    p.count = p.scl / p.width;
    p.noStroke();
    p.createGrid();
  }
  
  
p.draw  = function() {
  p.randomSeed(10000);
  p.background(255);
  for (p.i = p.grid.length - 1; p.i >= 0; p.i--) {
    p.g = p.grid[p.i];
    p.n = p.noises[p.i];
      if (p.n > 0.48) {
        p.c = p.color(p.random(p.col));
        p.c.setAlpha(p.noise(p.i * 0.01, p.n * 0.1, p.xoff) * 255);
        p.fill(p.c);
        //fill(col[floor(n*random(col.length+1))]);
      }
      p.rect(p.g.x, p.g.y, p.scl, p.scl);
      p.xoff += 0.00003;

      p.g.x -= 0.2;
      p.g.y -= 0.4;

    if (p.g.x < -p.scl) {
      p.g.x = p.width;
    }
    if (p.g.y < -p.scl) {
      p.g.y = p.height;
    }
    }
  }
  
  p.createGrid = function() {
    for (p.x = 0; p.x < p.width + p.scl; p.x += p.scl) {
      for (p.y = 0; p.y < p.height + p.scl; p.y += p.scl) {
        p.v = p.createVector(p.x, p.y);
        p.z = p.random(1);
        p.n = p.noise(p.x * 0.01, p.y * 0.003, p.z * 0.5);
        p.grid.push(p.v);
        p.noises.push(p.n);
      }
    }
  }
}

new p5(sketch, window.document.getElementById('p5canvas'));
new p5(sketch, window.document.getElementById('bgcanvas'));

