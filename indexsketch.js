numParticles = 100;
width = 0;
height = 0;
radius = 100;
let cnv;
fps = 0;

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
		this.pos.x = constrain(this.pos.x, 0, width);
		this.pos.y = constrain(this.pos.y, 0, height);
	}
}

function setup() {
	let main = document.querySelector('main');
	width = main.offsetWidth;
	height = main.offsetHeight;
	cnv = createCanvas(width, height);
	particles = [];
	for (var i = 0; i < numParticles; i++) {
		particles[i] = new Particle();
	}
	frameRate(60);
}

function draw() {
	background("#001220");
	for (var x = 0; x < numParticles; x++) {
		particles[x].update();
		particles[x].show();
		// Move particles if too close to mouse
		let distance = dist(particles[x].pos.x, particles[x].pos.y, mouseX, mouseY);
		if (distance < radius) {
			let mouse = createVector(mouseX, mouseY);
			let difference = p5.Vector.sub(mouse, particles[x].pos);
			difference.setMag(map(radius / distance, 1, 15, 1, 200));
			particles[x].pos.sub(difference);
		}

		for (var y = 0; y < numParticles; y++) {
			if (y == x) {
				continue;
			}
			distance = dist(particles[x].pos.x, particles[x].pos.y, particles[y].pos.x, particles[y].pos.y);
			if (distance > 200) {
				continue;
			}
			stroke('rgba(255,255,255,' + (1 - (distance / 200)) + ')');
			strokeWeight(1);
			line(particles[x].pos.x, particles[x].pos.y, particles[y].pos.x, particles[y].pos.y);
		}

		if (random() < 0.01) {
			particles[x].vel = p5.Vector.random2D();
		}
	}
	fps++;
	stroke(255);
	textSize(16);
	if (keyIsDown(81)) {
		text("FPS: " + fps, 10, 150);
	}
	setTimeout(function() {fps--;}, 1000);
}