var elements = document.getElementById("typingDiv").children;
var textInc = 0;
var textIndex = 0;
var speed = 25;
var currentScroll = 0;
var skipAnim = false;

function keyDown(e) {
	if (e.keyCode == 13) {
		skipAnim = true;
		document.removeEventListener("keydown", keyDown);
	}
}

function doTypingAnim(text) {
	if (textInc < text[textIndex]["text"].length) {
		for (var i = 0; i < elements[textIndex].classList.length; i++) {
			if ("invisible" === elements[textIndex].classList[i]) {
				elements[textIndex].classList.remove("invisible");
				break;
			}
		}
		if (elements[textIndex].childNodes.length === 0) {
			elements[textIndex].innerHTML = text[textIndex]["text"].substring(0, textInc + 1) +'<span aria-hidden="true"></span>';
		} else {
			var change = elements[textIndex].childNodes[0];
			change.nodeValue = text[textIndex]["text"].substring(0, textInc + 1);
		}	
		textInc++;
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
		currentScroll = document.body.scrollHeight;
	} else {
		textInc = 0;
		textIndex++;
		if (textIndex >= text.length) {
			document.getElementById("site").classList.remove("invisible");
			setTimeout(function() {
				window.scrollTo({ top: currentScroll - window.innerHeight + 500, behavior: 'smooth' });
			}.bind(this), 500);
			return;
		}
		elements[textIndex - 1].innerHTML = text[textIndex - 1]["text"];
	}
}

function setupTyping(text) {
	for (var i = 0; i < text.length; i++) {
		var t = document.createElement("div");
		t.id = "typing";
		t.classList.add("invisible");
		var obj = text[i];
		if (obj["colour"] !== null) {
			t.style.color = obj["colour"];
		}
		if (obj["indent"] !== null) {
			t.style.paddingLeft = 32 + (obj["indent"] * 64) + "px";
		}
		document.getElementById("typingDiv").appendChild(t);
	}
	elements = document.getElementById("typingDiv").children;
}

function typing(text) {
	if (skipAnim) {
		while (textIndex < text.length) {
			doTypingAnim(text);
		}
	}
	if (textInc < text[textIndex]["text"].length) {
		doTypingAnim(text);
		setTimeout(function() {typing(text)}, speed);
	} else {
		doTypingAnim(text);
		setTimeout(function() {typing(text)}, speed * 5);
	}
}