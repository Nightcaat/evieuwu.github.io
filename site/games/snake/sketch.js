var direction = "none";
var apple = [6, 5];
var w = 20;
var h = 20;
var snake = [[2, 5]];
var queued = [];
let slider;
let squareSizeSlider;
let speedLabel;
let sizeLabel;
var snakeInt = setInterval(moveSnake, 500);
var squareSize = 40;
var dead = false;

function setup() {
	createCanvas(800, 800);
	speedSpan = createSpan();
	slider = createSlider(100, 500, 400);
	slider.parent(speedSpan);
	speedLabel = createSpan("Speed");
	speedLabel.parent(speedSpan);
	sizeSpan = createSpan();
	squareSizeSlider = createSlider(5, 40, 20);
	squareSizeSlider.parent(sizeSpan);
	speedLabel = createSpan("Size");
	speedLabel.parent(sizeSpan);
}

function draw() {
	if (squareSizeSlider.value() !== w) {
		w = squareSizeSlider.value();
		h = squareSizeSlider.value();
		squareSize = 800 / w;
		snake = [[Math.floor(w / 2), Math.floor(h / 2)]];
		apple = [Math.floor(3 * w / 4), Math.floor(h / 2)];
	}
	fill(255);
	rect(0, 0, 800, 800);
	drawGrid();
	drawApple();
	drawSnake();
	if (dead) {
		textSize(64);
		textAlign(CENTER);
		text("You died!", 400, 400);
	}
}

function drawGrid() {
	light = true;
	for (var x = 0; x < w; x++) {
		for (var y = 0; y < h; y++) {
			if (light) { fill(150); } else { fill(100); };
			light = !light;
			rect(x * squareSize, y * squareSize, squareSize, squareSize);
		}
		light = !light;
	}
}

function drawSnake() {
	strokeWeight(0);
	for (var i = 0; i < snake.length; i++) {
		if (i === 0) {
			fill(255);
		} else {
			fill(200);
		}
		toLeft = false;
		toUp = false;
		toDown = false;
		toRight = false;
		if (i + 1 !== snake.length) {
			nextseg = snake[i + 1];
			thisseg = snake[i];
			if (nextseg[0] === thisseg[0] + 1) {
				toRight = true;
			} else if (nextseg[0] === thisseg[0] - 1) {
				toLeft = true;
			} else if (nextseg[1] === thisseg[1] + 1) {
				toUp = true;
			} else if (nextseg[1] === thisseg[1] - 1) {
				toDown = true;
			}
		}
		if (i - 1 >= 0) {
			nextseg = snake[i - 1];
			thisseg = snake[i];
			if (nextseg[0] === thisseg[0] + 1) {
				toRight = true;
			} else if (nextseg[0] === thisseg[0] - 1) {
				toLeft = true;
			} else if (nextseg[1] === thisseg[1] + 1) {
				toUp = true;
			} else if (nextseg[1] === thisseg[1] - 1) {
				toDown = true;
			}
		}
		seg = snake[i];
		rect(seg[0] * squareSize + squareSize / 4, seg[1] * squareSize + squareSize / 4, squareSize / 2, squareSize / 2);
		if (toUp) {
			rect(seg[0] * squareSize + squareSize / 4, seg[1] * squareSize + 3 * squareSize / 4, squareSize / 2, squareSize / 4);
		}
		if (toDown) {
			rect(seg[0] * squareSize + squareSize / 4, seg[1] * squareSize, squareSize / 2, squareSize / 4);
		}
		if (toLeft) {
			rect(seg[0] * squareSize, seg[1] * squareSize + squareSize / 4, squareSize / 4, squareSize / 2);
		} 
		if (toRight) {
			rect(seg[0] * squareSize + 3 * squareSize / 4, seg[1] * squareSize + squareSize / 4, squareSize / 4, squareSize / 2);
		}
	}
	for (var i = 0; i < 1; i++) {
		fill(255);
		toLeft = false;
		toUp = false;
		toDown = false;
		toRight = false;
		if (i + 1 !== snake.length) {
			nextseg = snake[i + 1];
			thisseg = snake[i];
			if (nextseg[0] === thisseg[0] + 1) {
				toRight = true;
			} else if (nextseg[0] === thisseg[0] - 1) {
				toLeft = true;
			} else if (nextseg[1] === thisseg[1] + 1) {
				toUp = true;
			} else if (nextseg[1] === thisseg[1] - 1) {
				toDown = true;
			}
		}
		if (i - 1 >= 0) {
			nextseg = snake[i - 1];
			thisseg = snake[i];
			if (nextseg[0] === thisseg[0] + 1) {
				toRight = true;
			} else if (nextseg[0] === thisseg[0] - 1) {
				toLeft = true;
			} else if (nextseg[1] === thisseg[1] + 1) {
				toUp = true;
			} else if (nextseg[1] === thisseg[1] - 1) {
				toDown = true;
			}
		}
		seg = snake[i];
		rect(seg[0] * squareSize + squareSize / 4, seg[1] * squareSize + squareSize / 4, squareSize / 2, squareSize / 2);
		if (toUp) {
			rect(seg[0] * squareSize + squareSize / 4, seg[1] * squareSize + 3 * squareSize / 4, squareSize / 2, squareSize / 4);
		}
		if (toDown) {
			rect(seg[0] * squareSize + squareSize / 4, seg[1] * squareSize, squareSize / 2, squareSize / 4);
		}
		if (toLeft) {
			rect(seg[0] * squareSize, seg[1] * squareSize + squareSize / 4, squareSize / 4, squareSize / 2);
		} 
		if (toRight) {
			rect(seg[0] * squareSize + 3 * squareSize / 4, seg[1] * squareSize + squareSize / 4, squareSize / 4, squareSize / 2);
		}
	}
}

