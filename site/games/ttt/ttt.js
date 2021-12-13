ttt = [[null, null, null], [null, null, null], [null, null, null]];
turn = "X";
whoWon = null;
winTiles = [];
prevWinColour = 0;
ai = true;
anyMoves = true;
AIDiff = "Medium";

function setup() {
	createCanvas(600, 600);
	background(200);
	frameRate(60);
}

function draw() {
	colorMode(RGB, 255);
	background(200);
	stroke(0);
	strokeWeight(2);
	line(200, 0, 200, 600);
	line(400, 0, 400, 600);
	line(0, 200, 600, 200);
	line(0, 400, 600, 400);
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (ttt[x][y] === "X") {
				fill(0);
				strokeWeight(5);
				line(x * 200 + 50, y * 200 + 50, x * 200 + 150, y * 200 + 150);
				line(x * 200 + 50, y * 200 + 150, x * 200 + 150, y * 200 + 50);
			} else if (ttt[x][y] === "O") {
				fill(255);
				strokeWeight(5);
				ellipse(x * 200 + 100, y * 200 + 100, 100, 100);
			}
		}
	}

	checkWin();
	if (whoWon !== null) {
		strokeWeight(10);
		colorMode(HSB, 255);
		c = color(prevWinColour, 200, 200);
		stroke(c);
		line(winTiles[0][0] * 200 + 100, winTiles[0][1] * 200 + 100, winTiles[1][0] * 200 + 100, winTiles[1][1] * 200 + 100);
		fill(125);
		textSize(100);
		textAlign(CENTER, CENTER);
		stroke(255);
		if (whoWon === "O" && ai) {
			text("AI wins!", 300, 300);
		} else if (whoWon === "X" && ai) {
			text("You win!", 300, 300);
		} else {
			text(whoWon + " wins!", 300, 300);
		}
		prevWinColour++;
		if (prevWinColour > 255) {
			prevWinColour = 0;
		}
	}

	if (!anyMoves) {
		fill(125);
		textSize(100);
		textAlign(CENTER, CENTER);
		stroke(125);
		text("Tie!", 300, 300);
	}
}

function AIChange() {
	ttt = [[null, null, null], [null, null, null], [null, null, null]];
	turn = "X";
	whoWon = null;
	winTiles = [];
	prevWinColour = 0;
}

function mouseClicked() {
	if (whoWon !== null) {
		return;
	}

	xPos = mouseX;
	yPos = mouseY;

	xCoord = floor(mouseX / 200);
	yCoord = floor(mouseY / 200);

	if (ttt[xCoord][yCoord] === null) {
		if (turn === "X") {
			ttt[xCoord][yCoord] = "X";
		} else {
			ttt[xCoord][yCoord] = "O";
		}
		turn = turn === "X" ? "O" : "X";

		checkWin();
	
		if (ai && whoWon === null) {
			AIMove();
		}
	}

}

function checkWin() {
	for (var x = 0; x < 3; x++) {
		if (ttt[x][0] !== null && ttt[x][0] === ttt[x][1] && ttt[x][1] === ttt[x][2]) {
			whoWon = ttt[x][0];
			winTiles = [[x, 0], [x, 2]];
		}
	}
	for (var y = 0; y < 3; y++) {
		if (ttt[0][y] !== null && ttt[0][y] === ttt[1][y] && ttt[1][y] === ttt[2][y]) {
			whoWon = ttt[0][y];
			winTiles = [[0, y], [2, y]];
		}
	}
	if (ttt[0][0] !== null && ttt[0][0] === ttt[1][1] && ttt[1][1] === ttt[2][2]) {
		whoWon = ttt[0][0];
		winTiles = [[0, 0], [2, 2]];
	}
	if (ttt[0][2] !== null && ttt[0][2] === ttt[1][1] && ttt[1][1] === ttt[2][0]) {
		whoWon = ttt[0][2];
		winTiles = [[0, 2], [2, 0]];
	}
	return whoWon;
}

function onlyCheckWin() {
	var win = null;
	for (var x = 0; x < 3; x++) {
		if (ttt[x][0] !== null && ttt[x][0] === ttt[x][1] && ttt[x][1] === ttt[x][2]) {
			win = ttt[x][0];
		}
	}
	for (var y = 0; y < 3; y++) {
		if (ttt[0][y] !== null && ttt[0][y] === ttt[1][y] && ttt[1][y] === ttt[2][y]) {
			win = ttt[0][y];
		}
	}
	if (ttt[0][0] !== null && ttt[0][0] === ttt[1][1] && ttt[1][1] === ttt[2][2]) {
		win = ttt[0][0];
	}
	if (ttt[0][2] !== null && ttt[0][2] === ttt[1][1] && ttt[1][1] === ttt[2][0]) {
		win = ttt[0][2];
	}
	return win;
}

