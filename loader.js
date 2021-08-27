// LOADING SCRIPT
function getOff() {
	let id = null;
	const elem = document.getElementById("loading");
	let pos = 1;
	clearInterval(id);
	id = setInterval(frame, 1);
	function frame() {
		if (pos <= 0) {
			clearInterval(id);
			elem.remove();
		} else {
			pos -= 0.1;
			elem.style.opacity = pos;
		}
	}
}

$(document).ready(function() {
	// Pick random background waves
	document.getElementsByClassName("spacer")[0].style.backgroundImage = "url('assets/layer-" + Math.ceil(Math.random() * 9) + ".svg')";
});

$(window).on("load", function() {
	// Animate away the loading screen
	setTimeout(function() {getOff();}, 50);
});