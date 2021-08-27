let numParticles = 100;
let width = 0;
let height = 0;
let radius = 100;
let cnv;
let fps = 0;
let thisFrameCount = 0;
let polys = [];
let simulation = 0;
let barWidth = 0;
let w = 0;
let bars = [];

function Particle() {
	this.pos = createVector(random() * width, random() * height);
	this.vel = p5.Vector.random2D();
	
	this.show = function() {
		stroke("#ffffff");
		strokeWeight(3);
		point(this.pos.x, this.pos.y);
	}
	
	this.update = function() {
		if (this.pos.x <= 0 || this.pos.x >= width) {
			this.vel.x *= -1;
		}
		if (this.pos.y <= 0 || this.pos.y >= height) {
			this.vel.y *= -1;
		}
		this.pos.add(this.vel);
		this.pos.x = constrain(this.pos.x, 0, width);
		this.pos.y = constrain(this.pos.y, 0, height);
	}
}

function Polygon() {
	this.pos = createVector(random() * windowWidth, -25);
	this.rot = map(random(), 0, 1, 0, 50);
	this.radius = map(random(), 0, 1, 5, 25);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, this.radius * 0.01);
	
	this.draw = function() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(frameCount / this.rot);
		polygon(0, 0, this.radius, 5);
		pop();
	}
	
	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		if (this.pos.y > windowHeight) {
			this.pos = createVector(random() * windowWidth, -25);
			this.rot = map(random(), 0, 1, 0, 50);
			this.radius = map(random(), 0, 1, 5, 25);
			this.vel = createVector(0, 0);
			this.acc = createVector(0, this.radius * 0.01);
		}
	}
}

function Bar() {
	this.height = 0;
	this.heightChange = 1;
	
	this.draw = function(x) {
		stroke("#FF7E6A");
		fill("#FA7268");
		rect(x, 0, barWidth, this.height);
	}
	
	this.update = function() {
		this.heightChange += map(random(), 0, 1, -1, 1);
		this.heightChange = constrain(this.heightChange, -2, 2);
		this.height += this.heightChange;
		this.height = constrain(this.height, 0, 300);
		if (this.height == 300) {
			this.heightChange = -1;
		}
		if (this.height == 0) {
			this.heightChange = 1;
		}
	}
}

function setup() {
	let main = document.querySelector('main');
	width = main.offsetWidth;
	height = main.offsetHeight;
	cnv = createCanvas(width, height);
	particles = [];
	numParticles = 100;
	var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
	var isTablet = navigator.userAgent.toLowerCase().match(/tablet/i);
	var isAndroid = navigator.userAgent.toLowerCase().match(/android/i);
	var isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i);
	var isiPad = navigator.userAgent.toLowerCase().match(/ipad/i);
	if (isMobile || isTablet || isAndroid || isiPhone || isiPad) {
		numParticles = 20;
	}
	for (var i = 0; i < numParticles; i++) {
		particles[i] = new Particle();
	}
	frameRate(30);
}

function newSim() {
	let i;
	switch (simulation) {
		case 0:
			particles = [];
			numParticles = 100;
			var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
			var isTablet = navigator.userAgent.toLowerCase().match(/tablet/i);
			var isAndroid = navigator.userAgent.toLowerCase().match(/android/i);
			var isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i);
			var isiPad = navigator.userAgent.toLowerCase().match(/ipad/i);
			if (isMobile || isTablet || isAndroid || isiPhone || isiPad) {
				numParticles = 20;
			}
			for (i = 0; i < numParticles; i++) {
				particles[i] = new Particle();
			}
			break;
		case 1:
			polys = [];
			for (i = 0; i < 200; i++) {
				polys[i] = new Polygon();
			}
			break;
		case 2:
			barWidth = windowWidth / 50;
			w = windowWidth;
			i = 0;
			let x = 0;
			while (x < w) {
				bars[i] = new Bar();
				x += barWidth;
				i++;
			}
			break;
	}
}

function draw() {
	background("#001220");
	switch (simulation) {
		case 0: // Connected particle field
			for (var x = 0; x < particles.length; x++) {
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

				for (var y = 0; y < particles.length; y++) {
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
			break;
		case 1: // Falling polys
			for (let i = 0; i < polys.length; i++) {
				polys[i].draw();
				polys[i].update();
			}
			break;
		case 2:
			for (let i = 0; i < bars.length; i++) {
				bars[i].draw(i * barWidth);
				bars[i].update();
			}
			break;
	}
	fps++;
	thisFrameCount++;
	stroke(255);
	textSize(16);
	if (keyIsDown(81)) {
		text("FPS: " + fps, 10, 150);
	}
	setTimeout(function() {fps--;}, 1000);
	if (thisFrameCount > 1200) {
		if (random() > 0.2) {
			newsimulation = round(map(random(), 0, 1, 0, 1));
			while (newsimulation == simulation) {
				newsimulation = round(map(random(), 0, 1, -0.5, 2.5));
			}
			simulation = newsimulation;
			newSim();
			thisFrameCount = 0;
		}
	}
}

function polygon(x, y, radius, npoints) {
	let angle = TWO_PI / npoints;
	beginShape();
	noFill();
	stroke("#FA7268");
	strokeWeight(3);
	for (let a = 0; a < TWO_PI; a += angle) {
		let sx = x + cos(a) * radius;
		let sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}