function getAIMove() {
	avaliable = [];
	for (var y = 0; y < 3; y++) {
		if (ttt[0][y] === "O" && ttt[1][y] === "O" && ttt[2][y] === null) {
			avaliable.push([2, y]);
		}
		if (ttt[1][y] === "O" && ttt[2][y] === "O" && ttt[0][y] === null) {
			avaliable.push([0, y]);
		}
		if (ttt[0][y] === "O" && ttt[2][y] === "O" && ttt[1][y] === null) {
			avaliable.push([1, y]);
		}
		if (ttt[y][0] === "O" && ttt[y][1] === "O" && ttt[y][2] === null) {
			avaliable.push([y, 2]);
		}
		if (ttt[y][1] === "O" && ttt[y][2] === "O" && ttt[y][0] === null) {
			avaliable.push([y, 0]);
		}
		if (ttt[y][0] === "O" && ttt[y][2] === "O" && ttt[y][1] === null) {
			avaliable.push([y, 1]);
		}
	}
	if (ttt[0][0] === "O" && ttt[1][1] === "O" && ttt[2][2] === null) {
		avaliable.push([2, 2]);
	}
	if (ttt[1][1] === "O" && ttt[2][2] === "O" && ttt[0][0] === null) {
		avaliable.push([0, 0]);
	}
	if ((ttt[0][0] === "O" && ttt[2][2] === "O") || (ttt[0][2] === "O" && ttt[2][0] === "O") && ttt[1][1] === null) {
		avaliable.push([1, 1]);
	}
	if (ttt[0][2] === "O" && ttt[1][1] === "O" && ttt[2][0] === null) {
		avaliable.push([2, 0]);
	}
	if (ttt[1][1] === "O" && ttt[2][0] === "O" && ttt[0][2] === null) {
		avaliable.push([0, 2]);
	}
	return avaliable;
}

function getMove() {
	avaliableMoves = getAIMove();
	if (avaliableMoves.length > 0) {
		if (AIDiff === "Easy") {
			if (random(0, 1) > 0.6) {
				return avaliableMoves[random(0, avaliableMoves.length - 1)];
			}
		} else if (AIDiff === "Medium") {
			if (random(0, 1) > 0.3) {
				return avaliableMoves[random(0, avaliableMoves.length - 1)];
			}
		} else {
			return avaliableMoves[random(0, avaliableMoves.length - 1)];
		}
	}
	if (avaliableMoves.length === 0) {
		for (var y = 0; y < 3; y++) {
			if (ttt[0][y] === "X" && ttt[1][y] === "X" && ttt[2][y] === null) {
				return [2, y];
			}
			if (ttt[1][y] === "X" && ttt[2][y] === "X" && ttt[0][y] === null) {
				return [0, y];
			}
			if (ttt[0][y] === "X" && ttt[2][y] === "X" && ttt[1][y] === null) {
				return [1, y];
			}
			if (ttt[y][0] === "X" && ttt[y][1] === "X" && ttt[y][2] === null) {
				return [y, 2];
			}
			if (ttt[y][1] === "X" && ttt[y][2] === "X" && ttt[y][0] === null) {
				return [y, 0];
			}
			if (ttt[y][0] === "X" && ttt[y][2] === "X" && ttt[y][1] === null) {
				return [y, 1];
			}
		}
		if (ttt[0][0] === "X" && ttt[1][1] === "X" && ttt[2][2] === null) {
			return [2, 2];
		}
		if (ttt[1][1] === "X" && ttt[2][2] === "X" && ttt[0][0] === null) {
			return [0, 0];
		}
		if (((ttt[0][0] === "X" && ttt[2][2] === "X") || (ttt[0][2] === "X" && ttt[2][0] === "X")) && ttt[1][1] === null) {
			return [1, 1];
		}
		if (ttt[0][2] === "X" && ttt[1][1] === "X" && ttt[2][0] === null) {
			return [2, 0];
		}
		if (ttt[1][1] === "X" && ttt[2][0] === "X" && ttt[0][2] === null) {
			return [0, 2];
		}
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				if (ttt[x][y] === null) {
					avaliableMoves.push([x, y]);
				}
			}
		}
	}
	return avaliableMoves[round(random(-0.5, avaliableMoves.length - 0.5))];
}

function AIMove() {
	/*
	if (turn === "O") {
		return;
	}

	var x = round(random(-0.5, 2.5));
	var y = round(random(-0.5, 2.5));

	if (ttt[x][y] === null) {
		ttt[x][y] = "O";
		turn = "X";
	} else {
		AIMove();
	}*/

	moves = false;
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (ttt[x][y] === null) {
				moves = true;
				break;
			}
		}
	}
	if (!moves) {
		anyMoves = false;
		return;
	}

	move = getMove();
	if (move === null) {
		console.log("Uh oh");
		return;
	}
	if (ttt[move[0]][move[1]] !== null) {
		move = getMove();
	}
	ttt[move[0]][move[1]] = "O";
	turn = "X";
}