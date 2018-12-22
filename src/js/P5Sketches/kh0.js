module.exports = (p) => {
    p.preload = () => {

    }

    var particles_a = [];
    var particles_b = [];
    var particles_c = [];
    var nums = 400;
    var noiseScale = 100;
    var convergenceCount = 0;
    var backgroundCol;
    var col1,col2,col3;
    var offset;
    var prePagePos = p.random(1000);

    p.setup = () => {
      let canvas = p.createCanvas(screen.width, screen.height).parent('p5canvas');
      backgroundCol = p.color(p.random(55)+200, p.random(55)+200, p.random(55)+200);
      col1 = p.color(p.random(255), p.random(255), p.random(255));
      col2 = p.color(p.random(255), p.random(255), p.random(255));
      col3 = p.color(p.random(255), p.random(255), p.random(255));
      p.background(backgroundCol);

      for (var i = 0; i < nums; i++) {
        particles_a[i] = new Particle(p.random(0, p.width), p.random(0, p.height));
        particles_b[i] = new Particle(p.random(0, p.width), p.random(0, p.height));
        particles_c[i] = new Particle(p.random(0, p.width), p.random(0, p.height));
      }
    }

    p.draw = () => {
        let pagePos = document.documentElement.scrollTop || document.body.scrollTop;
        let scrollDelta = pagePos - prePagePos;
        prePagePos = pagePos;
        checkScroll(scrollDelta);

        p.noStroke();
        p.smooth();
        backgroundCol.setAlpha(8);
        p.background(backgroundCol);
        for (var i = 0; i < nums; i++) {
        var radius = p.map(i, 0, nums, 1, 4);
        var alpha = p.map(i, 0, nums, 0, 250);

        col1.setAlpha(alpha);
        p.fill(col1);
        particles_a[i].move();
        particles_a[i].display(radius);
        particles_a[i].checkEdge();

        col2.setAlpha(alpha);
        p.fill(col2);
        particles_b[i].move();
        particles_b[i].display(radius);
        particles_b[i].checkEdge();

        col3.setAlpha(alpha);
        p.fill(col3);
        particles_c[i].move();
        particles_c[i].display(radius);
        particles_c[i].checkEdge();


        }
    }

    p.windowResized = () => {
        p.resizeCanvas(screen.width, screen.height);
    }

    function rand2D(x, y) {
      let st = p.createVector(x+offset,y+offset);
      st = p.createVector(st.dot(p.createVector(12.1, 31.7)),
                          st.dot(p.createVector(26.5, 18.3)));
      let v1 = p.sin(st.x) * 43758.5453123;
      let v2 = p.sin(st.y) * 23524.5624523;
      v1 = frac(v1);
      v2 = frac(v2);
      return p.createVector(v1, v2);
    }

    function test(x){
        let o = p.createVector(0, 0);
      return o.dist(p.createVector(100,50));
    }

    function direction(x, y) {
      let i_o = p.createVector(p.floor(x), p.floor(y));
      let rand_o = i_o.add(rand2D(i_o.x, i_o.y));
      let o = p.createVector(0, 0);
      return o.dist(rand_o);
    }

    function frac(v){
      if (v > 0) {
        v -= p.floor(v);
      } else {
        v -= p.ceil(v);
      }
      return v;
    }

    function Particle(x, y) {
      this.dir = p.createVector(0, 0);
      this.vel = p.createVector(0, 0);
      this.pos = p.createVector(x, y);
	  this.prePos = p.createVector(0, 0);
      this.speed = 0.8;

      this.move = function() {
        var angle = direction(this.pos.x / noiseScale, this.pos.y / noiseScale) * 3.14 * noiseScale;
        this.dir.x = p.cos(angle);
        this.dir.y = p.sin(angle);
        this.vel = this.dir.copy();
        this.vel.mult(this.speed);
        this.prePos = this.pos.copy();
        this.pos.add(this.vel);
      }

      this.checkEdge = function() {
        if (this.pos.x > p.width || this.pos.x < 0 || this.pos.y > p.height || this.pos.y < 0) {
          this.pos.x = p.random(0, p.width);
          this.pos.y = p.random(0, p.lheight);
        }
      }

      this.display = function(r) {
        p.ellipse(this.pos.x, this.pos.y, r, r);
      }
    }

     function checkScroll(delta) {
      if(p.abs(delta) > 100){
        p.background(255);
        offset = p.random(10000);
        for (var i = 0; i < nums; i++) {
    	    particles_a[i] = new Particle(p.random(0, p.width), p.random(0, p.height));
    	    particles_b[i] = new Particle(p.random(0, p.width), p.random(0, p.height));
    	    particles_c[i] = new Particle(p.random(0, p.width), p.random(0, p.height));
  	    }
      }
    }

}
