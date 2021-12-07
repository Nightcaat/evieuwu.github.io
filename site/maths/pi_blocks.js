var block1;
var block2;
var count = 0;
var digits = 1;
var timeSteps = 10 ** digits;
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
	digitsSlider = createSlider(1, 6, 1, 1);
	digits = digitsSlider.value();
	digitsDiv = createDiv("<h4>Calculating Pi to " + digits + " digits.</h4>");
	frameRate(30);
	block1 = new Box();
	block1.vel = 0;
	block2 = new Box();
	block2.vel = -2 / timeSteps;
	block2.mass = pow(100, digits - 1);
	block2.size = 150;
	block2.pos.y = 400 - block2.size;
	block2.pos.x = 350;
	newDiv = createDiv("<h2>0 Collisions<h2>");
}

function draw() {
	background(200);
	if (digitsSlider.value() !== digits) {
		digits = digitsSlider.value();
		block2.mass = pow(100, digits - 1);
		timeSteps = 10 ** digits;
		block2.vel = -2 / timeSteps;
		digitsDiv.html("<h4>Calculating Pi to " + digits + " digits.</h4>");
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
			if (v1 > 0 && v2 > 0 && v2 > v1) {
				createDiv("<h1>Will not collide again.</h1>");
			}
			count++;
		}

		if (block1.hitWall()) {
			block1.vel = -block1.vel;
			count++;
		}

		block1.update();
		block2.update();
	}
	newDiv.html("<h2>" + count + " Collisions<h2>");
	block1.draw();
	block2.draw();
}