function drawApple() {
	fill(255, 0, 0);
	rect(apple[0] * squareSize + squareSize / 4, apple[1] * squareSize + squareSize / 4, squareSize / 2, squareSize / 2);
}

function keyPressed() {
	queued.splice(0, 0, keyCode);
	return;
}

function moveSnake() {
	if (queued.length > 0) {
		keyCode = queued.pop();
		if (keyCode === 87 && direction !== "down") {
			direction = "up";
		} else if (keyCode === 68 && direction !== "left") {
			direction = "right";
		} else if (keyCode === 83 && direction !== "up") {
			direction = "down";
		} else if (keyCode === 65 && direction !== "right") {
			direction = "left";
		}
	}
	pos = snake.pop();
	if (snake.length > 0) {
		pos[0] = snake[0][0];
		pos[1] = snake[0][1];
	}
	if (direction == "up") {
		pos[1]--;
	} else if (direction == "down") {
		pos[1]++;
	} else if (direction == "left") {
		pos[0]--;
	} else if (direction == "right") {
		pos[0]++;
	}
	if (pos[0] >= w || pos[0] < 0) {
		dead = true;
		clearInterval(snakeInt);
		if (direction == "up") {
			pos[1]++;
		} else if (direction == "down") {
			pos[1]--;
		} else if (direction == "left") {
			pos[0]++;
		} else if (direction == "right") {
			pos[0]--;
		}
		return;
	}
	if (pos[1] >= h || pos[1] < 0) {
		dead = true;
		clearInterval(snakeInt);
		if (direction == "up") {
			pos[1]++;
		} else if (direction == "down") {
			pos[1]--;
		} else if (direction == "left") {
			pos[0]++;
		} else if (direction == "right") {
			pos[0]--;
		}
		return;
	}
	var dying = false;
	snake.forEach((seg) => {
		if (seg[0] == pos[0] && seg[1] == pos[1]) {
			dying = true;
		}
	});
	if (dying) {
		dead = true;
		clearInterval(snakeInt);
		if (direction == "up") {
			pos[1]++;
		} else if (direction == "down") {
			pos[1]--;
		} else if (direction == "left") {
			pos[0]++;
		} else if (direction == "right") {
			pos[0]--;
		}
		return;
	}
	snake.splice(0, 0, pos);
	if (pos[0] === apple[0] && pos[1] === apple[1]) {
		var looping = true;
		while (looping) {
			apple[0] = Math.floor(random() * w);
			apple[1] = Math.floor(random() * h);
			looping = false;
			snake.forEach((seg) => {
				if (seg[0] == apple[0] && seg[1] == apple[1]) {
					looping = true;
				}
			});
		}
		snake.push([...pos]);
	}
	var speed = slider.value();
	clearInterval(snakeInt);
	snakeInt = setInterval(moveSnake, speed);
}