numParticles = 50;
width = 0;
height = 0;

function Particle() {
	this.pos = createVector(random() * width, random() * height);
	this.vel = p5.Vector.random2D();
	
	this.show = function() {
		stroke("#ffffff");
		strokeWeight(3);
		point(this.pos.x, this.pos.y);
	}
	
	this.update = function() {
		if (this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		if (this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
		this.pos.add(this.vel);
	}
}

function setup() {
	let main = document.querySelector('main');
	width = main.offsetWidth;
	height = main.offsetHeight;
	createCanvas(width - 10, height - 10);
	particles = [];
	for (var i = 0; i < numParticles; i++) {
		particles[i] = new Particle();
	}
	frameRate(30);
	strokeWeight(2);
	stroke("#ffffff");
	rect(0, 0, width, height);
}

function draw() {
	background("#001220");
	for (var x = 0; x < numParticles; x++) {
		particles[x].update();
		particles[x].show();
		for (var y = 0; y < numParticles; y++) {
			if (y == x) {
				continue;
			}
			var distance = dist(particles[x].pos.x, particles[x].pos.y, particles[y].pos.x, particles[y].pos.y);
			if (distance > 200) {
				continue;
			}
			stroke('rgba(255,255,255,' + (1 - (distance / 200)) + ')');
			strokeWeight(1);
			line(particles[x].pos.x, particles[x].pos.y, particles[y].pos.x, particles[y].pos.y);
		}
	}
}