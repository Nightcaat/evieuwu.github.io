var selected_word = guess_words[Math.floor(Math.random() * guess_words.length)];
var guesses = [];
var guesses_colour = [];
var success = [83, 141, 78];
var wrong_place = [219, 192, 71];
var wrong_letter = [69, 70, 64];
var current_guess = "";
var won = false;
var lost = false;
var prevGuesses = [0, 0, 0, 0, 0, 0, 0];

function setup() {
	createCanvas(1200, 800);
	background(200);
	frameRate(60);
	prevGuesses = localStorage.getItem("ev_wordle_guesses");
	if (prevGuesses !== null) {
		prevGuesses = JSON.parse(prevGuesses);
	} else {
		prevGuesses = [0, 0, 0, 0, 0, 0, 0];
	}
}

function draw() {
	translate(400, 0);
	colorMode(RGB, 255);
	background(50);
	textSize(64);
	textAlign(CENTER, CENTER);
	fill(150);
	for (var y = 0; y < 6; y++) {
		for (var i = 0; i < 5; i++) {
			if (guesses.length > y) {
				if (guesses_colour[y][i] == "yellow") {
					fill(wrong_place);
				} else if (guesses_colour[y][i] == "green") {
					fill(success);
				} else {
					fill(wrong_letter);
				}
			} else {
				fill(150);
			}
			rect(50 * (i + 1) + 100 * i, y * 130 + 20, 100, 100);
		}
	}

	for (var y = 0; y < guesses.length; y++) {
		for (var i = 0; i < guesses[y].length; i++) {
			fill(0);
			text(guesses[y][i], 50 * (i + 1) + 100 * i + 50, y * 130 + 20 + 50);
		}
	}

	y = guesses.length;
	for (var i = 0; i < current_guess.length; i++) {
		fill(0);
		text(current_guess[i], 50 * (i + 1) + 100 * i + 50, y * 130 + 20 + 50);
	}

	if (won) {
		fill(255);
		textSize(75);
		text("You Win!", 400, 400);
		text(`Your score is ${guesses.length}`, 400, 500);
	}

	if (lost) {
		fill(255);
		textSize(75);
		text("You Lose!", 400, 400);
		text(`The word was ${selected_word}`, 400, 500);
	}

	translate(-400, 0);
	textSize(32);
	var totalGuesses = 0;
	for (var j = 0; j < 7; j++) {
		totalGuesses += prevGuesses[j];
	}
	for (var i = 0; i < 6; i++) {
		fill(150);
		rect(50, i * 50 + 20 * (i + 1), 300, 50);
		text(i + 1, 25, i * 50 + 20 * (i + 1) + 25);
		var percent = prevGuesses[i] / (totalGuesses - prevGuesses[6]);
		var w = 300 * percent;
		fill(success);
		rect(50, i * 50 + 20 * (i + 1), w, 50);
		fill(0);
		text(prevGuesses[i], 200, i * 50 + 20 * (i + 1) + 25);
	}
	fill(150);
	textAlign(LEFT, CENTER);
	text(`Total Attempts: ${totalGuesses}`, 15, 450);
	text(`Wins: ${totalGuesses - prevGuesses[6]}`, 15, 500);
	text(`Losses: ${prevGuesses[6]}`, 15, 550);
}

function keyPressed() {
	if (keyCode == 13) { // Enter/Return
		if (current_guess.length !== 5) {
			return;
		}
		if (words.indexOf(current_guess) == -1) {
			alert("Invalid Word!");
			return;
		}
		guesses.push(current_guess);
		if (current_guess === selected_word) {
			guesses_colour.push(["green", "green", "green", "green", "green"]);
			won = true;
			prevGuesses[guesses.length - 1]++;
			localStorage.setItem("ev_wordle_guesses", JSON.stringify(prevGuesses));
		}
		finalArr = [];
		for (var i = 0; i < 5; i++) {
			indexes = getAllIndexes(selected_word, current_guess[i]);
			if (indexes.indexOf(-1) != -1) {
				finalArr.push("wrong");
			} else if (indexes.indexOf(i) != -1) {
				finalArr.push("green");
			} else {
				finalArr.push("yellow");
			}
		}
		guesses_colour.push(finalArr);
		current_guess = "";
		if (guesses.length == 6 && !won) {
			lost = true;
			prevGuesses[6]++;
			localStorage.setItem("ev_wordle_guesses", JSON.stringify(prevGuesses));
		}
		return;
	}
	if (keyCode == 8) { // Backspace
		if (current_guess.length !== 0) {
			current_guess = current_guess.substring(0, current_guess.length - 1);
		}
	}
	if (keyCode < 65 || keyCode > 90) { // Not a letter
		return;
	}
	if (current_guess.length < 5) {
		current_guess += String.fromCharCode(keyCode + 32);
	}
}

function getAllIndexes(arr, val) {
	var indexes = [], i;
	for(i = 0; i < arr.length; i++)
		if (arr[i] === val)
			indexes.push(i);
	if (indexes.length == 0) {
		indexes.push(-1);
	}
	return indexes;
}