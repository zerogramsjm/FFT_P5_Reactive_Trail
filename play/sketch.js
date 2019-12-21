
// - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - 

var system;
var mic, fft;

var x;
var y;

var i;

var sound, sound1, sound2, sound3;

var bar, bar1, bar2, bar3;

var mouseVec;

function setup() {

	var x = 0;
	var y = 0;

  createCanvas(windowWidth, windowHeight);

  system = new ParticleSystem(createVector(x,y));

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

// - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - 

}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}

    sound = 1;
    
    sound1 = 21;
    
    sound2 = 41;
    
    sound3 = 65;

// - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - 

function draw() {

  background(255);

  system.addParticle();
  system.run();

}

var Particle = function(position) {

    var spectrum = fft.analyze();

  for (var i = 0; i < sound; i++) {

    for (var i1 = 20; i1 < sound1; i1++) {

      for (var i2 = 40; i2 < sound2; i2++) {

        for (var i3 = 64; i3 < sound3; i3++) {

  // - - - - - - - - - - - - - 

          var bar = spectrum[i] /50; 

          var bar1 = spectrum[i1] /100;

          var bar2 = spectrum[i2] /550;

          var bar3 = spectrum[i3] /1000;

  // - - - - - - - - - - - - - 

  fill(
    0,0,0);
  stroke(0,0);

  this.acceleration = createVector(
    bar3, 
    bar2, 
    bar1, 
    bar);

  this.position = position.copy();

  this.lifespan = 130;

  this.velocity = createVector(
    -bar3, 
    -bar2, 
    -bar1, 
    -bar);

        }

      }

    }

  }

  if (Particle.length <= 1) {
    acceleration = 0;
  }

};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// - - - - - - - - - - - - - - -
//NEW UPDATE FUNCTION
// - - - - - - - - - - - - - - - 

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 0.1;
};

// - - - - - - - - - - - - - - -
//END UPDATE FUNCTION
// - - - - - - - - - - - - - - - 

Particle.prototype.display = function() {
  fill(255,0,0,this.lifespan);
  ellipse(this.position.x 
    + width/2
    , this.position.y
    + height/2
    , 5, 5);
};

Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-25; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }

function mousePressed() {
  clear();
}

};