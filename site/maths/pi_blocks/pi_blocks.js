var block1;
var block2;
var count = 0;
var digits = 1;
var timeSteps = 8 ** digits;
var go = false;

function Box() {
	this.pos = createVector(150, 350);
	this.vel = 0;
	this.mass = 1;
	this.size = 50;

	this.update = function() {
		this.pos.x += this.vel;
	}

	this.hitWall = function() {
		return this.pos.x < 0;
	}

	this.collide = function(other) {
		return !(this.pos.x + this.size < other.pos.x || this.pos.x > other.pos.x + this.size);
	}

	this.bounce = function(other) {
		let sumM = this.mass + other.mass;
		let newV = ((this.mass - other.mass) / sumM) * this.vel;
		newV += ((2 * other.mass) / sumM) * other.vel;
		return newV;
	}

	this.draw = function() {
		stroke("#C65A52");
		fill("#FA7268");
		rect(this.pos.x, this.pos.y, this.size, this.size);
	}
}

function setup() {
	createCanvas(800, 400);
	background(200);
	digitsSlider = select("#numDigits");
	digits = digitsSlider.value();
	digitsDiv = select("#digitsDisplay");
	frameRate(60);
	block1 = new Box();
	block1.vel = 0;
	block2 = new Box();
	block2.vel = -2 / timeSteps;
	block2.mass = pow(100, digits - 1);
	block2.size = 150;
	block2.pos.y = 400 - block2.size;
	block2.pos.x = 350;
	newDiv = select("#numCols");
}

function draw() {
	background(200);
	if (digitsSlider.value() !== digits) {
		digits = digitsSlider.value();
		block2.mass = pow(100, digits - 1);
		timeSteps = 8 ** digits;
		block2.vel = -2 / timeSteps;
		digitsDiv.html("Calculating Pi to " + digits + " digits.");
		if (go) {
			go = false;
			block1 = new Box();
			block1.vel = 0;
			block2 = new Box();
			block2.vel = -2 / timeSteps;
			block2.mass = pow(100, digits - 1);
			block2.size = 150;
			block2.pos.y = 400 - block2.size;
			block2.pos.x = 350;
			count = 0;
		}
	}
	if (!go) {
		return;
	}
	for (let i = 0; i < timeSteps; i++) {
		if (block1.collide(block2)) {
			let v1 = block1.bounce(block2);
			let v2 = block2.bounce(block1);
			block1.vel = v1;
			block2.vel = v2;
			if (v1 >= 0 && v2 > 0 && v2 > v1) {
				select("#noCol").html("<h1>Will not collide again.</h1>");
			}
			count++;
		}

		if (block1.hitWall()) {
			block1.vel = -block1.vel;
			count++;
			if (block1.vel >= 0 && block2.vel > 0 && block2.vel > block1.vel) {
				select("#noCol").html("<h1>Will not collide again.</h1>");
			}
		}

		block1.update();
		block2.update();
	}
	newDiv.html(`${count} Collisions`);
	block1.draw();
	block2.draw();
}