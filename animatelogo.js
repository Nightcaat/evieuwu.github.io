function animatelogo() {
	const introDiv = document.getElementById("intro");
	const introText = "FoxCore";
	const random = Math.floor(Math.random() * 3);
	var className;
	if (random != 2) {
		className = "introanimatedown";
	} else {
		className = "introanimateright";
	}
	for (var i = 0; i < introText.length; i++) {
		var child = document.createElement("span");
		child.classList.add(className);
		if (random == 0) {
			child.style.animationDelay = `${i * 100}ms`;
		} else if (random == 1) {
			child.style.animationDelay = `${(introText.length - i) * 100}ms`;
		} else if (random == 2) {
			child.style.animationDelay = `${(introText.length - i) * 100}ms`;
		}
		child.innerText = introText.charAt(i);
		introDiv.appendChild(child);
	}
	setTimeout((div, text) => {
		while (div.children.length != 0) {
			div.removeChild(introDiv.firstElementChild);
		}
		var child = document.createElement("span");
		child.innerText = text;
		div.appendChild(child);
	}, 2000, introDiv, introText);
}

window.onload = animatelogo();